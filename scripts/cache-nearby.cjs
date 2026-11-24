const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');
const sources = require('./nearby-photo-sources.json');
const root = path.join(__dirname, '..');
const media = {};
const queue = Object.entries(sources);
async function cachePhotos() {
  for (let entry; (entry = queue.shift());) {
    const [slug, candidates] = entry;
    for (const image of candidates) {
      try {
        const response = await fetch(image.photo, {signal: AbortSignal.timeout(8500), headers: {'User-Agent':'Mozilla/5.0',Accept:'image/*'}});
        if (!response.ok) continue;
        const buffer = Buffer.from(await response.arrayBuffer());
        const file = '/nearby-photos/' + slug + '.webp';
        await sharp(buffer).rotate().resize({width:1200,withoutEnlargement:true}).webp({quality:78}).toFile(path.join(root,'public',file));
        media[slug] = {file, credit:image.article};
        break;
      } catch {}
    }
    if (!media[slug]) console.warn('External original retained for ' + slug);
  }
}
(async()=>{
  await fs.mkdir(path.join(root,'public','nearby-photos'),{recursive:true});
  await Promise.all(Array.from({length:7},cachePhotos));
  await fs.writeFile(path.join(root,'src','data','nearby-media.json'),JSON.stringify(media));
  console.log('Cached named attraction photographs: ' + Object.keys(media).length + '/' + Object.keys(sources).length);
})().catch(error=>{console.error(error);process.exitCode=1;});
