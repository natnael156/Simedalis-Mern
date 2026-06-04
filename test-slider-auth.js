const axios = require('axios');

const testSliderAuth = async () => {
  try {
    console.log('🧪 Testing Slider Authentication...');
    
    // Login first
    const loginRes = await axios.post('http://localhost:5001/api/auth/login', {
      email: 'admin@gospel.com',
      password: 'adminad'
    });
    console.log('✅ Login successful');
    
    const token = loginRes.data.token;
    
    // Test slider endpoint with auth
    const sliderRes = await axios.get('http://localhost:5001/api/slider/all', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Slider endpoint accessible');
    console.log(`📊 Found ${sliderRes.data.length} slides`);
    
    // Test POST endpoint (without file for now)
    try {
      await axios.post('http://localhost:5001/api/slider', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.message === 'No image file provided') {
        console.log('✅ POST endpoint accessible (expected error for missing file)');
      } else {
        console.log('❌ POST endpoint error:', error.response?.data || error.message);
      }
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
};

testSliderAuth();