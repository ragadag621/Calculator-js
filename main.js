let calc_list = []
let currentNumber = ""

number1 = Number(prompt("Insert the first number:")) // for testing in the console, uncommnent if not needed and we delete at the end of the assignment
number2 = Number(prompt("Insert the second number:"))
operator = prompt("insert the operator:")


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

function joiningCalculations(calc_list){
    let result = calc_list[0]

    for(let i = 1; i < calc_list.length; i += 2){
        let operator = calc_list[i]
        let number = calc_list[i + 1]
        result = operate(result,number,operator)
    }

    return result
}

calc_list = [Number(number1), operator, Number(number2)]
console.log(joiningCalculations(calc_list))
