const fs = require('node:fs'); // Build in module 

const content = fs.readFileSync('note.txt', 'utf-8');


// console.log(content)

// fs.writeFileSync('copy.txt', content, 'utf-8')

// fs.appendFileSync('copy.txt', "\n\nHay", 'utf-8')

// fs.mkdirSync('games/xyz/a' ,{recursive: true});
// fs.rmdirSync('games')

fs.unlinkSync('copy.txt');