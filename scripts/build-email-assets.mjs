// Конвертирует и нормализует ассеты для email-рассылки.
// Запуск:  node scripts/build-email-assets.mjs
import sharp from "sharp";
import { readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = "/Users/lukiansilagadze/Desktop/иимпакт+ сайт веб";
const PRES = "/Users/lukiansilagadze/Desktop/aimpact_presentation/assets";
const OUT = path.join(ROOT, "public/email/img");

async function renderSvg(svgPath, outPath, opts) {
  const { width, height, background = { r: 255, g: 255, b: 255, alpha: 0 }, fit = "contain", padding = 0 } = opts;
  const svg = await readFile(svgPath);
  const tmp = await sharp(svg, { density: 384 }).png().toBuffer();
  const targetW = Math.max(1, width - padding * 2);
  const targetH = Math.max(1, height - padding * 2);
  const resized = await sharp(tmp)
    .resize({ width: targetW, height: targetH, fit, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  await sharp({ create: { width, height, channels: 4, background } })
    .composite([{ input: resized, gravity: "centre" }])
    .png({ compressionLevel: 9, quality: 92 })
    .toFile(outPath);
  console.log(`  ✓ ${path.basename(outPath)}  → ${width}×${height}`);
}

async function renderSvgByHeight(svgPath, outPath, height, bg = { r: 0, g: 0, b: 0, alpha: 0 }) {
  // Рендер SVG с фиксированной высотой, ширина — пропорционально.
  // Если bg.alpha === 0 — сохраняем прозрачный канал. Иначе — flatten поверх bg.
  const svg = await readFile(svgPath);
  let pipe = sharp(svg, { density: 384 })
    .resize({ height, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } });
  if (bg.alpha !== 0) pipe = pipe.flatten({ background: bg });
  await pipe.png({ compressionLevel: 9, quality: 92 }).toFile(outPath);
  const m = await sharp(outPath).metadata();
  console.log(`  ✓ ${path.basename(outPath)}  → ${m.width}×${m.height}`);
  return m;
}

async function renderRaster(srcPath, outPath, opts) {
  const { width, height, background = { r: 255, g: 255, b: 255, alpha: 0 }, fit = "contain", padding = 0, round = false } = opts;
  const targetW = Math.max(1, width - padding * 2);
  const targetH = Math.max(1, height - padding * 2);
  let resized = await sharp(srcPath)
    .resize({ width: targetW, height: targetH, fit, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  if (round) {
    const mask = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><circle cx="${width / 2}" cy="${height / 2}" r="${Math.min(width, height) / 2}" fill="#fff"/></svg>`,
    );
    const final = await sharp({ create: { width, height, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
      .composite([{ input: resized, gravity: "centre" }, { input: mask, blend: "dest-in" }])
      .png({ compressionLevel: 9 })
      .toBuffer();
    await sharp(final).toFile(outPath);
  } else {
    await sharp({ create: { width, height, channels: 4, background } })
      .composite([{ input: resized, gravity: "centre" }])
      .png({ compressionLevel: 9, quality: 92 })
      .toFile(outPath);
  }
  console.log(`  ✓ ${path.basename(outPath)}  → ${width}×${height}`);
}

async function main() {
  // 1) AIMPACT+ wordmark (для шапки на ТЁМНОМ фоне → инверт цвет нельзя из embedded PNG;
  //    рисуем «как есть»: тёмный синий wordmark на белой плашке-карточке)
  //    Также делаем версию на тёмном фоне (с белым окружением) для hero
  await renderSvgByHeight(path.join(PRES, "brand/aimpact-wordmark.svg"), path.join(OUT, "logo-aimpact.png"), 128);

  // 2) Навылет! AI wordmark (для секции продукта)
  await renderSvgByHeight(path.join(PRES, "brand/navilet-wordmark.svg"), path.join(OUT, "logo-navilet.png"), 96);

  // 3) Globe (mark) — Navilet airplane globe для иконок продукта
  await renderSvg(path.join(PRES, "brand/globe-logo.svg"), path.join(OUT, "mark-navilet.png"), { width: 144, height: 144 });

  // 4) AIMPACT+ короткая глобус-иконка (без wordmark)
  //    Используем тот же aimpact-wordmark но кропнем в нём только глобус через высоту?
  //    Проще — используем уже готовый /icon-192.png проекта
  // skip — буду референсить /icon-192.png основного сайта.

  // 5) Кейсы (240×120, белый фон)
  await renderSvg(path.join(PRES, "partners/infoflot-logo.svg"), path.join(OUT, "case-infoflot.png"), {
    width: 240, height: 120, padding: 14, background: { r: 255, g: 255, b: 255, alpha: 1 },
  });
  // У PNG в aimpact_presentation чёрный фон — используем альтернативный из navilet-репо,
  // где логотип сохранён на белом фоне 2048×2048.
  const mgpSrc = "/tmp/navilet_website/public/partners/mgp-logo.png";
  await renderRaster(mgpSrc, path.join(OUT, "case-mgp.png"), {
    width: 240, height: 120, padding: 14, background: { r: 255, g: 255, b: 255, alpha: 1 },
  });
  await renderRaster(path.join(PRES, "partners/delas-logo.png"), path.join(OUT, "case-delas.png"), {
    width: 240, height: 120, padding: 14, background: { r: 255, g: 255, b: 255, alpha: 1 },
  });

  // 6) Институциональные партнёры (200×80, белый фон)
  await renderSvg(path.join(PRES, "partners/tpp-logo.svg"), path.join(OUT, "partner-tpp.png"), {
    width: 200, height: 80, padding: 10, background: { r: 255, g: 255, b: 255, alpha: 1 },
  });
  await renderSvg(path.join(PRES, "partners/mgimo-logo.svg"), path.join(OUT, "partner-mgimo.png"), {
    width: 200, height: 80, padding: 10, background: { r: 255, g: 255, b: 255, alpha: 1 },
  });
  await renderRaster(path.join(PRES, "partners/rst-logo.png"), path.join(OUT, "partner-rst.png"), {
    width: 200, height: 80, padding: 10, background: { r: 255, g: 255, b: 255, alpha: 1 },
  });
  await renderRaster(path.join(PRES, "partners/plekhanov-logo.png"), path.join(OUT, "partner-plekhanov.png"), {
    width: 200, height: 80, padding: 10, background: { r: 255, g: 255, b: 255, alpha: 1 },
  });

  // 7) Эксперт (Агафонов) — круглый аватар 96×96
  await renderRaster(path.join(PRES, "experts/agafonov.jpg"), path.join(OUT, "expert-agafonov.png"), {
    width: 96, height: 96, fit: "cover", round: true,
  });

  console.log("\nDone.");
}

main().catch((e) => { console.error(e); process.exit(1); });
