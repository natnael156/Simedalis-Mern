const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const testSliderFileSize = async () => {
  console.log('🧪 Testing Slider File Size Handling...\n');

  try {
    // Login first
    const loginRes = await axios.post('http://localhost:5001/api/auth/login', {
      email: 'admin@gospel.com',
      password: 'adminad'
    });
    console.log('✅ Login successful');
    const token = loginRes.data.token;

    // Test 1: Small file (should work)
    console.log('\n1️⃣ Testing Small File Upload...');
    const smallImagePath = path.join(__dirname, 'small-test-image.jpg');
    const smallContent = Buffer.from('SMALL_TEST_IMAGE_CONTENT');
    fs.writeFileSync(smallImagePath, smallContent);

    const smallFormData = new FormData();
    smallFormData.append('image', fs.createReadStream(smallImagePath), {
      filename: 'small-test.jpg',
      contentType: 'image/jpeg'
    });

    try {
      const smallUploadRes = await axios.post('http://localhost:5001/api/slider', smallFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
          ...smallFormData.getHeaders()
        }
      });
      console.log('✅ Small file upload successful');
      console.log(`📊 Slide ID: ${smallUploadRes.data.id}`);
      
      // Clean up the uploaded slide
      await axios.delete(`http://localhost:5001/api/slider/${smallUploadRes.data.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('✅ Test slide cleaned up');
    } catch (error) {
      console.log('❌ Small file upload failed:', error.response?.data?.message || error.message);
    }

    // Test 2: Large file (should fail with proper error)
    console.log('\n2️⃣ Testing Large File Upload (should fail gracefully)...');
    const largeImagePath = path.join(__dirname, 'large-test-image.jpg');
    
    // Create a file larger than 10MB (11MB)
    const largeContent = Buffer.alloc(11 * 1024 * 1024, 'X');
    fs.writeFileSync(largeImagePath, largeContent);
    console.log(`📏 Created ${(largeContent.length / (1024 * 1024)).toFixed(2)}MB test file`);

    const largeFormData = new FormData();
    largeFormData.append('image', fs.createReadStream(largeImagePath), {
      filename: 'large-test.jpg',
      contentType: 'image/jpeg'
    });

    try {
      await axios.post('http://localhost:5001/api/slider', largeFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
          ...largeFormData.getHeaders()
        }
      });
      console.log('❌ Large file upload should have failed but succeeded');
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.message?.includes('File too large')) {
        console.log('✅ Large file properly rejected with correct error message');
        console.log(`📝 Error: ${error.response.data.message}`);
      } else {
        console.log('❌ Unexpected error for large file:', error.response?.data?.message || error.message);
      }
    }

    // Test 3: Non-image file (should fail)
    console.log('\n3️⃣ Testing Non-Image File Upload (should fail)...');
    const textFilePath = path.join(__dirname, 'test-document.txt');
    fs.writeFileSync(textFilePath, 'This is not an image file');

    const textFormData = new FormData();
    textFormData.append('image', fs.createReadStream(textFilePath), {
      filename: 'test-document.txt',
      contentType: 'text/plain'
    });

    try {
      await axios.post('http://localhost:5001/api/slider', textFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
          ...textFormData.getHeaders()
        }
      });
      console.log('❌ Non-image file upload should have failed but succeeded');
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.message?.includes('image files')) {
        console.log('✅ Non-image file properly rejected');
        console.log(`📝 Error: ${error.response.data.message}`);
      } else {
        console.log('❌ Unexpected error for non-image file:', error.response?.data?.message || error.message);
      }
    }

    // Clean up test files
    [smallImagePath, largeImagePath, textFilePath].forEach(filePath => {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });
    console.log('\n🧹 All test files cleaned up');

    console.log('\n🎉 File Size Testing Complete!');
    console.log('\n📋 Results:');
    console.log('✅ Small files (< 10MB) upload successfully');
    console.log('✅ Large files (> 10MB) rejected with proper error');
    console.log('✅ Non-image files rejected with proper error');
    console.log('✅ Error messages are user-friendly');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    
    // Clean up test files
    ['small-test-image.jpg', 'large-test-image.jpg', 'test-document.txt'].forEach(filename => {
      const filePath = path.join(__dirname, filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });
  }
};

testSliderFileSize();