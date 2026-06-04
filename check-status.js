#!/usr/bin/env node

/**
 * Quick status check for Gospel Team application
 */

const axios = require('axios');

async function checkStatus() {
  console.log('🔍 Gospel Team Application Status Check');
  console.log('=====================================\n');

  try {
    // Check backend
    const backendResponse = await axios.get('http://localhost:5001/api/announcements');
    console.log('✅ Backend (Port 5001): Running');
    
    // Check authentication
    const authResponse = await axios.post('http://localhost:5001/api/auth/login', {
      email: 'team@gospel.com',
      password: 'gospel2024'
    });
    console.log('✅ Authentication: Working');
    console.log(`   Admin User: ${authResponse.data.user.username}`);
    
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.log('❌ Backend (Port 5001): Not running');
      console.log('💡 Start with: cd backend && npm start');
    } else {
      console.log('❌ Backend: Error -', error.message);
    }
  }

  try {
    // Check frontend (this will fail if not running, but that's expected)
    await axios.get('http://localhost:3000');
    console.log('✅ Frontend (Port 3000): Running');
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.log('❌ Frontend (Port 3000): Not running');
      console.log('💡 Start with: cd frontend && npm start');
    }
  }

  console.log('\n🌐 Access URLs:');
  console.log('   Frontend: http://localhost:3000');
  console.log('   Backend API: http://localhost:5001/api');
  console.log('\n🔐 Admin Credentials:');
  console.log('   Email: team@gospel.com');
  console.log('   Password: gospel2024');
}

checkStatus().catch(console.error);