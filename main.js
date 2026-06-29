//DOM and it required corresponding functions

const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
const operators = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clear');
const equalButton = document.querySelector('.equal');
const backButton = document.querySelector('.back');


// Set initial display value
display.value = 0;


// Event listeners for buttons
let shouldClear = false;

buttons.forEach((button) => {
    button.addEventListener('click', () => {

        const value = button.textContent.trim();

        if(!/^[0-9+\-*/.]$/.test(value)) {
            return;
        }

        if(shouldClear) {
            display.value = '';
            shouldClear = false;
        }


        if (display.value === "0") {
            display.value = value;
        } else {
            display.value += value;
        }
    });
});


// Event listeners for operators
operators.forEach(operator => {
    operator.addEventListener('click', () => {
        const op = operator.textContent.trim();
        const lastChar = display.value.slice(-1);

        if(shouldClear)  shouldClear = false;

        if (['+', '-', '*', '/'].includes(lastChar)) {
            display.value = display.value.slice(0, -1) + op;
        } else {
            display.value += op;
        }
    });
});


// Event listener for Clear [C] button
if (clearButton) {
    clearButton.addEventListener('click', () => {
        display.value = '0';
        shouldClear = true;
    });
}

// Event listener for back button [<--] button

if (backButton) {
    backButton.addEventListener('click', () => {
        display.value = display.value.slice(0, -1);
    });
}

// Event listener for equal button [=] button

if (equalButton) {
    equalButton.addEventListener('click', () => {
        const result = operate(number1, number2, operator);
        display.value = result;
        shouldClear = true;
    });
}





let calc_list = []
let currentNumber = ""

number1 = Number(prompt("Insert the first number:")) // for testing in the console, uncommnent if not needed and we delete at the end of the assignment
number2 = Number(prompt("Insert the second number:"))
operator = prompt("insert the operator:")


// Basic arithmetic functions
const add = (a, b) => a + b
const subtract = (a, b) => a - b
const multiply = (a, b) => a * b
const divide = (a, b) => (b === 0 ? "Error!" : a / b)


const errorHandler = (message) => {
  return message
}


const isValidInput = (operator, number1, number2) => {
  if (isNaN(number1) || isNaN(number2)) {
    return errorHandler("Invalid Input! Enter a number please")
  }
  if (operator === "/" && number2 == 0) {
    return errorHandler("divide on zero")
  }
  return true
}

const operate = (number1, number2, operator) => {
  const validationResult = isValidInput(operator, number1, number2)
  if (validationResult !== true) {
    return validationResult
  }

  switch (operator) {
    case "+":
      return add(number1, number2)
    case "-":
      return subtract(number1, number2)
    case "*":
      return multiply(number1, number2)
    case "/":
      return divide(number1, number2)
  }
}


function expect(actual) {
  return {
    toBe: (expected) => {
      if (actual === expected) {
        console.log(`✅ Passed: Expected ${expected}`)
      } else {
        console.error(`❌ Failed: Expected ${expected}, but got ${actual}`)
      }
    },
  }
}

// --- Unit Tests ---
console.log("--- Running Unit Tests ---")

expect(add(2, 3)).toBe(5)
expect(subtract(10, 5)).toBe(5)
expect(divide(10, 2)).toBe(5)
expect(divide(5, 0)).toBe("Error!")
expect(isValidInput("+", 2, "a")).toBe("Invalid Input! Enter a number please")

console.log("--- Tests Completed ---")
