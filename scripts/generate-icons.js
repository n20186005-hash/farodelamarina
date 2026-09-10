/* 生成 PWA 所需 PNG 图标（无第三方依赖，纯 Node zlib 编码 PNG）。
 * 设计：深海军蓝圆角底 + 白色灯塔 + 金色灯光，与 icon.svg 保持一致。
 */
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const OUT_DIR = path.join(__dirname, "../public/icons");
const SS = 3; // 超采样倍数（抗锯齿）

/* ── PNG 编码 ───────────────────────────────────────────── */
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) crc = CRC_TABLE[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function encodePNG(width, height, rgba) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  const stride = width * 4 + 1;
  const raw = Buffer.alloc(stride * height);
  for (let y = 0; y < height; y++) {
    raw[y * stride] = 0; // filter: none
    rgba.copy(raw, y * stride + 1, y * width * 4, (y + 1) * width * 4);
  }
  const idat = zlib.deflateSync(raw, { level: 9 });
  return Buffer.concat([
    signature,
    pngChunk("IHDR", ihdr),
    pngChunk("IDAT", idat),
    pngChunk("IEND", Buffer.alloc(0)),
  ]);
}

/* ── 绘制工具 ───────────────────────────────────────────── */
function lerp(a, b, t) {
  return a + (b - a) * t;
}

function setPixel(buf, size, x, y, r, g, b, a) {
  if (x < 0 || y < 0 || x >= size || y >= size || a <= 0) return;
  const i = (y * size + x) * 4;
  const dstA = buf[i + 3] / 255;
  const srcA = Math.min(1, a);
  const outA = srcA + dstA * (1 - srcA);
  if (outA <= 0) return;
  buf[i] = Math.round((r * srcA + buf[i] * dstA * (1 - srcA)) / outA);
  buf[i + 1] = Math.round((g * srcA + buf[i + 1] * dstA * (1 - srcA)) / outA);
  buf[i + 2] = Math.round((b * srcA + buf[i + 2] * dstA * (1 - srcA)) / outA);
  buf[i + 3] = Math.round(outA * 255);
}

function roundedRectContains(x, y, left, top, right, bottom, radius) {
  if (x < left || x > right || y < top || y > bottom) return false;
  const rx = Math.min(radius, (right - left) / 2);
  const ry = Math.min(radius, (bottom - top) / 2);
  const cx = Math.min(Math.max(x, left + rx), right - rx);
  const cy = Math.min(Math.max(y, top + ry), bottom - ry);
  const dx = (x - cx) / rx;
  const dy = (y - cy) / ry;
  return dx * dx + dy * dy <= 1;
}

function pointInPolygon(px, py, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0];
    const yi = poly[i][1];
    const xj = poly[j][0];
    const yj = poly[j][1];
    const intersect = yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function fillPolygon(buf, size, poly, color, alpha = 1) {
  const [r, g, b] = color;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const [, y] of poly) {
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }
  for (let y = Math.floor(minY); y <= Math.ceil(maxY); y++) {
    for (let x = 0; x < size; x++) {
      if (pointInPolygon(x + 0.5, y + 0.5, poly)) setPixel(buf, size, x, y, r, g, b, alpha);
    }
  }
}

function fillCircle(buf, size, cx, cy, radius, color, alpha = 1) {
  const [r, g, b] = color;
  for (let y = Math.floor(cy - radius); y <= Math.ceil(cy + radius); y++) {
    for (let x = Math.floor(cx - radius); x <= Math.ceil(cx + radius); x++) {
      const dx = x + 0.5 - cx;
      const dy = y + 0.5 - cy;
      if (dx * dx + dy * dy <= radius * radius) setPixel(buf, size, x, y, r, g, b, alpha);
    }
  }
}

