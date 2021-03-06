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
  return (num1 * 10 + num2 * 10) / 10;
};
const subtract = function (num1, num2) {
  return (num1 * 10 - num2 * 10) / 10;
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
const calculator = document.querySelector(".calculator");
const display = calculator.querySelector(".display");
const operands = calculator.querySelectorAll(".operand");
const operators = calculator.querySelectorAll(".operator");
const Enter = calculator.querySelector(".Enter");
const decimal = calculator.querySelector(".decimal");
const Backspace = calculator.querySelector(".Backspace");
const sign = calculator.querySelector(".sign");

let digits = "";
let num1, num2, operator, result;
// console.log(digits, num1, num2, operator, result);

// function to update the display
const updateDisplay = (displayValue) => {
  display.textContent = displayValue;
  // check if the display has one decimal point if yes disablle it
  if (display.textContent.includes(".")) {
    decimal.disabled = true;
  } else {
    decimal.disabled = false;
  }
};
Array.from(operands).forEach(function (value, index) {
  value.addEventListener("click", function (e) {
    if (result && !operator) {
      result = "";
    }
    digits += e.target.textContent;
    if (digits.endsWith(".") && digits.length == 2) {
      updateDisplay(digits);
    } else {
      updateDisplay(Number(digits));
    }
  });
});

Array.from(operators).forEach(function (value, index) {
  value.addEventListener("click", function (e) {
    e.stopPropagation();
    // console.log(e.target.value);
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

Enter.addEventListener("click", function (e) {
  // console.log(digits, num1, num2, operator, result);
  if (!num2 && operator && !result) {
    num2 = Number(digits);
    // console.log(digits, num1, num2, operator, result);
    result = evaluate(operator, num1, num2);
    console.log(result);
    updateDisplay(result);
  } else if (result && operator) {
    num1 = result;
    num2 = Number(digits);
    // console.log(digits, num1, num2, operator, result);
    result = evaluate(operator, num1, num2);
    updateDisplay(result);
  }
  digits = "";
  operator = null;
  num1 = null;
  num2 = null;
  console.log(digits, num1, num2, operator, result);
});

// reset feature: reset everything if AC is pressed
const reset = calculator.querySelector(".reset");
reset.addEventListener("click", function () {
  digits = "";
  updateDisplay(digits);
  operator = null;
  num1 = null;
  num2 = null;
  result = null;
});

// backspace button: undo the wrong input number
Backspace.addEventListener("click", function () {
  if (digits && digits.length > 1) {
    digits = digits.slice(0, -1);
    updateDisplay(digits);
  } else if (digits.length == 1) {
    updateDisplay("0");
    digits = "";
  }
});

// negate sign
sign.addEventListener("click", function () {
  if (digits && !result) {
    digits = -digits;
    console.log(digits);
    updateDisplay(digits);
  } else if (result && display.textContent == result) {
    result = -result;
    updateDisplay(result);
  }
});

// keyboard support
const btns = calculator.querySelectorAll("button");
let key;
document.addEventListener("keydown", function (event) {
  console.log(event.key);
  let yes = Array.from(btns).some(function (btn, index) {
    key = index;
    return btn.textContent == event.key || btn.className == event.key;
  });
  if (yes) {
    console.log(yes);
    Array.from(btns)[key].click();
  }
});

// theme switch feature set default to theme 1: dark;

window.addEventListener("load", function () {
  setTheme(colorTheme);
});

let colorTheme = "dark";
function setTheme(colorTheme) {
  document.body.setAttribute('theme', colorTheme);
}

let lis = document.querySelectorAll('.theme ul li');
const toggle = calculator.querySelector(".theme .toggle");
lis = Array.from(lis);
lis.forEach(function (li) {
  li.addEventListener('click', function (e) {

    e.stopPropagation;

    lis.forEach(function (li) {
      li.classList.remove("disable");
    });

    this.classList.toggle("disable");
    toggle.style.left = `${this.offsetLeft + startX}px`;

    let colorTheme = e.target.getAttribute('color');
    setTheme(colorTheme);
  })
})

