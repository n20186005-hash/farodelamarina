const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/i18n/translations.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace Chinese curly double quotes that break string parsing
// " (U+201C) -> ' (single quote)
// " (U+201D) -> ' (single quote)
content = content.replace(/\u201c/g, "'");
content = content.replace(/\u201d/g, "'");

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed Chinese quotes in translations.ts');
