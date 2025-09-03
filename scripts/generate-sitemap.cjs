const fs = require('fs');
const path = require('path');

// Import portfolio data
const portfolioDataPath = path.join(__dirname, '../src/data/portfolioData.ts');
const portfolioContent = fs.readFileSync(portfolioDataPath, 'utf8');

// Extract portfolio items from the file
const portfolioItemsMatch = portfolioContent.match(/export const portfolioItems[\s\S]*?(?=export|$)/);
if (!portfolioItemsMatch) {
  console.error('Could not find portfolioItems in portfolioData.ts');
  process.exit(1);
}

// Parse portfolio items to extract slugs
const slugMatches = portfolioContent.match(/slug: ['"]([^'"]+)['"]/g);
const portfolioSlugs = slugMatches ? slugMatches.map(match => match.match(/slug: ['"]([^'"]+)['"]/)[1]) : [];

// Base URL
const baseUrl = 'https://ondor.com.br';

// Static pages
const staticPages = [
  { url: '', priority: '1.0', changefreq: 'weekly' }, // Home
  { url: '/portfolio', priority: '0.9', changefreq: 'weekly' },
  { url: '/servicos', priority: '0.8', changefreq: 'monthly' },
  { url: '/sobre', priority: '0.7', changefreq: 'monthly' },
  { url: '/contato', priority: '0.8', changefreq: 'monthly' }
];

// Portfolio pages
const portfolioPages = portfolioSlugs.map(slug => ({
  url: `/portfolio/${slug}`,
  priority: '0.8',
  changefreq: 'monthly'
}));

// Combine all pages
const allPages = [...staticPages, ...portfolioPages];

// Generate sitemap XML
const generateSitemap = () => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
`;
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
  
  allPages.forEach(page => {
    sitemap += `  <url>
`;
    sitemap += `    <loc>${baseUrl}${page.url}</loc>
`;
    sitemap += `    <lastmod>${currentDate}</lastmod>
`;
    sitemap += `    <changefreq>${page.changefreq}</changefreq>
`;
    sitemap += `    <priority>${page.priority}</priority>
`;
    sitemap += `  </url>
`;
  });
  
  sitemap += `</urlset>`;
  
  return sitemap;
};

// Write sitemap to public folder
const sitemapContent = generateSitemap();
const publicPath = path.join(__dirname, '../public/sitemap.xml');

fs.writeFileSync(publicPath, sitemapContent, 'utf8');

console.log(`✅ Sitemap generated successfully!`);
console.log(`📍 Location: ${publicPath}`);
console.log(`📊 Total pages: ${allPages.length}`);
console.log(`   - Static pages: ${staticPages.length}`);
console.log(`   - Portfolio pages: ${portfolioPages.length}`);
console.log(`🔗 Portfolio slugs found: ${portfolioSlugs.join(', ')}`);