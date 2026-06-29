const { query } = require('../config/database');

function parseJsonField(value) {
  if (!value) return null;
  if (typeof value === 'object') return value;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function formatProduct(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    name_en: row.name_en,
    price: parseFloat(row.price),
    image: row.image,
    description: row.description,
    description_en: row.description_en,
    stock_quantity: row.stock_quantity,
    vendor: row.vendor,
    badge_ar: row.badge_ar,
    badge_en: row.badge_en,
    notes_ar: parseJsonField(row.notes_ar),
    notes_en: parseJsonField(row.notes_en),
    created_at: row.created_at,
    updated_at: row.updated_at,
    in_stock: row.stock_quantity > 0,
    title_ar: row.name,
    title_en: row.name_en,
    desc_ar: row.description,
    desc_en: row.description_en,
    is_active: row.is_active !== undefined ? Number(row.is_active) : 1,
  };
}

const Product = {
  async findAll() {
    const rows = await query(
      'SELECT * FROM products ORDER BY id DESC'
    );
    return rows.map(formatProduct);
  },

  async findById(id) {
    const rows = await query('SELECT * FROM products WHERE id = ?', [id]);
    return formatProduct(rows[0]);
  },

  async create(data) {
    const result = await query(
      `INSERT INTO products (name, name_en, price, image, description, description_en, stock_quantity, vendor, badge_ar, badge_en, notes_ar, notes_en, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.name,
        data.name_en || data.name,
        data.price,
        data.image || '',
        data.description || '',
        data.description_en || data.description || '',
        data.stock_quantity ?? 0,
        data.vendor || 'F&S Fragrances',
        data.badge_ar || null,
        data.badge_en || null,
        data.notes_ar ? JSON.stringify(data.notes_ar) : null,
        data.notes_en ? JSON.stringify(data.notes_en) : null,
        data.is_active !== undefined ? (data.is_active ? 1 : 0) : 1,
      ]
    );
    return this.findById(result.insertId);
  },

  async update(id, data) {
    const fields = [];
    const values = [];

    const allowed = [
      'name', 'name_en', 'price', 'image', 'description', 'description_en',
      'stock_quantity', 'vendor', 'badge_ar', 'badge_en', 'is_active',
    ];

    allowed.forEach((key) => {
      if (data[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(data[key]);
      }
    });

    if (data.notes_ar !== undefined) {
      fields.push('notes_ar = ?');
      values.push(JSON.stringify(data.notes_ar));
    }
    if (data.notes_en !== undefined) {
      fields.push('notes_en = ?');
      values.push(JSON.stringify(data.notes_en));
    }

    if (fields.length === 0) return this.findById(id);

    values.push(id);
    await query(`UPDATE products SET ${fields.join(', ')} WHERE id = ?`, values);
    return this.findById(id);
  },

  async delete(id) {
    const product = await this.findById(id);
    if (!product) return null;
    await query('DELETE FROM products WHERE id = ?', [id]);
    return product;
  },

  async deductStock(productId, quantity, connection = null) {
    const exec = connection
      ? (sql, params) => connection.execute(sql, params).then(([rows]) => rows)
      : query;

    const rows = await exec(
      'SELECT stock_quantity FROM products WHERE id = ? FOR UPDATE',
      [productId]
    );

    if (!rows.length) {
      throw new Error(`Product ${productId} not found`);
    }

    const currentStock = rows[0].stock_quantity;
    if (currentStock < quantity) {
      throw new Error(`Insufficient stock for product ${productId}. Available: ${currentStock}, requested: ${quantity}`);
    }

    await exec(
      'UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?',
      [quantity, productId]
    );

    const updated = await exec('SELECT * FROM products WHERE id = ?', [productId]);
    return formatProduct(updated[0]);
  },
};

module.exports = Product;
