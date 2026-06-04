#!/usr/bin/env node

/**
 * Standalone database setup script
 * Creates the gospel_team database and initializes tables
 */

require('dotenv').config({ path: './backend/.env' });
const DatabaseInitializer = require('./backend/utils/database-init');

async function setupDatabase() {
  try {
    console.log('=== Gospel Team Database Setup ===');
    console.log('');

    // Get configuration from environment
    const config = {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'gospel_team'
    };

    console.log('Database configuration:');
    console.log(`  Host: ${config.host}`);
    console.log(`  User: ${config.user}`);
    console.log(`  Database: ${config.database}`);
    console.log('');

    // Initialize database
    const initializer = new DatabaseInitializer(config);
    const result = await initializer.initialize();

    console.log('');
    console.log('=== Setup Results ===');
    if (result.databaseCreated) {
      console.log('✓ Database created successfully');
    } else if (result.databaseExisted) {
      console.log('✓ Database already exists');
    }
    console.log('✓ Database is accessible');
    console.log('');
    console.log('Database setup completed successfully!');
    console.log('You can now start your application.');

    process.exit(0);

  } catch (error) {
    console.error('');
    console.error('=== Setup Failed ===');
    console.error('Error:', error.message);
    console.error('');
    console.error('Please check:');
    console.error('1. MySQL server is running');
    console.error('2. Database credentials are correct');
    console.error('3. User has permission to create databases');
    console.error('');
    
    process.exit(1);
  }
}

// Run setup if called directly
if (require.main === module) {
  setupDatabase();
}

module.exports = setupDatabase;