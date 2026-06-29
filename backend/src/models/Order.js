const { query, getConnection } = require('../config/database');
const Product = require('./Product');
const Customer = require('./Customer');

function formatOrderItem(row) {
  return {
    id: row.id,
    order_id: row.order_id,
    product_id: row.product_id,
    quantity: row.quantity,
    price: parseFloat(row.price),
    product_name: row.product_name || null,
    product_name_en: row.product_name_en || null,
  };
}

function formatOrder(row, items = []) {
  if (!row) return null;
  return {
    id: row.id,
    customer_id: row.customer_id,
    customer_name: row.customer_name,
    phone: row.phone,
    address: row.address,
    total_price: parseFloat(row.total_price),
    status: row.status,
    created_at: row.created_at,
    items,
  };
}

const Order = {
  async findAll() {
    const orders = await query('SELECT * FROM orders ORDER BY id DESC');
    const result = [];

    for (const order of orders) {
      const items = await query(
        `SELECT oi.*, p.name AS product_name, p.name_en AS product_name_en
         FROM order_items oi
         LEFT JOIN products p ON p.id = oi.product_id
         WHERE oi.order_id = ?`,
        [order.id]
      );
      result.push(formatOrder(order, items.map(formatOrderItem)));
    }

    return result;
  },

  async findById(id) {
    const rows = await query('SELECT * FROM orders WHERE id = ?', [id]);
    if (!rows.length) return null;

    const items = await query(
      `SELECT oi.*, p.name AS product_name, p.name_en AS product_name_en
       FROM order_items oi
       LEFT JOIN products p ON p.id = oi.product_id
       WHERE oi.order_id = ?`,
      [id]
    );

    return formatOrder(rows[0], items.map(formatOrderItem));
  },

  async create({ customer_name, phone, address, items, total_price }) {
    const connection = await getConnection();

    try {
      await connection.beginTransaction();

      const customer = await Customer.findOrCreate({
        name: customer_name,
        phone,
        address,
      });

      const [orderResult] = await connection.execute(
        `INSERT INTO orders (customer_id, customer_name, phone, address, total_price, status)
         VALUES (?, ?, ?, ?, ?, 'pending')`,
        [customer.id, customer_name, phone, address, total_price]
      );

      const orderId = orderResult.insertId;
      const updatedProducts = [];

      for (const item of items) {
        const [productRows] = await connection.execute(
          'SELECT * FROM products WHERE id = ? FOR UPDATE',
          [item.product_id]
        );

        if (!productRows.length) {
          throw new Error(`Product ${item.product_id} not found`);
        }

        const product = productRows[0];
        if (product.stock_quantity < item.quantity) {
          throw new Error(
            `Insufficient stock for "${product.name}". Available: ${product.stock_quantity}, requested: ${item.quantity}`
          );
        }

        await connection.execute(
          'UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?',
          [item.quantity, item.product_id]
        );

        await connection.execute(
          'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
          [orderId, item.product_id, item.quantity, item.price]
        );

        const [updatedRows] = await connection.execute(
          'SELECT * FROM products WHERE id = ?',
          [item.product_id]
        );
        updatedProducts.push(updatedRows[0]);
      }

      await connection.commit();

      const order = await this.findById(orderId);
      return { order, updatedProducts };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  async updateStatus(id, status) {
    const validStatuses = ['pending', 'processing', 'delivered'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    await query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
    return this.findById(id);
  },

  async delete(id) {
    const order = await this.findById(id);
    if (!order) return null;
    await query('DELETE FROM orders WHERE id = ?', [id]);
    return order;
  },
};

module.exports = Order;
