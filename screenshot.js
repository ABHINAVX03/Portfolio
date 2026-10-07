const { chromium } = require('playwright');
const { exec } = require('child_process');
const fs = require('fs');

async function run() {
  if (!fs.existsSync('/Users/abhinavgupta/Desktop/Portfolio/audit/before')) {
    fs.mkdirSync('/Users/abhinavgupta/Desktop/Portfolio/audit/before', { recursive: true });
  }

  // Start the server
  console.log("Starting next server...");
  const server = exec('npm run start');
  
  // Wait for server to start
  await new Promise(r => setTimeout(r, 5000));
  
  const browser = await chromium.launch();
  const routes = ['/', '/projects/nexora', '/blog', '/developer'];
  const widths = [360, 768, 1440];
  
  for (const route of routes) {
    for (const width of widths) {
      console.log(`Taking screenshot of ${route} at ${width}px...`);
      const context = await browser.newContext({
        viewport: { width, height: 800 }
      });
      const page = await context.newPage();
      try {
        await page.goto(`http://localhost:3000${route}`, { waitUntil: 'networkidle', timeout: 15000 });
        const name = route === '/' ? 'home' : route.replace(/\//g, '_').substring(1);
        await page.screenshot({ path: `/Users/abhinavgupta/Desktop/Portfolio/audit/before/${name}_${width}.png`, fullPage: true });
      } catch (e) {
        console.error(`Failed on ${route}: ${e}`);
      }
      await context.close();
    }
  }
  
  await browser.close();
  server.kill();
  console.log("Done");
}

run();
