//DOM and it required corresponding functions

const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
const operators = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clear');
const equalButton = document.querySelector('.equal');
const backButton = document.querySelector('.back');


buttons.forEach((button) => {
  button.addEventListener("click", () => {
    display.value += button.innerText
  })
})

const clear = () => {
  display.value = ""
}

const backspace = () => {
  display.value = display.value.slice(0, -1)
}

const equal = () => {
  display.value = operate(display.value)
}





let calc_list = []
let currentNumber = ""

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
