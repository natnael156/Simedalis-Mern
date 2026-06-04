const axios = require('axios');

const updateEmailAddresses = async () => {
  const baseURL = 'http://localhost:5001/api';
  
  console.log('🔄 Updating Email Addresses to Cimedalis...\n');

  // Login first
  let token;
  try {
    const loginResponse = await axios.post(`${baseURL}/auth/login`, {
      email: 'admin@gospel.com',
      password: 'adminad'
    });
    token = loginResponse.data.token;
    console.log('✅ Logged in as admin');
  } catch (error) {
    console.error('❌ Login failed:', error.message);
    return;
  }

  const headers = { Authorization: `Bearer ${token}` };

  // Email settings to update
  const emailUpdates = [
    // English emails
    {
      key: 'email_primary',
      value: 'info@cimedalis.org',
      category: 'contact',
      language: 'en'
    },
    {
      key: 'email_secondary',
      value: 'contact@cimedalis.org',
      category: 'contact',
      language: 'en'
    },

    // Amharic emails (same values)
    {
      key: 'email_primary',
      value: 'info@cimedalis.org',
      category: 'contact',
      language: 'am'
    },
    {
      key: 'email_secondary',
      value: 'contact@cimedalis.org',
      category: 'contact',
      language: 'am'
    }
  ];

  console.log('🔄 Updating email addresses...');

  for (const email of emailUpdates) {
    try {
      await axios.post(`${baseURL}/settings`, email, { headers });
      console.log(`✅ Updated: ${email.key} to ${email.value} (${email.language})`);
    } catch (error) {
      console.log(`⚠️  Failed to update ${email.key}:`, error.response?.data?.message || error.message);
    }
  }

  console.log('\n🎉 Email addresses updated!');
  console.log('\n📧 New Email Addresses:');
  console.log('✅ Primary: info@cimedalis.org');
  console.log('✅ Secondary: contact@cimedalis.org');
  console.log('\n🔧 Changes will be visible on the website immediately!');
};

updateEmailAddresses().catch(console.error);