/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://blog.jmr-eric.workers.dev',
  generateIndexSitemap: false,
  generateRobotsTxt: true,
  exclude: ['/api/*'],
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
};
