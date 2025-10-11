const {addition, subtraction, multiplication, division} = require('./Math.js');
const math = require('./Math.js');
console.log(math);

math.default(); // "I'm a default export"
console.log(addition(2, 3));       // 5
console.log(subtraction(10, 4));   // 6
console.log(multiplication(3, 5)); // 15
console.log(division(20, 4));      // 5
