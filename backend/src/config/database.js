const fs = require('fs');
const path = require('path');
const config = require('./env');
const logger = require('../utils/logger');

let pool = null;

async function initMySQL() {
  const mysql = require('mysql2/promise');

  // ── Build pool config ────────────────────────────────────────────────────
  // Prefer DATABASE_URL (single connection string set in Vercel env vars).
  // Fall back to individual variables (local dev / .env).
  let poolConfig;

  if (process.env.DATABASE_URL) {
    // [DIAG] Using DATABASE_URL connection string
    console.log('[DB-DIAG] Mode: DATABASE_URL', process.env.DATABASE_URL.replace(/:([^@]+)@/, ':***@'));
    poolConfig = {
      uri: process.env.DATABASE_URL,
      waitForConnections: true,
      connectionLimit: 3,
      queueLimit: 0,
      charset: 'utf8mb4',
      ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: false },
    };
  } else {
    // [DIAG] Log which values are being used (mask password)
    const resolvedHost = process.env.DB_HOST     || 'gateway01.eu-central-1.prod.aws.tidbcloud.com';
    const resolvedUser = process.env.DB_USER     || '3Y9q1Gqup1FU8tg.root';
    const resolvedDb   = process.env.DB_NAME     || 'sys';
    const resolvedPort = parseInt(process.env.DB_PORT, 10) || 4000;
    const pwSource     = process.env.DB_PASSWORD ? 'env:DB_PASSWORD' : (process.env.DB_PASS ? 'env:DB_PASS' : 'hardcoded-fallback');
    console.log(`[DB-DIAG] Mode: individual vars | host=${resolvedHost} user=${resolvedUser} db=${resolvedDb} port=${resolvedPort} pw-source=${pwSource}`);

    poolConfig = {
      host:     resolvedHost,
      user:     resolvedUser,
      password: process.env.DB_PASSWORD || process.env.DB_PASS || 'D4fe9u140YpchH9j',
      database: resolvedDb,
      port:     resolvedPort,
      waitForConnections: true,
      connectionLimit: 3,
      queueLimit: 0,
      charset: 'utf8mb4',
      ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: false },
    };
  }
  // ─────────────────────────────────────────────────────────────────────────

  pool = mysql.createPool(poolConfig);

  // [DIAG] Test connection — this line will throw if credentials/SSL are wrong
  console.log('[DB-DIAG] Testing connection with SELECT 1...');
  try {
    await pool.execute('SELECT 1');
    console.log('[DB-DIAG] ✅ Connection test PASSED — TiDB is reachable');
  } catch (connErr) {
    console.error('[DB-DIAG] ❌ Connection test FAILED:', connErr.message, '| code:', connErr.code);
    throw connErr; // re-throw so initDatabase() caller knows
  }
  try {
    const tables = ['products', 'admins', 'customers', 'orders', 'order_items', 'settings'];
    for (const table of tables) {
      try {
        await pool.execute(`ALTER TABLE ${table} CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
      } catch (e) {
        // Table might not exist yet during initial run before ensureTablesExist
      }
    }
    logger.info("Database: All existing tables converted to utf8mb4 successfully.");
  } catch (err) {
    logger.warn(`Database: Failed to convert tables to utf8mb4: ${err.message}`);
  }
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
  await initMySQL();
  await ensureTablesExist();
}

async function query(sql, params = []) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

async function getConnection() {
  return pool.getConnection();
}

function getDbType() {
  return 'mysql';
}

module.exports = { initDatabase, query, getConnection, getDbType };
