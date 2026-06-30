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
    ssl: { rejectUnauthorized: true, minVersion: 'TLSv1.2' }
  });
  await pool.execute('SELECT 1');
  try {
    await pool.execute("ALTER TABLE products ADD COLUMN is_active TINYINT(1) NOT NULL DEFAULT 1");
    logger.info("Database: Column 'is_active' added to products table successfully.");
  } catch (err) {
    if (err.message.includes("duplicate column") || err.message.includes("already exists") || err.message.includes("Duplicate column name")) {
      logger.debug("Database: Column 'is_active' already exists in products table.");
    } else {
      logger.warn(`Database: Failed to add 'is_active' column: ${err.message}`);
    }
  }
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

  try {
    sqliteDb.exec("ALTER TABLE products ADD COLUMN is_active INTEGER NOT NULL DEFAULT 1");
    logger.info("Database: Column 'is_active' added to products table successfully.");
  } catch (err) {
    if (err.message.includes("duplicate column name") || err.message.includes("already exists")) {
      logger.debug("Database: Column 'is_active' already exists in products table.");
    } else {
      logger.warn(`Database: Failed to add 'is_active' column: ${err.message}`);
    }
  }

  logger.info(`Connected to SQLite database: ${dbPath}`);
}

async function ensureTablesExist() {
  try {
    await query('SELECT 1 FROM admins LIMIT 1');
  } catch (err) {
    logger.info('Database tables not found. Initializing database schema...');
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    const statements = schema
      .split(';')
      .map(s => s.replace(/--.*$/gm, '').trim())
      .filter(s => s.length > 0);
      
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      for (const statement of statements) {
        await connection.execute(statement);
      }
      await connection.commit();
      logger.info('Database schema initialized successfully.');
      
      await seedDefaultData();
    } catch (migrationError) {
      await connection.rollback();
      logger.error(`Database migration failed: ${migrationError.message}`);
      throw migrationError;
    } finally {
      connection.release();
    }
  }
}

async function seedDefaultData() {
  try {
    const Admin = require('../models/Admin');
    const Product = require('../models/Product');
    
    // Seed default admin
    await Admin.ensureDefaultAdmin(config.admin.username, config.admin.password);
    logger.info(`Admin user ensured: ${config.admin.username}`);
    
    // Seed products from products-backup.json
    const productsBackupPath = path.join(__dirname, '../database/products-backup.json');
    if (fs.existsSync(productsBackupPath)) {
      const products = JSON.parse(fs.readFileSync(productsBackupPath, 'utf8'));
      logger.info(`Seeding ${products.length} products to MySQL...`);
      for (const p of products) {
        await Product.create({
          name: p.title_ar,
          name_en: p.title_en,
          price: p.price,
          image: p.image || '',
          description: p.desc_ar || '',
          description_en: p.desc_en || '',
          stock_quantity: 50,
          vendor: p.vendor || 'F&S Fragrances',
          badge_ar: p.badge_ar || null,
          badge_en: p.badge_en || null,
          notes_ar: p.notes_ar || null,
          notes_en: p.notes_en || null,
        });
      }
      logger.info('Products seeded successfully.');
    }
  } catch (seedErr) {
    logger.error(`Database seeding failed: ${seedErr.message}`);
  }
}

async function initDatabase() {
  if (dbType === 'sqlite') {
    initSQLite();
    return;
  }

  try {
    await initMySQL();
    await ensureTablesExist();
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
