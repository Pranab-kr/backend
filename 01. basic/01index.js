const fs = require('fs'); // Build in module 

const content = fs.readFileSync('note.txt', 'utf-8');


console.log(content)
