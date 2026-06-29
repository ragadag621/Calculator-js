const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => b === 0 ? " Error!" : a / b;

// console.log(add(2, 3))

// console.log(subtract(4, 8))

// console.log(multiply(4, 8))

// console.log(divide(8, 0))

function operate(number1, number2, operator) {

    switch (operator) {
        case "+":
            return add(number1, number2)
            break
        case "-":
            return subtract(number1, number2)
            break
        case "*":
            return multiply(number1, number2)
            break
        case "/":
            return divide(number1, number2)
            break
    }

}
