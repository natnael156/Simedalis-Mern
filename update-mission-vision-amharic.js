const axios = require('axios');

const updateMissionVisionAmharic = async () => {
  const baseURL = 'http://localhost:5001/api';
  
  console.log('🔄 Updating Mission and Vision with Amharic Text...\n');

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

  // Content with user-provided Amharic and English text
  const contentUpdates = [
    // Vision (ራእይ) - Amharic
    {
      key: 'vision',
      title: 'ራእይ',
      content: 'የተስጠንን ታላቅ ተልዕኮ በንፁ መስዋዕትነት እና በተቆረሰ ሕይወት ባልተዳረሰ ህዝብ ክፍል መካከል  ተዲርሶ ማየት።',
      language: 'am'
    },
    
    // Vision - English
    {
      key: 'vision',
      title: 'Our Vision',
      content: 'To see the great mission given to us fulfilled through pure sacrifice and the sacrifice of a life lost among the unreached sections of the population.',
      language: 'en'
    },
    
    // Mission (ተልእኮ) - Amharic
    {
      key: 'mission',
      title: 'ተልእኮ',
      content: 'በሀገር ውስጥ እና ከሀገር ውጭ ያሉትን አብያተ ክርስቲያናት ታላቁን ተልእኮ ከተቆረሰ ሕይወት ጋር ላልተዳረሰ የህዝብ ክፍል እንዲያደርሱ በስልጠና እና በአቅም ማገዝ አንዲሁም በቤተክርስትያን  በሌሉበት ሰፍራ ቤተክርስትያን መትከል እና ሚሽነሪ ማሳማሪት።',
      language: 'am'
    },

    // Mission - English  
    {
      key: 'mission',
      title: 'Our Mission',
      content: 'To train and empower churches at home and abroad to reach the unreached with the Great Commission through a life of sacrifice, as well as to plant churches and engage in missionary work in unchurched areas.',
      language: 'en'
    }
  ];

  console.log('🔄 Updating content...');

  for (const content of contentUpdates) {
    try {
      await axios.post(`${baseURL}/content`, content, { headers });
      console.log(`✅ Updated: ${content.key} (${content.language})`);
      console.log(`   Title: ${content.title}`);
      console.log(`   Content: ${content.content.substring(0, 100)}...`);
    } catch (error) {
      console.log(`⚠️  Failed to update ${content.key}:`, error.response?.data?.message || error.message);
    }
  }

  console.log('\n🎉 Mission and Vision updated with Amharic text!');
  console.log('\n📋 Updated Content:');
  console.log('✅ Mission (ራእይ): Updated with provided Amharic text');
  console.log('✅ Vision (ተልዕኮ): Updated with provided Amharic text');
  console.log('\n🔧 Changes will be visible on the website immediately!');
  console.log('\n🌐 Check the updates at:');
  console.log('- Home About Section: http://localhost:3000/#about');
  console.log('- About Page: http://localhost:3000/about');
  console.log('- Switch to Amharic to see the new content');
};

updateMissionVisionAmharic().catch(console.error);