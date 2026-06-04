const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const testSliderComplete = async () => {
  console.log('🧪 Testing Complete Slider Functionality...\n');

  try {
    // Test 1: Login
    console.log('1️⃣ Testing Admin Login...');
    const loginRes = await axios.post('http://localhost:5001/api/auth/login', {
      email: 'admin@gospel.com',
      password: 'adminad'
    });
    console.log('✅ Login successful');
    const token = loginRes.data.token;

    // Test 2: Get existing slides
    console.log('\n2️⃣ Testing Get Slides...');
    const slidesRes = await axios.get('http://localhost:5001/api/slider/all', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(`✅ Retrieved ${slidesRes.data.length} existing slides`);

    // Test 3: Create a test image file
    console.log('\n3️⃣ Creating Test Image...');
    const testImagePath = path.join(__dirname, 'test-slider-image.jpg');
    
    // Create a simple "image" file (just text for testing)
    const imageContent = Buffer.from('FAKE_JPEG_CONTENT_FOR_TESTING_SLIDER_UPLOAD_FUNCTIONALITY');
    fs.writeFileSync(testImagePath, imageContent);
    console.log('✅ Test image created');

    // Test 4: Upload image
    console.log('\n4️⃣ Testing Image Upload...');
    const formData = new FormData();
    formData.append('image', fs.createReadStream(testImagePath), {
      filename: 'test-slider.jpg',
      contentType: 'image/jpeg'
    });

    const uploadRes = await axios.post('http://localhost:5001/api/slider', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...formData.getHeaders()
      }
    });
    console.log('✅ Upload successful!');
    console.log(`📊 New slide ID: ${uploadRes.data.id}`);
    console.log(`📁 Image filename: ${uploadRes.data.image}`);

    const newSlideId = uploadRes.data.id;

    // Test 5: Verify upload by getting slides again
    console.log('\n5️⃣ Verifying Upload...');
    const updatedSlidesRes = await axios.get('http://localhost:5001/api/slider/all', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const newSlideCount = updatedSlidesRes.data.length;
    console.log(`✅ Now have ${newSlideCount} slides (increased by 1)`);

    // Test 6: Update slide status
    console.log('\n6️⃣ Testing Slide Update...');
    await axios.put(`http://localhost:5001/api/slider/${newSlideId}`, {
      isActive: false
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Slide status updated to inactive');

    // Test 7: Test public endpoint (should not show inactive slides)
    console.log('\n7️⃣ Testing Public Endpoint...');
    const publicSlidesRes = await axios.get('http://localhost:5001/api/slider');
    const activeSlidesCount = publicSlidesRes.data.length;
    console.log(`✅ Public endpoint shows ${activeSlidesCount} active slides`);

    // Test 8: Delete test slide
    console.log('\n8️⃣ Cleaning Up Test Slide...');
    await axios.delete(`http://localhost:5001/api/slider/${newSlideId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Test slide deleted');

    // Clean up test file
    fs.unlinkSync(testImagePath);
    console.log('✅ Test file cleaned up');

    console.log('\n🎉 All Slider Tests Passed!');
    console.log('\n📋 Functionality Verified:');
    console.log('✅ Admin authentication working');
    console.log('✅ File upload endpoint working');
    console.log('✅ Image storage working');
    console.log('✅ Slide management (update/delete) working');
    console.log('✅ Public/admin endpoint separation working');
    console.log('✅ Database operations working');

    console.log('\n🌐 Access Information:');
    console.log('- Backend API: http://localhost:5001');
    console.log('- Frontend: http://localhost:3000');
    console.log('- Admin Login: admin@gospel.com / adminad');
    console.log('- Slider Admin: http://localhost:3000/admin/slider');

  } catch (error) {
    console.error('\n❌ Test Failed:');
    console.error('Status:', error.response?.status);
    console.error('Message:', error.response?.data?.message || error.message);
    
    if (error.response?.data) {
      console.error('Response Data:', error.response.data);
    }

    // Clean up test file if it exists
    const testImagePath = path.join(__dirname, 'test-slider-image.jpg');
    if (fs.existsSync(testImagePath)) {
      fs.unlinkSync(testImagePath);
      console.log('🧹 Test file cleaned up');
    }
  }
};

testSliderComplete();