const fs = require('fs');
const path = require('path');

const outDir = path.resolve(__dirname, '..', 'out');

// Map of locale to HTML lang attribute value
const langMap = {
  'en': 'en',
  'es': 'es',
  'zh': 'zh',
  'qu': 'qu',
};

function walkDir(dir, callback) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      walkDir(fullPath, callback);
    } else if (file.isFile() && file.name.endsWith('.html')) {
      callback(fullPath);
    }
  }
}

function fixHtmlLang(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Determine locale from file path
  let lang = 'en';
  for (const [locale, htmlLang] of Object.entries(langMap)) {
    // Check if the file path contains the locale directory
    const localePattern = path.sep + locale + path.sep;
    const localePatternAlt = path.sep + locale + '.html';
    if (filePath.includes(localePattern) || filePath.endsWith(localePatternAlt)) {
      lang = htmlLang;
      break;
    }
  }
  
  // Replace lang attribute on <html> tag
  const htmlTagRegex = /<html[^>]*>/i;
  const htmlTagMatch = content.match(htmlTagRegex);
  
  if (htmlTagMatch) {
    let htmlTag = htmlTagMatch[0];
    
    // Check if lang attribute exists
    if (/lang\s*=/i.test(htmlTag)) {
      // Replace existing lang attribute
      htmlTag = htmlTag.replace(/lang\s*=\s*["'][^"']*["']/i, `lang="${lang}"`);
    } else {
      // Add lang attribute before the closing >
      htmlTag = htmlTag.replace(/>\s*$/, ` lang="${lang}">`);
    }
    
    content = content.replace(htmlTagRegex, htmlTag);
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ Fixed lang="${lang}" in ${path.relative(outDir, filePath)}`);
  }
}

console.log('Fixing HTML lang attributes...');
walkDir(outDir, fixHtmlLang);
console.log('Done!');
