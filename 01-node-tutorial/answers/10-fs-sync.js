const { readFileSync, writeFileSync } = require('fs');

writeFileSync('./temporary/fileA.txt', 'First\r\n', { flag: 'a' });
writeFileSync('./temporary/fileA.txt', 'Second\r\n', { flag: 'a' });
writeFileSync('./temporary/fileA.txt', 'Third\r\n', { flag: 'a' });

const result = readFileSync('./temporary/fileA.txt', 'utf-8');

console.log(result);
