const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

const resetPassword = async () => {
  try {
    // Hash the new password
    const hashedPassword = await bcrypt.hash('adminad', 10);
    
    // Connect to database
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'gospel_team'
    });

    // Update admin password
    await connection.query(
      'UPDATE users SET password = ? WHERE email = ?',
      [hashedPassword, 'admin@gospel.com']
    );

    console.log('✅ Admin password updated successfully!');
    console.log('\n🔐 Login Credentials:');
    console.log('Email: admin@gospel.com');
    console.log('Password: adminad');
    console.log('\nYou can now login at http://localhost:3000/login');

    await connection.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

resetPassword();
