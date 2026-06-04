const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const testSliderUpload = async () => {
  try {
    console.log('🧪 Testing Slider File Upload...');
    
    // Login first
    const loginRes = await axios.post('http://localhost:5001/api/auth/login', {
      email: 'admin@gospel.com',
      password: 'adminad'
    });
    console.log('✅ Login successful');
    
    const token = loginRes.data.token;
    
    // Create a simple test image file
    const testImagePath = path.join(__dirname, 'test-image.txt');
    fs.writeFileSync(testImagePath, 'This is a test file content for slider upload');
    
    // Create FormData
    const formData = new FormData();
    formData.append('image', fs.createReadStream(testImagePath), {
      filename: 'test-image.jpg',
      contentType: 'image/jpeg'
    });
    
    console.log('📤 Attempting file upload...');
    
    // Test file upload
    const uploadRes = await axios.post('http://localhost:5001/api/slider', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...formData.getHeaders()
      }
    });
    
    console.log('✅ Upload successful!');
    console.log('📊 Response:', uploadRes.data);
    
    // Clean up test file
    fs.unlinkSync(testImagePath);
    
  } catch (error) {
    console.error('❌ Upload failed:');
    console.error('Status:', error.response?.status);
    console.error('Data:', error.response?.data);
    console.error('Message:', error.message);
    
    // Clean up test file if it exists
    const testImagePath = path.join(__dirname, 'test-image.txt');
    if (fs.existsSync(testImagePath)) {
      fs.unlinkSync(testImagePath);
    }
  }
};

testSliderUpload();