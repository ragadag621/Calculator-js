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
