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





const add = (a, b) => a + b
const subtract = (a, b) => a - b
const multiply = (a, b) => a * b
const divide = (a, b) => (a / b)

// console.log(add(2, 3))

// console.log(subtract(4, 8))

// console.log(multiply(4, 8))

// console.log(divide(8, 0))

const errorHandler = (message) => {
  return alert("Error:" + message)

  return null
}

const isValidInput = (operator, number1, number2) => {
  if (isNaN(number1) || isNaN(number2)) {
    return errorHandler("invalide  input!Enter a number please")
  }
  if (operator === "/" && number2 == 0) {
    return errorHandler("divide on zero")
  }
  return true
}

const operate = (number1, number2, operator) => {
    const validationResult = isValidInput(operator, number1, number2);
    if(validationResult!== true){
        return validationResult;
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
console.log(operate(1,0,"/"))
