const mysql = require('mysql2/promise');

const checkUsers = async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'gospel_team'
    });

    const [users] = await connection.query('SELECT id, username, email, role FROM users');
    
    console.log('📋 Users in database:');
    console.log('===================');
    users.forEach(user => {
      console.log(`ID: ${user.id}`);
      console.log(`Username: ${user.username}`);
      console.log(`Email: ${user.email}`);
      console.log(`Role: ${user.role}`);
      console.log('-------------------');
    });

    await connection.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

checkUsers();
