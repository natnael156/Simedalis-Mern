const mysql = require('mysql2/promise');
require('dotenv').config({ path: './backend/.env' });

async function checkMySQL() {
  console.log('🔍 Checking MySQL Connection...\n');
  
  const config = {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
  };
  
  console.log('📋 Connection Settings:');
  console.log(`   Host: ${config.host}`);
  console.log(`   Port: ${config.port}`);
  console.log(`   User: ${config.user}`);
  console.log(`   Password: ${config.password ? '[SET]' : '[EMPTY]'}\n`);
  
  try {
    console.log('🔄 Attempting to connect to MySQL server...');
    
    const connection = await mysql.createConnection({
      ...config,
      connectTimeout: 5000
    });
    
    console.log('✅ Successfully connected to MySQL server!');
    
    // Test basic query
    const [result] = await connection.query('SELECT VERSION() as version');
    console.log(`📊 MySQL Version: ${result[0].version}`);
    
    // Check databases
    const [databases] = await connection.query('SHOW DATABASES');
    console.log(`📁 Available Databases: ${databases.map(db => Object.values(db)[0]).join(', ')}`);
    
    await connection.end();
    console.log('\n✅ MySQL is working correctly!');
    
  } catch (error) {
    console.error('❌ MySQL Connection Failed:');
    console.error(`   Error: ${error.message}`);
    console.error(`   Code: ${error.code || 'Unknown'}\n`);
    
    if (error.code === 'ETIMEDOUT') {
      console.error('🔧 Timeout Error Solutions:');
      console.error('   1. Make sure MySQL server is running');
      console.error('   2. Check if MySQL service is started');
      console.error('   3. Verify firewall settings');
      console.error('   4. Try connecting with MySQL Workbench or command line\n');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('🔧 Access Denied Solutions:');
      console.error('   1. Check username and password');
      console.error('   2. Make sure user has proper permissions');
      console.error('   3. Try: mysql -u root -p (from command line)\n');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('🔧 Connection Refused Solutions:');
      console.error('   1. MySQL server is not running');
      console.error('   2. Wrong host or port');
      console.error('   3. Start MySQL service\n');
    }
    
    console.error('💡 Quick MySQL Installation Check:');
    console.error('   Windows: Check Services panel for MySQL service');
    console.error('   Mac: brew services start mysql');
    console.error('   Linux: sudo service mysql start');
  }
}

checkMySQL();