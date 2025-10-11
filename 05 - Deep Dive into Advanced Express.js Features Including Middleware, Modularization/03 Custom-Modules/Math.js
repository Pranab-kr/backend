function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

// Named exports
exports.addition = add;
exports.subtraction = sub;
exports.multiplication = multiply;
exports.division = divide;

// Add a default export separately
module.exports.default = function() {
  console.log("I'm a default export");
};
