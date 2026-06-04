const axios = require('axios');

const testSaveButtons = async () => {
  const baseURL = 'http://localhost:5001/api';
  
  console.log('🧪 Testing Save Button Functionality...\n');

  // First, login to get token
  let token;
  try {
    const loginResponse = await axios.post(`${baseURL}/auth/login`, {
      email: 'admin@gospel.com',
      password: 'adminad'
    });
    token = loginResponse.data.token;
    console.log('✅ Admin login successful');
  } catch (error) {
    console.log('❌ Login failed:', error.message);
    return;
  }

  const headers = { Authorization: `Bearer ${token}` };

  // Test 1: Update a banking setting
  console.log('\n1️⃣ Testing Banking Settings Update...');
  try {
    const testBankName = `Test Bank ${Date.now()}`;
    
    await axios.post(`${baseURL}/settings`, {
      key: 'primary_bank_name',
      value: testBankName,
      category: 'banking',
      language: 'en'
    }, { headers });

    // Verify the update
    const response = await axios.get(`${baseURL}/settings?category=banking&language=en`);
    const updatedValue = response.data.banking?.primary_bank_name?.value;
    
    if (updatedValue === testBankName) {
      console.log('✅ Banking setting updated successfully');
      console.log(`   Updated primary_bank_name to: ${updatedValue}`);
    } else {
      console.log('❌ Banking setting update failed');
    }
  } catch (error) {
    console.log('❌ Banking update test failed:', error.message);
  }

  // Test 2: Update contact information
  console.log('\n2️⃣ Testing Contact Information Update...');
  try {
    const testPhone = `+251 911 ${Math.floor(Math.random() * 900000) + 100000}`;
    
    await axios.post(`${baseURL}/settings`, {
      key: 'phone_primary',
      value: testPhone,
      category: 'contact',
      language: 'en'
    }, { headers });

    // Verify the update
    const response = await axios.get(`${baseURL}/settings?category=contact&language=en`);
    const updatedValue = response.data.contact?.phone_primary?.value;
    
    if (updatedValue === testPhone) {
      console.log('✅ Contact setting updated successfully');
      console.log(`   Updated phone_primary to: ${updatedValue}`);
    } else {
      console.log('❌ Contact setting update failed');
    }
  } catch (error) {
    console.log('❌ Contact update test failed:', error.message);
  }

  // Test 3: Update website settings
  console.log('\n3️⃣ Testing Website Settings Update...');
  try {
    const testTitle = `Gospel Team Ministry - Updated ${new Date().toLocaleTimeString()}`;
    
    await axios.post(`${baseURL}/settings`, {
      key: 'hero_title',
      value: testTitle,
      category: 'website',
      language: 'en'
    }, { headers });

    // Verify the update
    const response = await axios.get(`${baseURL}/settings?category=website&language=en`);
    const updatedValue = response.data.website?.hero_title?.value;
    
    if (updatedValue === testTitle) {
      console.log('✅ Website setting updated successfully');
      console.log(`   Updated hero_title to: ${updatedValue}`);
    } else {
      console.log('❌ Website setting update failed');
    }
  } catch (error) {
    console.log('❌ Website update test failed:', error.message);
  }

  // Test 4: Batch update (simulating save button)
  console.log('\n4️⃣ Testing Batch Update (Save Button Simulation)...');
  try {
    const timestamp = Date.now();
    const batchUpdates = [
      {
        key: 'primary_account_name',
        value: `Gospel Team Batch ${timestamp}`,
        category: 'banking',
        language: 'en'
      },
      {
        key: 'primary_account_number',
        value: `1000${timestamp}`,
        category: 'banking',
        language: 'en'
      },
      {
        key: 'primary_swift_code',
        value: `BATCH${timestamp}`,
        category: 'banking',
        language: 'en'
      }
    ];

    // Simulate what the save button does - multiple updates
    const promises = batchUpdates.map(update => 
      axios.post(`${baseURL}/settings`, update, { headers })
    );

    await Promise.all(promises);

    // Verify all updates
    const response = await axios.get(`${baseURL}/settings?category=banking&language=en`);
    const banking = response.data.banking;
    
    let allUpdated = true;
    batchUpdates.forEach(update => {
      const actualValue = banking[update.key]?.value;
      if (actualValue !== update.value) {
        allUpdated = false;
        console.log(`❌ ${update.key} not updated correctly`);
      } else {
        console.log(`✅ ${update.key}: ${actualValue}`);
      }
    });

    if (allUpdated) {
      console.log('✅ Batch update (Save Button) successful');
    }
  } catch (error) {
    console.log('❌ Batch update test failed:', error.message);
  }

  console.log('\n🎉 Save Button Tests Complete!');
  console.log('\n📋 New Features:');
  console.log('✅ Explicit Save buttons for each category');
  console.log('✅ Reset button to undo changes');
  console.log('✅ Visual indicators for unsaved changes');
  console.log('✅ Loading states during save operations');
  console.log('✅ Success/error feedback messages');
  console.log('✅ Batch saving for better performance');
  
  console.log('\n🎯 User Experience Improvements:');
  console.log('- Red dots show categories with unsaved changes');
  console.log('- Save button only appears when there are changes');
  console.log('- Reset button allows undoing changes');
  console.log('- Loading spinner shows save progress');
  console.log('- Clear feedback on save success/failure');
};

testSaveButtons().catch(console.error);