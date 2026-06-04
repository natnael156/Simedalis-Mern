const axios = require('axios');

const populateSettings = async () => {
  const baseURL = 'http://localhost:5001/api';
  
  // First, get token
  let token;
  try {
    const loginResponse = await axios.post(`${baseURL}/auth/login`, {
      email: 'admin@gospel.com',
      password: 'adminad'
    });
    token = loginResponse.data.token;
    console.log('✅ Logged in as admin');
  } catch (error) {
    console.error('❌ Failed to login:', error.message);
    return;
  }

  const headers = { Authorization: `Bearer ${token}` };

  // Settings to populate
  const settingsData = [
    // Bank Information - English
    {
      key: 'primary_bank_name',
      value: 'Commercial Bank of Ethiopia',
      category: 'banking',
      language: 'en'
    },
    {
      key: 'primary_account_name',
      value: 'Gospel Team',
      category: 'banking',
      language: 'en'
    },
    {
      key: 'primary_account_number',
      value: '1000123456789',
      category: 'banking',
      language: 'en'
    },
    {
      key: 'primary_routing_number',
      value: '123456789',
      category: 'banking',
      language: 'en'
    },
    {
      key: 'primary_swift_code',
      value: 'CBETETAA',
      category: 'banking',
      language: 'en'
    },
    {
      key: 'international_bank_name',
      value: 'Dashen Bank',
      category: 'banking',
      language: 'en'
    },
    {
      key: 'international_account_name',
      value: 'Gospel Team International',
      category: 'banking',
      language: 'en'
    },
    {
      key: 'international_iban',
      value: 'ET29 DASH 4016 1331 9268 19',
      category: 'banking',
      language: 'en'
    },
    {
      key: 'international_swift_code',
      value: 'DASHETET1',
      category: 'banking',
      language: 'en'
    },

    // Bank Information - Amharic
    {
      key: 'primary_bank_name',
      value: 'የኢትዮጵያ ንግድ ባንክ',
      category: 'banking',
      language: 'am'
    },
    {
      key: 'primary_account_name',
      value: 'ወንጌል ቡድን',
      category: 'banking',
      language: 'am'
    },
    {
      key: 'primary_account_number',
      value: '1000123456789',
      category: 'banking',
      language: 'am'
    },
    {
      key: 'primary_routing_number',
      value: '123456789',
      category: 'banking',
      language: 'am'
    },
    {
      key: 'primary_swift_code',
      value: 'CBETETAA',
      category: 'banking',
      language: 'am'
    },
    {
      key: 'international_bank_name',
      value: 'ዳሽን ባንክ',
      category: 'banking',
      language: 'am'
    },
    {
      key: 'international_account_name',
      value: 'ወንጌል ቡድን ዓለም አቀፍ',
      category: 'banking',
      language: 'am'
    },
    {
      key: 'international_iban',
      value: 'ET29 DASH 4016 1331 9268 19',
      category: 'banking',
      language: 'am'
    },
    {
      key: 'international_swift_code',
      value: 'DASHETET1',
      category: 'banking',
      language: 'am'
    },

    // Contact Information - English
    {
      key: 'organization_name',
      value: 'Gospel Team Ministry',
      category: 'contact',
      language: 'en'
    },
    {
      key: 'address_line1',
      value: '123 Faith Street',
      category: 'contact',
      language: 'en'
    },
    {
      key: 'address_line2',
      value: 'Hope District',
      category: 'contact',
      language: 'en'
    },
    {
      key: 'city',
      value: 'Addis Ababa',
      category: 'contact',
      language: 'en'
    },
    {
      key: 'country',
      value: 'Ethiopia',
      category: 'contact',
      language: 'en'
    },
    {
      key: 'postal_code',
      value: '1000',
      category: 'contact',
      language: 'en'
    },
    {
      key: 'phone_primary',
      value: '+251 911 123 456',
      category: 'contact',
      language: 'en'
    },
    {
      key: 'phone_secondary',
      value: '+251 911 654 321',
      category: 'contact',
      language: 'en'
    },
    {
      key: 'email_primary',
      value: 'info@gospelteam.org',
      category: 'contact',
      language: 'en'
    },
    {
      key: 'email_secondary',
      value: 'contact@gospelteam.org',
      category: 'contact',
      language: 'en'
    },

    // Contact Information - Amharic
    {
      key: 'organization_name',
      value: 'ወንጌል ቡድን አገልግሎት',
      category: 'contact',
      language: 'am'
    },
    {
      key: 'address_line1',
      value: '123 እምነት ጎዳና',
      category: 'contact',
      language: 'am'
    },
    {
      key: 'address_line2',
      value: 'ተስፋ ክፍለ ከተማ',
      category: 'contact',
      language: 'am'
    },
    {
      key: 'city',
      value: 'አዲስ አበባ',
      category: 'contact',
      language: 'am'
    },
    {
      key: 'country',
      value: 'ኢትዮጵያ',
      category: 'contact',
      language: 'am'
    },
    {
      key: 'postal_code',
      value: '1000',
      category: 'contact',
      language: 'am'
    },
    {
      key: 'phone_primary',
      value: '+251 911 123 456',
      category: 'contact',
      language: 'am'
    },
    {
      key: 'phone_secondary',
      value: '+251 911 654 321',
      category: 'contact',
      language: 'am'
    },
    {
      key: 'email_primary',
      value: 'info@gospelteam.org',
      category: 'contact',
      language: 'am'
    },
    {
      key: 'email_secondary',
      value: 'contact@gospelteam.org',
      category: 'contact',
      language: 'am'
    },

    // Website Settings - English
    {
      key: 'site_title',
      value: 'Gospel Team Ministry - Spreading God\'s Love',
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
      value: 'Welcome to Gospel Team Ministry',
      category: 'website',
      language: 'en'
    },
    {
      key: 'hero_subtitle',
      value: 'Spreading God\'s Love Through Faith, Service, and Community',
      category: 'website',
      language: 'en'
    },
    {
      key: 'donation_note',
      value: 'Please include your name and contact information with your donation for verification and receipt purposes.',
      category: 'website',
      language: 'en'
    },

    // Website Settings - Amharic
    {
      key: 'site_title',
      value: 'ወንጌል ቡድን አገልግሎት - የእግዚአብሔርን ፍቅር ማሰራጨት',
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
      value: 'ወደ ወንጌል ቡድን አገልግሎት እንኳን በደህና መጡ',
      category: 'website',
      language: 'am'
    },
    {
      key: 'hero_subtitle',
      value: 'የእግዚአብሔርን ፍቅር በእምነት፣ በአገልግሎት እና በማህበረሰብ ማሰራጨት',
      category: 'website',
      language: 'am'
    },
    {
      key: 'donation_note',
      value: 'እባክዎ ለማረጋገጫ እና ደረሰኝ ዓላማዎች ከለግስዎ ጋር ስምዎን እና የመገናኛ መረጃዎን ያካትቱ።',
      category: 'website',
      language: 'am'
    },

    // Social Media - Both languages (same values)
    {
      key: 'facebook_url',
      value: 'https://facebook.com/gospelteam',
      category: 'social',
      language: 'en'
    },
    {
      key: 'twitter_url',
      value: 'https://twitter.com/gospelteam',
      category: 'social',
      language: 'en'
    },
    {
      key: 'instagram_url',
      value: 'https://instagram.com/gospelteam',
      category: 'social',
      language: 'en'
    },
    {
      key: 'youtube_url',
      value: 'https://youtube.com/gospelteam',
      category: 'social',
      language: 'en'
    },
    {
      key: 'facebook_url',
      value: 'https://facebook.com/gospelteam',
      category: 'social',
      language: 'am'
    },
    {
      key: 'twitter_url',
      value: 'https://twitter.com/gospelteam',
      category: 'social',
      language: 'am'
    },
    {
      key: 'instagram_url',
      value: 'https://instagram.com/gospelteam',
      category: 'social',
      language: 'am'
    },
    {
      key: 'youtube_url',
      value: 'https://youtube.com/gospelteam',
      category: 'social',
      language: 'am'
    }
  ];

  console.log('🔄 Populating settings...');

  for (const setting of settingsData) {
    try {
      await axios.post(`${baseURL}/settings`, setting, { headers });
      console.log(`✅ Added: ${setting.category}/${setting.key} (${setting.language})`);
    } catch (error) {
      console.log(`⚠️  Failed to add ${setting.category}/${setting.key} (${setting.language}):`, error.response?.data?.message || error.message);
    }
  }

  console.log('\n🎉 Settings population completed!');
  console.log('\n📋 Categories populated:');
  console.log('- Banking: Bank account information');
  console.log('- Contact: Address and contact details');
  console.log('- Website: Site titles and descriptions');
  console.log('- Social: Social media links');
  console.log('\n🔧 Next steps:');
  console.log('1. Update frontend components to use settings');
  console.log('2. Create admin interface for editing settings');
  console.log('3. Test settings integration');
};

populateSettings().catch(console.error);