/* ── 图标合成 ───────────────────────────────────────────── */
function renderIcon(size, ss = SS) {
  const S = size * ss;
  const buf = Buffer.alloc(S * S * 4, 0);

  const NAVY_TOP = [22, 50, 79];
  const NAVY_BOTTOM = [11, 27, 43];
  const WHITE = [247, 244, 238];
  const NAVY = [22, 50, 79];
  const DARK = [11, 27, 43];
  const GOLD = [242, 200, 121];

  const u = (v) => v * S; // 归一化坐标 → 像素

  // 背景（圆角矩形 + 竖向渐变）
  const radius = u(0.1875);
  for (let y = 0; y < S; y++) {
    const t = y / S;
    const color = [lerp(NAVY_TOP[0], NAVY_BOTTOM[0], t), lerp(NAVY_TOP[1], NAVY_BOTTOM[1], t), lerp(NAVY_TOP[2], NAVY_BOTTOM[2], t)];
    for (let x = 0; x < S; x++) {
      if (roundedRectContains(x + 0.5, y + 0.5, 0, 0, S, S, radius)) {
        setPixel(buf, S, x, y, color[0], color[1], color[2], 1);
      }
    }
  }

  // 灯光光束
  fillPolygon(buf, S, [[u(0.5), u(0.293)], [u(0.117), u(0.1875)], [u(0.117), u(0.398)]], GOLD, 0.32);
  fillPolygon(buf, S, [[u(0.5), u(0.293)], [u(0.883), u(0.1875)], [u(0.883), u(0.398)]], GOLD, 0.32);

  // 塔身
  fillPolygon(buf, S, [[u(0.414), u(0.344)], [u(0.586), u(0.344)], [u(0.645), u(0.82)], [u(0.355), u(0.82)]], WHITE);
  // 两条深色条纹
  fillPolygon(buf, S, [[u(0.402), u(0.46)], [u(0.598), u(0.46)], [u(0.607), u(0.539)], [u(0.393), u(0.539)]], NAVY);
  fillPolygon(buf, S, [[u(0.383), u(0.656)], [u(0.617), u(0.656)], [u(0.627), u(0.734)], [u(0.373), u(0.734)]], NAVY);

  // 灯室
  fillPolygon(buf, S, [[u(0.402), u(0.285)], [u(0.598), u(0.285)], [u(0.598), u(0.344)], [u(0.402), u(0.344)]], DARK);
  // 灯光
  fillCircle(buf, S, u(0.5), u(0.25), u(0.06), GOLD);
  // 顶盖
  fillPolygon(buf, S, [[u(0.445), u(0.196)], [u(0.555), u(0.196)], [u(0.555), u(0.224)], [u(0.445), u(0.224)]], DARK);
  // 基座
  fillPolygon(buf, S, [[u(0.3125), u(0.789)], [u(0.6875), u(0.789)], [u(0.6875), u(0.855)], [u(0.3125), u(0.855)]], DARK);

  // 降采样
  const out = Buffer.alloc(size * size * 4, 0);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let r = 0;
      let g = 0;
      let b = 0;
      let a = 0;
      for (let sy = 0; sy < ss; sy++) {
        for (let sx = 0; sx < ss; sx++) {
          const i = ((y * ss + sy) * S + (x * ss + sx)) * 4;
          const alpha = buf[i + 3] / 255;
          r += buf[i] * alpha;
          g += buf[i + 1] * alpha;
          b += buf[i + 2] * alpha;
          a += alpha;
        }
      }
      const n = ss * ss;
      const o = (y * size + x) * 4;
      if (a > 0) {
        out[o] = Math.round(r / a);
        out[o + 1] = Math.round(g / a);
        out[o + 2] = Math.round(b / a);
      }
      out[o + 3] = Math.round((a / n) * 255);
    }
  }

  return encodePNG(size, size, out);
}

fs.mkdirSync(OUT_DIR, { recursive: true });
for (const size of [192, 512]) {
  const png = renderIcon(size);
  const file = path.join(OUT_DIR, `icon-${size}.png`);
  fs.writeFileSync(file, png);
  console.log(`Generated ${path.relative(process.cwd(), file)} (${png.length} bytes)`);
}
