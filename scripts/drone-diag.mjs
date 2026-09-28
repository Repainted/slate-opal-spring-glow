import { chromium } from "playwright";

const url = process.argv[2] || "http://127.0.0.1:8080/lab/drone";
const browser = await chromium.launch();
const page = await browser.newPage();
const failed = [];
const consoleMsgs = [];
page.on("requestfailed", (r) => {
  failed.push(`${r.failure()?.errorText || "?"} ${r.url().slice(0, 200)}`);
});
page.on("console", (m) => consoleMsgs.push(`${m.type()}: ${m.text().slice(0, 240)}`));
page.on("pageerror", (e) => consoleMsgs.push(`pageerror: ${e.message}`));
await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
await page.waitForTimeout(5000);
const frames = page.frames().map((f) => f.url().slice(0, 100));
const iframe = await page.$("iframe");
const box = iframe ? await iframe.boundingBox() : null;
let inner = null;
if (iframe) {
  const fh = await iframe.contentFrame();
  if (fh) {
    inner = await fh.evaluate(() => ({
      title: document.title,
      three: typeof window.THREE,
      loading: document.getElementById("loading")?.style.display,
      start: document.getElementById("start")?.style.display,
      loadTxt: document.getElementById("loadTxt")?.textContent,
      canvas: !!document.querySelector("canvas"),
      err: window.__droneErr || null,
    }));
  }
}
console.log(JSON.stringify({ frames, box, inner, failed: failed.slice(0, 30), consoleMsgs: consoleMsgs.slice(0, 40) }, null, 2));
await page.screenshot({ path: "/workspace/screenshots/drone-diag.png", fullPage: false });
await browser.close();
