// Quick test script for TireRaven API
// Run with: node test-api.js

const TIRERAVEN_API_KEY = 'tireraven_live_c74cb1a7cd499ce4b006a6ab6936058c0e3f209c758988a6279b91fa9865fa73';
const TIRERAVEN_API_BASE = 'https://api.tireraven.com/api/external/v1';

async function testAPI() {
  try {
    console.log('Testing TireRaven API...\n');

    const response = await fetch(`${TIRERAVEN_API_BASE}/items?per_page=5`, {
      headers: {
        'X-API-Key': TIRERAVEN_API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    console.log('✅ API Connection Successful!\n');
    console.log(`Total items in inventory: ${data.pagination.total_count}`);
    console.log(`Total pages: ${data.pagination.total_pages}`);
    console.log(`Items per page: ${data.pagination.per_page}\n`);

    console.log('Sample tire data:');
    console.log('─────────────────────────────────────────────────────────');

    data.data.slice(0, 3).forEach(tire => {
      console.log(`\n📦 ${tire.nav}`);
      console.log(`   Brand: ${tire.brand.name}`);
      console.log(`   Size: ${tire.size}`);
      console.log(`   Price: $${tire.price}`);
      console.log(`   Stock: ${tire.stock_quantity} units`);
      console.log(`   Available: ${tire.available ? '✓' : '✗'}`);
    });

    console.log('\n─────────────────────────────────────────────────────────');
    console.log('\n✅ TireRaven API is working correctly!');
    console.log('Your website will now display real inventory data.\n');

  } catch (error) {
    console.error('❌ API Test Failed:', error.message);
  }
}

testAPI();
