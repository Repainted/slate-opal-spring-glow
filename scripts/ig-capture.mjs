import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

mkdirSync("/workspace/screenshots/ig", { recursive: true });
const browser = await chromium.launch();
const pages = [
  { url: "http://127.0.0.1:8080/digitale", file: "digitale.png", wait: 2500 },
  { url: "http://127.0.0.1:8080/", file: "portale.png", wait: 2500 },
  { url: "http://127.0.0.1:8080/lab", file: "lab.png", wait: 3000 },
  { url: "http://127.0.0.1:8080/lab/atlante", file: "atlante.png", wait: 4000 },
  { url: "http://127.0.0.1:8080/lab/biosfera", file: "biosfera.png", wait: 4000 },
  { url: "http://127.0.0.1:8080/lab/drone.html", file: "drone.png", wait: 12000 },
  { url: "http://127.0.0.1:8080/natura", file: "natura.png", wait: 2500 },
  { url: "http://127.0.0.1:8080/lab/faggeta", file: "faggeta.png", wait: 3500 },
  { url: "http://127.0.0.1:8080/lab/sentieri", file: "sentieri.png", wait: 3500 },
];

for (const job of pages) {
  const context = await browser.newContext({
    viewport: { width: 1080, height: 1920 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  try {
    await page.goto(job.url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(job.wait);
    if (job.file === "drone.png") {
      await page.evaluate(() => {
        const b = document.getElementById("btnGo");
        if (b) b.click();
      });
      await page.waitForTimeout(2500);
    }
    await page.screenshot({ path: `/workspace/screenshots/ig/${job.file}`, type: "png" });
    console.log("ok", job.file);
  } catch (e) {
    console.log("fail", job.file, String(e).slice(0, 200));
  }
  await context.close();
}
await browser.close();
