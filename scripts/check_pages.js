const fs = require('fs');

async function checkPages() {
  const pages = [
    'contact',
    'about-us',
    'terms-conditions',
    'privacy-policy',
    'returns-cancellations',
    'shipping-policy'
  ];

  for (const p of pages) {
    const url = `https://vastraabharana.com/pages/${p}`;
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const text = await res.text();
    fs.writeFileSync(`./extracted_raw/page_${p}.html`, text, 'utf-8');
    
    // Extract main content
    const mainContent = text.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] || '';
    const cleanText = mainContent.replace(/<style[\s\S]*?<\/style>/gi, '')
                                .replace(/<script[\s\S]*?<\/script>/gi, '')
                                .replace(/<[^>]+>/g, ' ')
                                .replace(/\s+/g, ' ')
                                .trim();
    console.log(`=== PAGE: ${p} (${cleanText.length} chars) ===`);
    console.log(cleanText.slice(0, 300));
  }
}

checkPages().catch(console.error);
