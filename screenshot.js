const { chromium } = require('playwright');
const fs = require('fs');

async function run() {
  if (!fs.existsSync('/Users/abhinavgupta/Desktop/Portfolio/audit/before')) {
    fs.mkdirSync('/Users/abhinavgupta/Desktop/Portfolio/audit/before', { recursive: true });
  }

  const browser = await chromium.launch();
  const routes = ['/', '/projects/nexora', '/blog', '/now', '/developer'];
  const widths = [360, 768, 1440];
  
  for (const route of routes) {
    for (const width of widths) {
      console.log(`Taking screenshot of ${route} at ${width}px...`);
      const context = await browser.newContext({
        viewport: { width, height: 800 }
      });
      const page = await context.newPage();
      try {
        await page.goto(`http://localhost:4000${route}`, { waitUntil: 'networkidle', timeout: 15000 });
        const name = route === '/' ? 'home' : route.replace(/\//g, '_').substring(1);
        await page.screenshot({ path: `/Users/abhinavgupta/Desktop/Portfolio/audit/before/${name}_${width}.png`, fullPage: true });
      } catch (e) {
        console.error(`Failed on ${route}: ${e}`);
      }
      await context.close();
    }
  }
  
  await browser.close();
  console.log("Done");
}

run();
