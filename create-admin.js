const axios = require('axios');

const createAdmin = async () => {
  try {
    const response = await axios.post('http://localhost:5001/api/auth/register', {
      username: 'gospelteam',
      email: 'team@gospel.com',
      password: 'gospel2024',
      role: 'admin'
    });
    
    console.log('✅ Admin user created successfully!');
    console.log('Username: gospelteam');
    console.log('Email: team@gospel.com');
    console.log('Password: gospel2024');
    console.log('\nYou can now login at http://localhost:3000/login');
  } catch (error) {
    if (error.response) {
      console.error('❌ Error:', error.response.data.message);
      console.log('\n💡 Try logging in with existing admin credentials:');
      console.log('Username: admin or gospelteam');
      console.log('Email: admin@gospel.com or team@gospel.com');
      console.log('Password: admin123 or gospel2024');
    } else {
      console.error('❌ Error:', error.message);
    }
  }
};

createAdmin();
