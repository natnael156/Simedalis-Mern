const mysql = require('mysql2/promise');

const checkTable = async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'gospel_team'
    });

    console.log('📋 Checking slider_images table...\n');
    
    const [tables] = await connection.query("SHOW TABLES LIKE 'slider_images'");
    if (tables.length === 0) {
      console.log('❌ Table slider_images does NOT exist!');
    } else {
      console.log('✅ Table slider_images exists');
      
      const [columns] = await connection.query('DESCRIBE slider_images');
      console.log('\nTable structure:');
      columns.forEach(col => {
        console.log(`  - ${col.Field}: ${col.Type}`);
      });
      
      const [rows] = await connection.query('SELECT * FROM slider_images');
      console.log(`\nTotal slides in database: ${rows.length}`);
      if (rows.length > 0) {
        console.log('\nSlides:');
        rows.forEach(row => {
          console.log(`  ID: ${row.id}, Image: ${row.image}, Active: ${row.is_active}`);
        });
      }
    }

    await connection.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

checkTable();
