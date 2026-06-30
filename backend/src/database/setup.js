const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../../.env') });

async function setup() {
  const config = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true,
    ssl: { rejectUnauthorized: true, minVersion: 'TLSv1.2' }
  };

  console.log('Connecting to MySQL...');
  const connection = await mysql.createConnection(config);

  const schemaPath = path.join(__dirname, 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');

  console.log('Running schema...');
  await connection.query(schema);
  await connection.end();

  console.log('Database setup completed successfully.');
}

setup().catch((err) => {
  console.error('Database setup failed:', err);
  process.exit(1);
});
