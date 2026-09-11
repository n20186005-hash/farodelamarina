/**
 * 图库图片压缩与派生资源生成脚本
 * ------------------------------------------------------------------
 * 原图命名规范：<前缀>-<序号>.<扩展名>，例如 navy-lighthouse-1.jpg
 * 只允许小写字母、数字与连字符，禁止空格 / 括号 / 下划线。
 * 符合规范的名字无需 URL 转义，页面与结构化数据里也不必再包 encodeURIComponent。
 *
 * 产出：
 *   public/gallery/*.jpg         原图（超过阈值时原地压缩，长边限制 1920）
 *   public/gallery/web/*.webp    灯箱用的全尺寸 WebP
 *   public/gallery/thumbs/*.jpg  网格缩略图（长边 720）
 *   public/gallery/thumbs/*.webp 网格缩略图 WebP
 *   src/gallery-data.json        供页面消费的图片清单（含尺寸，避免 CLS）
 *
 * 脚本具备幂等性：已压缩过的原图不会被二次压缩，避免反复有损编码。
 */
const fs = require("fs");
const path = require("path");

// sharp 属于构建期依赖；若运行环境未安装（例如仅装了生产依赖），
// 直接沿用仓库中已提交的 src/gallery-data.json，不阻断构建。
let sharp = null;
try {
  sharp = require("sharp");
} catch {
  console.log("[optimize-images] 未检测到 sharp，跳过图片优化，沿用现有 src/gallery-data.json");
  process.exit(0);
}

const MAX_FULL_WIDTH = 1920;
const RECOMPRESS_THRESHOLD = 800 * 1024; // 超过 800KB 才重新编码原图
// 重编码收益低于该比例即视为「已经压过」，不再写回。
// 否则体积刚好卡在阈值之上的原图（如 809KB / 阈值 800KB）会在每次构建时被
// 反复有损重编码：体积几乎不降，画质逐次劣化，且每次都产生无意义的 git 变更。
const MIN_SAVING_RATIO = 0.02;
const THUMB_WIDTH = 720;

const galleryDir = path.join(__dirname, "../public/gallery");
const webDir = path.join(galleryDir, "web");
const thumbDir = path.join(galleryDir, "thumbs");
const manifestPath = path.join(__dirname, "../src/gallery-data.json");

for (const dir of [webDir, thumbDir]) {
  fs.mkdirSync(dir, { recursive: true });
}

const isImage = (name) => /\.(jpe?g|png|webp)$/i.test(name) && !name.startsWith(".");

/** 原图命名规范：小写字母/数字组成的连字符前缀 + 末尾序号，如 navy-lighthouse-1.jpg */
const NAME_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*-\d+$/;
const baseName = (fileName) => fileName.replace(/\.[^.]+$/, "");
const isValidName = (fileName) => NAME_PATTERN.test(baseName(fileName));

/** 取末尾序号做数值排序，否则字典序下 -10 会排在 -2 之前 */
const order = (fileName) => parseInt(baseName(fileName).match(/-(\d+)$/)?.[1] || "0", 10);

const kb = (bytes) => Math.round(bytes / 1024);

/**
 * 清理目录中已不对应任何原图的派生文件。
 * 改名后若只增不删，旧派生物会残留在构建产物里被一起部署（体积与收录双重浪费）。
 */
function cleanOrphans(dir, bases, exts) {
  const expected = new Set();
  for (const b of bases) for (const e of exts) expected.add(`${b}${e}`);

  let removed = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isFile() || expected.has(entry.name)) continue;
    fs.unlinkSync(path.join(dir, entry.name));
    removed += 1;
  }
  return removed;
}

