const fs = require('fs');
const path = require('path');
const config = require('./env');
const logger = require('../utils/logger');

let pool = null;
let sqliteDb = null;
let dbType = config.dbType;

function convertPlaceholders(sql) {
  if (dbType === 'sqlite') {
    return sql.replace(/\s+FOR\s+UPDATE\s*/gi, ' ');
  }
  return sql;
}

async function initMySQL() {
  const mysql = require('mysql2/promise');
  pool = mysql.createPool({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
  });
  await pool.execute('SELECT 1');
  logger.info('Connected to MySQL database');
}

function initSQLite() {
  const Database = require('better-sqlite3');
  const dbPath = path.isAbsolute(config.db.sqlitePath)
    ? config.db.sqlitePath
    : path.join(__dirname, '../../', config.db.sqlitePath);

  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  sqliteDb = new Database(dbPath);
  sqliteDb.pragma('journal_mode = WAL');
  sqliteDb.pragma('foreign_keys = ON');

  const schemaPath = path.join(__dirname, '../database/schema.sqlite.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');
  sqliteDb.exec(schema);

  logger.info(`Connected to SQLite database: ${dbPath}`);
}

async function initDatabase() {
  if (dbType === 'sqlite') {
    initSQLite();
    return;
  }

  try {
    await initMySQL();
  } catch (err) {
    logger.warn(`MySQL connection failed (${err.message}). Falling back to SQLite for development.`);
    dbType = 'sqlite';
    initSQLite();
  }
}

async function query(sql, params = []) {
  if (dbType === 'sqlite') {
    const isInsert = /^\s*INSERT/i.test(sql);
    const isUpdate = /^\s*UPDATE/i.test(sql);
    const isDelete = /^\s*DELETE/i.test(sql);
    const converted = convertPlaceholders(sql);
    const stmt = sqliteDb.prepare(converted);

    if (isInsert || isUpdate || isDelete) {
      const result = stmt.run(...params);
      if (isInsert) {
        return { insertId: Number(result.lastInsertRowid), affectedRows: result.changes };
      }
      return { affectedRows: result.changes };
    }

    return stmt.all(...params);
  }

  const [rows] = await pool.execute(sql, params);
  return rows;
}

async function getConnection() {
  if (dbType === 'sqlite') {
    return {
      _sqlite: true,
      async beginTransaction() { sqliteDb.exec('BEGIN'); },
      async commit() { sqliteDb.exec('COMMIT'); },
      async rollback() { sqliteDb.exec('ROLLBACK'); },
      async execute(sql, params = []) {
        const converted = convertPlaceholders(sql);
        const stmt = sqliteDb.prepare(converted);
        const isSelect = /^\s*SELECT/i.test(sql);
        if (isSelect) return [stmt.all(...params)];
        const result = stmt.run(...params);
        return [{ insertId: Number(result.lastInsertRowid), affectedRows: result.changes }];
      },
      release() {},
    };
  }
  return pool.getConnection();
}

function getDbType() {
  return dbType;
}

module.exports = { initDatabase, query, getConnection, getDbType };
