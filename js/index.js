function evaluate(operator, num1, num2) {
  switch (operator) {
    case "add":
      // code block
      return operate(add, num1, num2);
      break;
    case "subtract":
      // code block
      return operate(subtract, num1, num2);
      break;
    case "multiply":
      // code block
      return operate(multiply, num1, num2);
      break;
    case "divide":
      // code block
      return operate(divide, num1, num2);
      break;
  }
}
const add = function (num1, num2) {
  return num1 + num2;
};
const subtract = function (num1, num2) {
  return num1 - num2;
};
const multiply = function (num1, num2) {
  return num1 * num2;
};
const divide = function (num1, num2) {
  if (num2 == 0) {
    return NaN;
  } else {
    return num1 / num2;
  }
};
const operate = function (operator, num1, num2) {
  return operator(num1, num2);
};
const calculator = document.querySelector("#calculator");
const display = calculator.querySelector("#display");
const operands = calculator.querySelectorAll(".operand");
const operators = calculator.querySelectorAll(".operator");
const equal = calculator.querySelector("#equal");

let digits = "";
let num1, num2, operator, result;
console.log(digits, num1, num2, operator, result);
// function to update the display
const updateDisplay = (displayValue) => {
  display.textContent = displayValue;
};
Array.from(operands).forEach(function (value, index) {
  value.addEventListener("click", function (e) {
    if (result && !operator) {
      result = "";
    }
    digits += e.target.textContent;
    updateDisplay(digits);
  });
});

Array.from(operators).forEach(function (value, index) {
  value.addEventListener("click", function (e) {
    e.stopPropagation();
    console.log(e.target.value);
    console.log(digits, num1, num2, operator, result);
    if (!operator && !result) {
      num1 = Number(digits);
      operator = e.target.value;
      updateDisplay(num1);
    } else if (operator && !result) {
      num2 = Number(digits);
      result = evaluate(operator, num1, num2);
      updateDisplay(result);
      operator = e.target.value;
      num1 = null;
      num2 = null;
    } else if (result && operator) {
      num1 = result;
      num2 = Number(digits);
      result = evaluate(operator, num1, num2);
      updateDisplay(result);
      operator = e.target.value;
      num1 = null;
      num2 = null;
    } else if (!operator && result) {
      num1 = result;
      operator = e.target.value;
      updateDisplay(num1);
      result = null;
    }
    digits = "";
    console.log(digits, num1, num2, operator, result);
  });
});

equal.addEventListener("click", function (e) {
  console.log(digits, num1, num2, operator, result);
  if (!num2 && operator && !result) {
    num2 = Number(digits);
    console.log(digits, num1, num2, operator, result);
    result = evaluate(operator, num1, num2);
    console.log(result);
    updateDisplay(result);
  } else if (result && operator) {
    num1 = result;
    num2 = Number(digits);
    console.log(digits, num1, num2, operator, result);
    result = evaluate(operator, num1, num2);
    updateDisplay(result);
  }
  digits = "";
  operator = null;
  num1 = null;
  num2 = null;
  console.log(digits, num1, num2, operator, result);
});