async function optimizeOne(file) {
  const inputPath = path.join(galleryDir, file);
  const base = path.basename(file, path.extname(file));
  const before = fs.statSync(inputPath).size;

  // 一次性读入内存，避免 Windows 下文件句柄占用导致无法原地写回
  let source = fs.readFileSync(inputPath);
  let meta = await sharp(source, { failOn: "none" }).metadata();
  let width = meta.width || 0;
  let height = meta.height || 0;

  // 1) 原图：仅在体积/尺寸过大时重编码（保持文件名不变，既有引用全部继续有效）
  const needsResize = width > MAX_FULL_WIDTH;
  if (before > RECOMPRESS_THRESHOLD || needsResize) {
    let pipeline = sharp(source, { failOn: "none" }).rotate();
    if (needsResize) {
      pipeline = pipeline.resize({ width: MAX_FULL_WIDTH, withoutEnlargement: true });
    }
    const optimized = await pipeline
      .jpeg({ quality: 80, progressive: true, mozjpeg: true, chromaSubsampling: "4:2:0" })
      .toBuffer();

    // 缩边是必须落地的结构性变更；纯为减体积时则要求收益达到 MIN_SAVING_RATIO，
    // 以此保证脚本幂等，同一张图不会被逐次构建反复有损编码。
    if (needsResize || optimized.length < before * (1 - MIN_SAVING_RATIO)) {
      fs.writeFileSync(inputPath, optimized);
      source = optimized;
      meta = await sharp(source).metadata();
      width = meta.width || width;
      height = meta.height || height;
    }
  }

  // 2) 灯箱用全尺寸 WebP
  await sharp(source)
    .webp({ quality: 76, effort: 4 })
    .toFile(path.join(webDir, `${base}.webp`));

  // 3) 网格缩略图（JPEG + WebP）
  const thumbJpgPath = path.join(thumbDir, `${base}.jpg`);
  await sharp(source)
    .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: 72, progressive: true, mozjpeg: true })
    .toFile(thumbJpgPath);

  await sharp(source)
    .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
    .webp({ quality: 68, effort: 4 })
    .toFile(path.join(thumbDir, `${base}.webp`));

  const thumbMeta = await sharp(fs.readFileSync(thumbJpgPath)).metadata();
  const after = fs.statSync(inputPath).size;

  return {
    src: `/gallery/${file}`,
    webp: `/gallery/web/${base}.webp`,
    thumb: `/gallery/thumbs/${base}.jpg`,
    thumbWebp: `/gallery/thumbs/${base}.webp`,
    width,
    height,
    thumbWidth: thumbMeta.width || width,
    thumbHeight: thumbMeta.height || height,
    beforeKB: kb(before),
    afterKB: kb(after),
  };
}

async function main() {
  const candidates = fs
    .readdirSync(galleryDir, { withFileTypes: true })
    .filter((d) => d.isFile() && isImage(d.name))
    .map((d) => d.name);

  // 不符合命名规范的文件直接跳过并告警，避免把带空格 / 括号的名字带进构建产物
  const files = [];
  for (const name of candidates) {
    if (isValidName(name)) {
      files.push(name);
    } else {
      console.warn(
        `  [跳过] ${name}：不符合命名规范 <前缀>-<序号>.<扩展名>，例如 navy-lighthouse-1.jpg`
      );
    }
  }
  files.sort((a, b) => order(a) - order(b));

  const results = [];
  for (const file of files) {
    try {
      const r = await optimizeOne(file);
      results.push(r);
      const saved = r.beforeKB > r.afterKB ? ` -${Math.round((1 - r.afterKB / r.beforeKB) * 100)}%` : "";
      console.log(`  ${file}: ${r.beforeKB}KB -> ${r.afterKB}KB${saved} (${r.width}x${r.height})`);
    } catch (err) {
      console.error(`  ${file}: 失败 -> ${err.message}`);
    }
  }

  fs.writeFileSync(
    manifestPath,
    JSON.stringify(
      results.map(({ beforeKB, afterKB, ...rest }) => rest),
      null,
      2
    )
  );

  // 以「仍存在的合规原图」为基准清理派生物，改名后不留旧文件
  const bases = files.map((f) => baseName(f));
  const orphans =
    cleanOrphans(webDir, bases, [".webp"]) +
    cleanOrphans(thumbDir, bases, [".jpg", ".webp"]);
  if (orphans > 0) {
    console.log(`清理 ${orphans} 个不再被引用的派生文件（web/ 与 thumbs/）`);
  }

  const totalBefore = results.reduce((s, r) => s + r.beforeKB, 0);
  const totalAfter = results.reduce((s, r) => s + r.afterKB, 0);
  console.log(`优化 ${results.length} 张图片：原图合计 ${totalBefore}KB -> ${totalAfter}KB`);
  console.log("已生成缩略图 / WebP 与 src/gallery-data.json");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
