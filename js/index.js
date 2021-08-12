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
const calculator = document.querySelector("#calculator");
const display = calculator.querySelector("#display");
const operands = calculator.querySelectorAll(".operand");
const operators = calculator.querySelectorAll(".operator");
const equal = calculator.querySelector(".Enter");
const decimal = calculator.querySelector(".decimal");
const del = calculator.querySelector(".Backspace");
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
    updateDisplay(Number(digits));
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

equal.addEventListener("click", function (e) {
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
del.addEventListener("click", function () {
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
const body = document.body;
const color = [
  {
    bodyBg: "hsl(222, 26%, 31%)",
    bodyText: "hsl(0, 0, 100%)",
    themeBg: "hsl(223, 31%, 20%)",
    displayBg: "hsl(224, 36%, 15%)",
    btnsBg: "hsl(30, 25%, 89%)",
    btnsSd: "hsl(28, 16%, 65%)",
    btnsText: "hsl(221, 14%, 31%)",
    funBtnsBg: "hsl(225, 21%, 49%)",
    funBtnsSd: "hsl(224, 28%, 35%)",
    funBtnsText: "hsl(0, 0, 100%)",
    equalBg: "hsl(6, 63%, 50%)",
    equalSd: "hsl(6, 70%, 34%)",
  },
  {
    bodyBg: "hsl(0, 0%, 90%)",
    bodyText: "hsl(60, 10%, 19%)",
    themeBg: " hsl(0, 5%, 81%)",
    displayBg: "hsl(0, 0%, 93%)",
    btnsBg: "hsl(45, 7%, 89%)",
    btnsSd: "hsl(35, 11%, 61%)",
    btnsText: "hsl(60, 10%, 19%)",
    funBtnsBg: "hsl(185, 42%, 37%)",
    funBtnsSd: "hsl(185, 58%, 25%)",
    funBtnsText: "hsl(0, 0, 100%)",
    equalBg: "hsl(25, 98%, 40%)",
    equalSd: "hsl(25, 99%, 27%)",
  },
  {
    bodyBg: "hsl(268, 75%, 9%)",
    themeBg: "hsl(268, 71%, 12%) ",
    displayBg: "hsl(268, 71%, 12%)",
    btnsBg: "hsl(281, 89%, 26%)",
    btnsSd: "hsl(285, 91%, 52%)",
    btnsText: "hsl(52, 100%, 62%)",
    funBtnsBg: "hsl(268, 47%, 21%)",
    funBtnsSd: "hsl(290, 70%, 36%)",
    funBtnsText: "hsl(0, 0, 100%)",
    equalBg: "hsl(176, 100%, 44%)",
    equalSd: "hsl(177, 92%, 70%)",
    equalText: "hsl(198, 20%, 13%)",
  },
];
// theme data
const themeBox = document.querySelector(".theme-box");
const theme = document.querySelector(".theme");
const container = document.querySelector("#container");
function setBgColor(element, bgColor) {
  element.style.backgroundColor = bgColor;
}
function setKeyColor(element, color1, color2, textColor) {
  setBgColor(element, color1);
  element.style.boxShadow = `0 2px ${color2}`;
  element.style.color = textColor;
}
function setTheme(n) {
  // 0 for theme 1, 1 for theme 2
  setBgColor(body, color[n].bodyBg);
  body.style.color = color[n].bodyText;
  // theme.style.color = color[n].bodyText;
  setBgColor(theme, color[n].themeBg);
  setBgColor(container, color[n].themeBg);
  setBgColor(display, color[n].themeBg);
  Array.from(operands).forEach(function (operand) {
    setKeyColor(operand, color[n].btnsBg, color[n].btnsSd, color[n].btnsText);
  });
  Array.from(operators).forEach(function (operator) {
    setKeyColor(operator, color[n].btnsBg, color[n].btnsSd, color[n].btnsText);
  });
  setKeyColor(
    del,
    color[n].funBtnsBg,
    color[n].funBtnsSd,
    color[n].funBtnsText
  );
  setKeyColor(
    reset,
    color[n].funBtnsBg,
    color[n].funBtnsSd,
    color[n].funBtnsText
  );
  setKeyColor(
    sign,
    color[n].funBtnsBg,
    color[n].funBtnsSd,
    color[n].funBtnsText
  );
  setKeyColor(equal, color[n].equalBg, color[n].equalSd, color[n].funBtnsText);
  setKeyColor(
    themeDot,
    color[n].equalBg,
    color[n].equalSd,
    color[n].funBtnsText
  );
}
console.log(color[1].bodyBg);
// theme switch feature
const lis = calculator.querySelectorAll(".theme ul li");
const themeDot = calculator.querySelector(".theme .dot");
const startX = themeDot.offsetLeft;
Array.from(lis).forEach(function (li, index) {
  let n = index;
  li.addEventListener("click", function (e) {
    e.stopPropagation;
    console.log(n);
    // console.log(this.offsetLeft);
    themeDot.style.left = `${this.offsetLeft + startX}px`;
    setTheme(n);
    if (n == 2) {
      equal.style.color = color[n].equalText;
    } else {
      equal.style.color = "white";
    }
  });
});

window.addEventListener("load", function () {
  setTheme(0);
});
