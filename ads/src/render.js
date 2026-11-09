// Export the ads: PNG for every concept × format, frame sequences for the videos.
// Usage: node render.js stills | node render.js video <c> <f> <outDir>
// Expects ads/src served on http://localhost:3400 (python3 -m http.server 3400).
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const BASE = "http://localhost:3400/ad.html";
const NAMES = { 1: "01-tabela-plecari", 2: "02-acasa-de-craciun", 3: "03-doar-al-vostru", 4: "04-pret-clar" };
const SIZES = { "4x5": [1080, 1350], "1x1": [1080, 1080], "9x16": [1080, 1920] };
const EXPORT = path.join(__dirname, "..", "export");

async function open(browser, c, f) {
  const [w, h] = SIZES[f];
  const page = await (await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 })).newPage();
  page.on("pageerror", (e) => console.log("PAGEERROR", c, f, e.message));
  await page.goto(`${BASE}?c=${c}&f=${f}`, { waitUntil: "networkidle" });
  await page.evaluate(() => window.__ready);
  return page;
}

(async () => {
  const [mode, c, f, out] = process.argv.slice(2);
  const browser = await chromium.launch();
  fs.mkdirSync(EXPORT, { recursive: true });
  if (mode === "stills") {
    for (const cc of [1, 2, 3, 4]) for (const ff of Object.keys(SIZES)) {
      const page = await open(browser, cc, ff);
      await page.evaluate(() => window.__seek(window.__hold + 2));
      await page.waitForTimeout(150);
      const file = path.join(EXPORT, `${NAMES[cc]}_${ff.replace("x", "x")}.png`);
      await page.screenshot({ path: file });
      console.log("png", path.basename(file));
      await page.context().close();
    }
  } else {
    const page = await open(browser, c, f);
    const dur = await page.evaluate(() => window.__duration);
    fs.rmSync(out, { recursive: true, force: true }); fs.mkdirSync(out, { recursive: true });
    const n = Math.round(dur * 30);
    for (let i = 0; i < n; i++) {
      await page.evaluate((t) => window.__seek(t), i / 30);
      await page.screenshot({ path: path.join(out, `${String(i).padStart(4, "0")}.png`) });
    }
    console.log("frames", n, c, f);
  }
  await browser.close();
})();
