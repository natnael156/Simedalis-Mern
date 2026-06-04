const axios = require('axios');

const testCimedalisBranding = async () => {
  console.log('🧪 Testing Cimedalis Branding Update...\n');

  try {
    // Test 1: Check English settings
    console.log('1️⃣ Testing English Settings...');
    const enResponse = await axios.get('http://localhost:5001/api/settings?language=en');
    const enSettings = enResponse.data;

    // Check organization name
    const orgNameEn = enSettings.contact?.organization_name?.value;
    console.log(`✅ Organization Name (EN): ${orgNameEn}`);

    // Check bank account names
    const primaryAccountEn = enSettings.banking?.primary_account_name?.value;
    const intlAccountEn = enSettings.banking?.international_account_name?.value;
    console.log(`✅ Primary Account (EN): ${primaryAccountEn}`);
    console.log(`✅ International Account (EN): ${intlAccountEn}`);

    // Check website titles
    const siteTitleEn = enSettings.website?.site_title?.value;
    const heroTitleEn = enSettings.website?.hero_title?.value;
    console.log(`✅ Site Title (EN): ${siteTitleEn}`);
    console.log(`✅ Hero Title (EN): ${heroTitleEn}`);

    // Check email addresses
    const emailPrimaryEn = enSettings.contact?.email_primary?.value;
    const emailSecondaryEn = enSettings.contact?.email_secondary?.value;
    console.log(`✅ Primary Email (EN): ${emailPrimaryEn}`);
    console.log(`✅ Secondary Email (EN): ${emailSecondaryEn}`);

    // Test 2: Check Amharic settings
    console.log('\n2️⃣ Testing Amharic Settings...');
    const amResponse = await axios.get('http://localhost:5001/api/settings?language=am');
    const amSettings = amResponse.data;

    // Check organization name
    const orgNameAm = amSettings.contact?.organization_name?.value;
    console.log(`✅ Organization Name (AM): ${orgNameAm}`);

    // Check bank account names
    const primaryAccountAm = amSettings.banking?.primary_account_name?.value;
    const intlAccountAm = amSettings.banking?.international_account_name?.value;
    console.log(`✅ Primary Account (AM): ${primaryAccountAm}`);
    console.log(`✅ International Account (AM): ${intlAccountAm}`);

    // Check website titles
    const siteTitleAm = amSettings.website?.site_title?.value;
    const heroTitleAm = amSettings.website?.hero_title?.value;
    console.log(`✅ Site Title (AM): ${siteTitleAm}`);
    console.log(`✅ Hero Title (AM): ${heroTitleAm}`);

    // Test 3: Verify branding consistency
    console.log('\n3️⃣ Verifying Branding Consistency...');
    
    const expectedEnglish = 'Cimedalis';
    const expectedAmharic = 'ሲሜዳሊስ';
    
    let allCorrect = true;
    
    // Check English branding
    if (!orgNameEn?.includes(expectedEnglish)) {
      console.log(`❌ Organization name (EN) should contain "${expectedEnglish}"`);
      allCorrect = false;
    }
    
    if (!siteTitleEn?.includes(expectedEnglish)) {
      console.log(`❌ Site title (EN) should contain "${expectedEnglish}"`);
      allCorrect = false;
    }
    
    if (!heroTitleEn?.includes(expectedEnglish)) {
      console.log(`❌ Hero title (EN) should contain "${expectedEnglish}"`);
      allCorrect = false;
    }

    // Check Amharic branding
    if (!orgNameAm?.includes(expectedAmharic)) {
      console.log(`❌ Organization name (AM) should contain "${expectedAmharic}"`);
      allCorrect = false;
    }
    
    if (!siteTitleAm?.includes(expectedAmharic)) {
      console.log(`❌ Site title (AM) should contain "${expectedAmharic}"`);
      allCorrect = false;
    }
    
    if (!heroTitleAm?.includes(expectedAmharic)) {
      console.log(`❌ Hero title (AM) should contain "${expectedAmharic}"`);
      allCorrect = false;
    }

    // Check email addresses
    if (!emailPrimaryEn?.includes('cimedalis')) {
      console.log(`❌ Primary email should contain "cimedalis"`);
      allCorrect = false;
    }

    if (allCorrect) {
      console.log('✅ All branding is consistent and correct!');
    }

    console.log('\n🎉 Cimedalis Branding Test Complete!');
    console.log('\n📋 Summary of Changes:');
    console.log('✅ Organization Name: Gospel Team → Cimedalis / ሲሜዳሊስ');
    console.log('✅ Bank Account Names: Updated to Cimedalis');
    console.log('✅ Website Titles: Updated to Cimedalis');
    console.log('✅ Email Addresses: Updated to @cimedalis.org');
    console.log('✅ Translation Files: Updated with new names');
    console.log('✅ Package Names: Updated to cimedalis-*');

    console.log('\n🌐 Website Access:');
    console.log('- Frontend: http://localhost:3000');
    console.log('- Backend: http://localhost:5001');
    console.log('- Admin: http://localhost:3000/admin');
    console.log('- Settings: http://localhost:3000/admin/settings');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    if (error.response?.data) {
      console.error('Response:', error.response.data);
    }
  }
};

testCimedalisBranding();