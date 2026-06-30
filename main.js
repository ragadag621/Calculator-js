// Global Variables
let calc_list = [] // need this list to join the calculations
let currentNumber = "" //the joinCalculations function is going to push the current number on the list


//DOM and it required corresponding functions

const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
const operators = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clear');
const equalButton = document.querySelector('.equal');
const backButton = document.querySelector('.back');
const decimalButton = document.querySelector('.decimal')
const signButton = document.querySelector(".sign")
const percentButton = document.querySelector(".percent")


// Set initial display value
display.value = 0;


// Event listeners for buttons
let shouldClear = false;

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const value = button.textContent.trim();

        if(!/^[0-9.]$/.test(value)) {
            return;
        }

    // Prevent multiple decimal points
        if (value === '.'&& !shouldClear && display.value.includes('.')) {
            return;
        }

        if(shouldClear || display.value === "0") {
            display.value = (value === "." )? "0." : value;
            shouldClear = false;
        } else{
            display.value += value;
        }
        currentNumber += value 
    });
});

document.addEventListener('keydown', (e) => {
    const key = e.key;

    if (/^[0-9.]$/.test(key)) {
        // reuse your number/decimal logic
        e.preventDefault()
        if (key === '.' && !shouldClear && display.value.includes('.')) return;

        currentNumber += key

        if (shouldClear || display.value === "0") {
            display.value = (key === ".") ? "0." : key;
            shouldClear = false;
        } else {
            display.value += key;
        }
        return;
    }

    if (['+', '-', '×', '÷'].includes(key)) {
        const currentValue = Number(display.value);
        if (pendingOperator === null) {
            previousValue = currentValue;
        } else {
            previousValue = operate(previousValue, currentValue, pendingOperator);
            display.value = previousValue;
        }
        pendingOperator = key;
        shouldClear = true;
        return;
    }

    if (key === 'Enter' || key === '=') {
        equalButton?.click();
        return;
    }

    if (key === 'Backspace') {
        backButton?.click();
        return;
    }

    if (key === 'Escape') {
        clearButton?.click();
        return;
    }
});

// Event listeners for operators
operators.forEach(operator => {
    operator.addEventListener('click', () => {
        calc_list.push(Number(display.value.split(/[+\-×÷]/).pop()))
        calc_list.push(operator.textContent.trim())

        if(calc_list.length > 2) {
            let tempList = calc_list.slice(0, -1)
            let intermediateResult = joiningCalculations(tempList)
            display.value = intermediateResult + operator.textContent.trim()
        } else {
            display.value += operator.textContent.trim()
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
        calc_list.push(Number(display.value.split(/[+\-×÷]/).pop()))
        let result = joiningCalculations(calc_list)
        display.value = result
        calc_list = []
        shouldClear = true;
    });
}

if (signButton) {
  signButton.addEventListener("click", () => {
    if (!display.value == "0" || !display.value == null) {
      result = Number(display.value) * -1
      display.value = result
    }
    else{
        display.value
    }
  })
}

if (percentButton) {
  percentButton.addEventListener("click", () => {
    if (!display.value == "0" || !display.value == null) {
      result = Number(display.value) / 100
      display.value = result
    }
  })
}
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
  if (operator === "÷" && number2 == 0) {
    return errorHandler("divide on zero")
  }
  return true
}

const operate = (number1, number2, operator) => {
  const validationResult = isValidInput(operator, number1, number2)
  if (validationResult !== true) {
    return validationResult
  }

  let result

  switch (operator) {
    case "+":
     result = add(number1, number2)
     return result
    case "-":
      result = subtract(number1, number2)
      return result
    case "×":
      result = multiply(number1, number2)
      return result
    case "÷":
      result = divide(number1, number2)
      return result
  }
}

function joiningCalculations(calc_list){
    let result = calc_list[0]

    for(let i = 1; i < calc_list.length; i += 2){
        let operator = calc_list[i]
        let number = calc_list[i + 1]
        result = operate(result, number, operator)
    }
    return result 
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
