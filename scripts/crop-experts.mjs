import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const ASSETS =
  "/Users/lukiansilagadze/.cursor/projects/Users-lukiansilagadze-Projects-aimpact-tourism-claude/assets";
const OUT = "public/experts";

await mkdir(OUT, { recursive: true });

const tasks = [
  // Барзыкин — 180×240 портрет; square 180×180 от верха (head&shoulders).
  {
    src: `${ASSETS}/avatar-f8ed1e54-fda8-4a0a-a3a6-a04f3ffe5aea.png`,
    out: `${OUT}/barzykin.jpg`,
    extract: { left: 0, top: 0, width: 180, height: 180 },
  },
  // Осауленко — 1024×682 landscape, лицо в центре сверху;
  // зумируем на голову+плечи, обрезая стол снизу и поля по бокам.
  {
    src: `${ASSETS}/____________________________-796c3311-3a35-4f3f-ad2f-b547db1a1b9d.png`,
    out: `${OUT}/osaulenko.jpg`,
    extract: { left: 285, top: 60, width: 460, height: 460 },
  },
  // Тарасова — 282×352 портрет; берём 282×282 чуть выше центра.
  {
    src: `${ASSETS}/____________________________-114607b8-2a8e-4291-a803-3fc5c9fd055d.png`,
    out: `${OUT}/tarasova.jpg`,
    extract: { left: 0, top: 20, width: 282, height: 282 },
  },
  // Романова — 300×400 портрет; берём 300×300 от верха (head&shoulders).
  {
    src: `${ASSETS}/romanova-89aab589-ec78-4318-952e-67d2ec40b0e2.png`,
    out: `${OUT}/romanova.jpg`,
    extract: { left: 0, top: 0, width: 300, height: 300 },
  },
  // Агафонов — 1024×581 landscape со сцены; зумируем на голову+плечи,
  // отрезая фон с логотипами по краям и нижнюю часть со столом.
  {
    src: `${ASSETS}/image-8c2e2679-9c67-47f7-8058-127f103b3e00.png`,
    out: `${OUT}/agafonov.jpg`,
    extract: { left: 320, top: 30, width: 460, height: 460 },
  },
];

for (const t of tasks) {
  await sharp(t.src)
    .extract(t.extract)
    .resize(320, 320, { fit: "cover", position: "center" })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(t.out);
  console.log(`ok ${t.out}`);
}
