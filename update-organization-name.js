const axios = require('axios');

const updateOrganizationName = async () => {
  const baseURL = 'http://localhost:5001/api';
  
  console.log('🔄 Updating Organization Name to Cimedalis...\n');

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

  // Settings to update
  const settingsUpdates = [
    // Contact Information - English
    {
      key: 'organization_name',
      value: 'Cimedalis',
      category: 'contact',
      language: 'en'
    },
    {
      key: 'primary_account_name',
      value: 'Cimedalis',
      category: 'banking',
      language: 'en'
    },
    {
      key: 'international_account_name',
      value: 'Cimedalis International',
      category: 'banking',
      language: 'en'
    },

    // Contact Information - Amharic
    {
      key: 'organization_name',
      value: 'ሲሜዳሊስ',
      category: 'contact',
      language: 'am'
    },
    {
      key: 'primary_account_name',
      value: 'ሲሜዳሊስ',
      category: 'banking',
      language: 'am'
    },
    {
      key: 'international_account_name',
      value: 'ሲሜዳሊስ ዓለም አቀፍ',
      category: 'banking',
      language: 'am'
    },

    // Website Settings - English
    {
      key: 'site_title',
      value: 'Cimedalis - Spreading God\'s Love',
      category: 'website',
      language: 'en'
    },
    {
      key: 'site_description',
      value: 'A Christian ministry dedicated to spreading the Gospel of Jesus Christ through passionate preaching, transformative teaching, and selfless acts of service.',
      category: 'website',
      language: 'en'
    },
    {
      key: 'hero_title',
      value: 'Welcome to Cimedalis',
      category: 'website',
      language: 'en'
    },
    {
      key: 'hero_subtitle',
      value: 'Spreading God\'s Love Through Faith, Service, and Community',
      category: 'website',
      language: 'en'
    },

    // Website Settings - Amharic
    {
      key: 'site_title',
      value: 'ሲሜዳሊስ - የእግዚአብሔርን ፍቅር ማሰራጨት',
      category: 'website',
      language: 'am'
    },
    {
      key: 'site_description',
      value: 'የኢየሱስ ክርስቶስን ወንጌል በተለዋዋጭ ስብከት፣ በህይወት ለውጥ ባለው ትምህርት እና በራስ ወዳድነት በሌለው አገልግሎት ለማሰራጨት የተሰጠ ክርስቲያናዊ አገልግሎት።',
      category: 'website',
      language: 'am'
    },
    {
      key: 'hero_title',
      value: 'ወደ ሲሜዳሊስ እንኳን በደህና መጡ',
      category: 'website',
      language: 'am'
    },
    {
      key: 'hero_subtitle',
      value: 'የእግዚአብሔርን ፍቅር በእምነት፣ በአገልግሎት እና በማህበረሰብ ማሰራጨት',
      category: 'website',
      language: 'am'
    }
  ];

  console.log('🔄 Updating settings...');

  for (const setting of settingsUpdates) {
    try {
      await axios.post(`${baseURL}/settings`, setting, { headers });
      console.log(`✅ Updated: ${setting.category}/${setting.key} (${setting.language})`);
    } catch (error) {
      console.log(`⚠️  Failed to update ${setting.category}/${setting.key} (${setting.language}):`, error.response?.data?.message || error.message);
    }
  }

  console.log('\n🎉 Organization name update completed!');
  console.log('\n📋 Updated:');
  console.log('✅ Organization name: Gospel Team → Cimedalis / ሲሜዳሊስ');
  console.log('✅ Bank account names updated');
  console.log('✅ Website titles and descriptions updated');
  console.log('✅ Hero section updated');
  console.log('\n🔧 Changes will be visible on the website immediately!');
};

updateOrganizationName().catch(console.error);