#!/usr/bin/env node
/**
 * IndexNow: сообщает Яндексу и Bing, что страницы изменились, —
 * без ожидания планового обхода. Запускать ПОСЛЕ выкладки на прод.
 *
 *   node scripts/indexnow.mjs                 # все URL из sitemap прода
 *   node scripts/indexnow.mjs / /about /blog  # только перечисленные пути
 *   node scripts/indexnow.mjs --dry-run       # показать, что уйдёт, без отправки
 *
 * Ключ — публичный файл public/<KEY>.txt (так требует протокол), не секрет.
 */
const HOST = "xn----ntbbabzzpj.xn--p1ai"; // ии-туризм.рф в punycode
const ORIGIN = `https://${HOST}`;
const KEY = "268681b4289ec81c16c57f57d6d7b262";
const ENDPOINTS = ["https://yandex.com/indexnow", "https://www.bing.com/indexnow"];

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const paths = args.filter((a) => a.startsWith("/"));

async function sitemapUrls() {
  const res = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap: HTTP ${res.status}`);
  const xml = await res.text();
  // В sitemap хост кириллический — приводим к punycode, как в поле host.
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].replace(/^https:\/\/[^/]+/, ORIGIN),
  );
}

const keyCheck = await fetch(`${ORIGIN}/${KEY}.txt`);
if (!keyCheck.ok || (await keyCheck.text()).trim() !== KEY) {
  console.error("Файл ключа на проде не найден — сначала выложите public/<KEY>.txt");
  process.exit(1);
}

const urlList = paths.length ? paths.map((p) => ORIGIN + p) : await sitemapUrls();
console.log(`URL: ${urlList.length}`);
if (dryRun) {
  console.log(urlList.join("\n"));
  process.exit(0);
}

const body = JSON.stringify({
  host: HOST,
  key: KEY,
  keyLocation: `${ORIGIN}/${KEY}.txt`,
  urlList,
});
for (const endpoint of ENDPOINTS) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body,
  });
  // 200 и 202 — приняли; 422 — URL не принадлежат хосту; 429 — слишком часто.
  console.log(`${endpoint} → ${res.status} ${(await res.text()).slice(0, 200)}`);
}
