const pool = require('./db');
const bcrypt = require('bcryptjs');

async function seed() {
  try {
    const password = await bcrypt.hash('admin123', 10);
    
    // Create users table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'student') DEFAULT 'student',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert admin user
    await pool.query('INSERT IGNORE INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', 
      ['Admin User', 'admin@grammarhub.com', password, 'admin']
    );

    console.log('Seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
