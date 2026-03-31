const pool = require('./db');
const bcrypt = require('bcryptjs');

async function seed() {
  try {
    const password = await bcrypt.hash('admin123', 10);
    
    // Disable foreign key checks for fresh seed
    await pool.query('SET FOREIGN_KEY_CHECKS = 0');
    await pool.query('DROP TABLE IF EXISTS questions');
    await pool.query('DROP TABLE IF EXISTS categories');
    await pool.query('DROP TABLE IF EXISTS modules');
    await pool.query('DROP TABLE IF EXISTS users');
    await pool.query('DROP TABLE IF EXISTS scores');

    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'student') DEFAULT 'student',
        status ENUM('Active', 'Inactive') DEFAULT 'Active',
        level INT DEFAULT 1,
        current_module VARCHAR(255) DEFAULT 'Basics 1',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create modules table as per new requirement
    await pool.query(`
      CREATE TABLE IF NOT EXISTS modules (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query('SET FOREIGN_KEY_CHECKS = 1');

    // Insert admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    await pool.query('INSERT IGNORE INTO users (name, email, password, role, status, level, current_module) VALUES (?, ?, ?, ?, ?, ?, ?)', 
      ['John Admin', 'admin@grammarhub.com', adminPassword, 'admin', 'Active', 99, 'Admin Panel']
    );

    console.log('Seeding completed: Modules table created, legacy categories removed.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
