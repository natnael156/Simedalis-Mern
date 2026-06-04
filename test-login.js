const axios = require('axios');

const testLogin = async () => {
  try {
    console.log('🔄 Testing login...');
    const response = await axios.post('http://localhost:5001/api/auth/login', {
      email: 'team@gospel.com',
      password: 'gospel2024'
    });
    
    console.log('✅ Login successful!');
    console.log('Token:', response.data.token);
    console.log('User:', response.data.user);
  } catch (error) {
    if (error.response) {
      console.error('❌ Login failed:', error.response.data.message);
      console.log('\n🔍 Trying to diagnose the issue...');
      
      // Check if backend is running
      try {
        await axios.get('http://localhost:5001');
        console.log('✅ Backend server is running');
      } catch (e) {
        console.log('❌ Backend server is NOT running!');
        console.log('💡 Start the backend with: cd backend && npm start');
      }
    } else if (error.code === 'ECONNREFUSED') {
      console.error('❌ Cannot connect to backend server!');
      console.log('💡 Make sure backend is running: cd backend && npm start');
    } else {
      console.error('❌ Error:', error.message);
    }
  }
};

testLogin();
