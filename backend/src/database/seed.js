const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../../.env') });

const Product = require('../models/Product');
const Admin = require('../models/Admin');
const { query, initDatabase, getDbType } = require('../config/database');
const config = require('../config/env');

function extractProductsFromScript() {
  const backupPath = path.join(__dirname, 'products-backup.json');
  const scriptPath = path.join(__dirname, '../../../script.js');

  if (fs.existsSync(backupPath)) {
    return JSON.parse(fs.readFileSync(backupPath, 'utf8'));
  }

  const content = fs.readFileSync(scriptPath, 'utf8');
  const match = content.match(/const _legacyProductsForSeed = (\[[\s\S]*?\n\]);/)
    || content.match(/const products = (\[[\s\S]*?\n\]);/);
  if (!match) {
    throw new Error('Could not find products array in script.js or products-backup.json');
  }

  // eslint-disable-next-line no-eval
  const products = eval(match[1]);
  fs.writeFileSync(backupPath, JSON.stringify(products, null, 2));
  return products;
}

async function seed() {
  console.log('Seeding database...');
  await initDatabase();
  console.log(`Using database: ${getDbType()}`);

  await Admin.ensureDefaultAdmin(config.admin.username, config.admin.password);
  console.log(`Admin user ensured: ${config.admin.username}`);

  const existing = await query('SELECT COUNT(*) AS count FROM products');
  const count = existing[0]?.count ?? existing[0]?.['COUNT(*)'] ?? 0;
  if (count > 0) {
    console.log(`Products table already has ${count} items. Skipping product seed.`);
    console.log('Run TRUNCATE products; to re-seed.');
    return;
  }

  const products = extractProductsFromScript();
  console.log(`Importing ${products.length} products from script.js...`);

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

  console.log(`Successfully seeded ${products.length} products.`);
}

seed().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
