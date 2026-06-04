const axios = require('axios');

const updateSocialMedia = async () => {
  const baseURL = 'http://localhost:5001/api';
  
  console.log('🔄 Updating Social Media Links to Cimedalis...\n');

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

  // Social media updates for both languages
  const socialUpdates = [
    // English
    {
      key: 'facebook_url',
      value: 'https://facebook.com/cimedalis',
      category: 'social',
      language: 'en'
    },
    {
      key: 'twitter_url',
      value: 'https://twitter.com/cimedalis',
      category: 'social',
      language: 'en'
    },
    {
      key: 'instagram_url',
      value: 'https://instagram.com/cimedalis',
      category: 'social',
      language: 'en'
    },
    {
      key: 'youtube_url',
      value: 'https://youtube.com/cimedalis',
      category: 'social',
      language: 'en'
    },

    // Amharic (same URLs)
    {
      key: 'facebook_url',
      value: 'https://facebook.com/cimedalis',
      category: 'social',
      language: 'am'
    },
    {
      key: 'twitter_url',
      value: 'https://twitter.com/cimedalis',
      category: 'social',
      language: 'am'
    },
    {
      key: 'instagram_url',
      value: 'https://instagram.com/cimedalis',
      category: 'social',
      language: 'am'
    },
    {
      key: 'youtube_url',
      value: 'https://youtube.com/cimedalis',
      category: 'social',
      language: 'am'
    }
  ];

  console.log('🔄 Updating social media links...');

  for (const social of socialUpdates) {
    try {
      await axios.post(`${baseURL}/settings`, social, { headers });
      console.log(`✅ Updated: ${social.key} to ${social.value} (${social.language})`);
    } catch (error) {
      console.log(`⚠️  Failed to update ${social.key}:`, error.response?.data?.message || error.message);
    }
  }

  console.log('\n🎉 Social media links updated!');
  console.log('\n📱 New Social Media Links:');
  console.log('✅ Facebook: https://facebook.com/cimedalis');
  console.log('✅ Twitter: https://twitter.com/cimedalis');
  console.log('✅ Instagram: https://instagram.com/cimedalis');
  console.log('✅ YouTube: https://youtube.com/cimedalis');
  console.log('\n🔧 Changes will be visible on both Home and Contact pages!');
};

updateSocialMedia().catch(console.error);