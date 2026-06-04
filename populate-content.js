const axios = require('axios');

const populateContent = async () => {
  const baseURL = 'http://localhost:5001/api';
  
  // First, create an admin user and get token
  let token;
  try {
    const loginResponse = await axios.post(`${baseURL}/auth/login`, {
      email: 'admin@gospel.com',
      password: 'adminad'
    });
    token = loginResponse.data.token;
    console.log('✅ Logged in as admin');
  } catch (error) {
    console.log('⚠️  Admin login failed, trying to create admin...');
    try {
      await axios.post(`${baseURL}/auth/register`, {
        username: 'admin',
        email: 'admin@gospel.com',
        password: 'adminad',
        role: 'admin'
      });
      
      const loginResponse = await axios.post(`${baseURL}/auth/login`, {
        email: 'admin@gospel.com',
        password: 'adminad'
      });
      token = loginResponse.data.token;
      console.log('✅ Created admin and logged in');
    } catch (createError) {
      console.error('❌ Failed to create admin:', createError.message);
      return;
    }
  }

  const headers = { Authorization: `Bearer ${token}` };

  // Content to populate
  const contentData = [
    // English Content
    {
      key: 'mission',
      title: 'Our Mission',
      content: 'To spread the Gospel of Jesus Christ through passionate preaching, transformative teaching, and selfless acts of service. We are committed to reaching communities worldwide with God\'s love, compassion, and the life-changing message of salvation through Christ.',
      language: 'en'
    },
    {
      key: 'vision',
      title: 'Our Vision',
      content: 'To witness lives transformed by the power of God\'s Word, creating a thriving community of believers who actively serve, support one another, and extend hope and faith to those in need. We envision a world where Christ\'s love touches every heart.',
      language: 'en'
    },
    {
      key: 'volunteerism',
      title: 'Volunteerism & Service',
      content: 'Our ministry is built on the sacred foundation of voluntary service. Every team member joyfully dedicates their time, God-given talents, and resources to advance His kingdom and serve humanity with Christ-like humility, love, and unwavering dedication.',
      language: 'en'
    },
    {
      key: 'core_values_faith',
      title: 'Faith',
      content: 'Unwavering belief in God\'s word and promises',
      language: 'en'
    },
    {
      key: 'core_values_love',
      title: 'Love',
      content: 'Showing Christ\'s love to all people',
      language: 'en'
    },
    {
      key: 'core_values_service',
      title: 'Service',
      content: 'Serving others with humility and dedication',
      language: 'en'
    },
    {
      key: 'core_values_excellence',
      title: 'Excellence',
      content: 'Striving for excellence in all we do',
      language: 'en'
    },
    
    // Amharic Content
    {
      key: 'mission',
      title: 'የእኛ ተልእኮ',
      content: 'የኢየሱስ ክርስቶስን ወንጌል በተለዋዋጭ ስብከት፣ በህይወት ለውጥ ባለው ትምህርት እና በራስ ወዳድነት በሌለው አገልግሎት ማሰራጨት። በዓለም ዙሪያ ያሉ ማህበረሰቦችን በእግዚአብሔር ፍቅር፣ በርህራሄ እና በክርስቶስ የህይወት ለውጥ መዳን መልእክት ለመድረስ ቆርጠን ተነስተናል።',
      language: 'am'
    },
    {
      key: 'vision',
      title: 'የእኛ ራዕይ',
      content: 'በእግዚአብሔር ቃል ኃይል የተለወጡ ህይወቶችን ማየት፣ በንቃት የሚያገለግሉ፣ እርስ በርስ የሚደጋገፉ እና ተስፋና እምነት ለሚፈልጉ ሰዎች እጃቸውን የሚዘረጉ የአማኞች ማህበረሰብ መፍጠር። የክርስቶስ ፍቅር እያንዳንዱን ልብ የሚነካበትን ዓለም እናስባለን።',
      language: 'am'
    },
    {
      key: 'volunteerism',
      title: 'በጎ ፈቃደኝነት እና አገልግሎት',
      content: 'የእኛ አገልግሎት በተቀደሰ የበጎ ፈቃደኝ አገልግሎት መሰረት ላይ የተገነባ ነው። እያንዳንዱ የቡድን አባል የእግዚአብሔርን መንግስት ለማስፋት እና ሰብአዊነትን በክርስቶስ መሰል ትህትና፣ ፍቅር እና የማይናወጥ ቁርጠኝነት ለማገልገል ጊዜውን፣ በእግዚአብሔር የተሰጠውን ችሎታ እና ሀብቱን በደስታ ይሰጣል።',
      language: 'am'
    },
    {
      key: 'core_values_faith',
      title: 'እምነት',
      content: 'በእግዚአብሔር ቃል እና ተስፋዎች ላይ የማይናወጥ እምነት',
      language: 'am'
    },
    {
      key: 'core_values_love',
      title: 'ፍቅር',
      content: 'የክርስቶስን ፍቅር ለሁሉም ሰዎች ማሳየት',
      language: 'am'
    },
    {
      key: 'core_values_service',
      title: 'አገልግሎት',
      content: 'ሌሎችን በትህትና እና በቁርጠኝነት ማገልገል',
      language: 'am'
    },
    {
      key: 'core_values_excellence',
      title: 'ምርጥነት',
      content: 'በምናደርገው ሁሉ ለምርጥነት መጣር',
      language: 'am'
    }
  ];

  console.log('🔄 Populating content...');

  for (const content of contentData) {
    try {
      await axios.post(`${baseURL}/content`, content, { headers });
      console.log(`✅ Added: ${content.key} (${content.language})`);
    } catch (error) {
      console.log(`⚠️  Failed to add ${content.key} (${content.language}):`, error.response?.data?.message || error.message);
    }
  }

  console.log('\n🎉 Content population completed!');
  console.log('\n📋 Next steps:');
  console.log('1. Start your backend: cd backend && npm start');
  console.log('2. Start your frontend: cd frontend && npm start');
  console.log('3. Content will now be loaded from database');
};

populateContent().catch(console.error);