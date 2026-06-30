
// =======================
// Global State
// =======================

let calc_list = [];
let currentNumber = "";
let shouldClear = false;

// =======================
// DOM
// =======================

const display = document.getElementById("display");

const buttons = document.querySelectorAll(".buttons");
const operators = document.querySelectorAll(".operator");

const clearButton = document.querySelector(".clear");
const equalButton = document.querySelector(".equal");
const backButton = document.querySelector(".back");
const signButton = document.querySelector(".sign");
const percentButton = document.querySelector(".percent");
const decimalButton = document.querySelector(".decimal");
const themeButton = document.querySelector(".theme-toggle");

// initial display
display.value = "0";

// =======================
// Theme Toggle
// =======================

themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeButton.textContent =
        document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// =======================
// Number Input
// =======================

buttons.forEach((btn) => {

    btn.addEventListener("click", () => {

        const value = btn.textContent;

        if (shouldClear) {
            display.value = "0";
            shouldClear = false;
        }

        if (display.value === "0") {
            display.value = value;
        } else {
            display.value += value;
        }

        currentNumber = display.value;
    });
});

// =======================
// Operators
// =======================

operators.forEach((op) => {

    op.addEventListener("click", () => {

        if (currentNumber === "") return;

        calc_list.push(Number(currentNumber));
        calc_list.push(op.textContent);

        currentNumber = "";

        if (calc_list.length > 2) {

            let temp = calc_list.slice(0, -1);

            let result = joiningCalculations(temp);

            display.value = result;

            calc_list = [Number(result), op.textContent];

        } else {
            // display.value += op.textContent;
        }

        shouldClear = true;
    });
});

// =======================
// Equal
// =======================

equalButton.addEventListener("click", () => {

    if (currentNumber === "") return;

    calc_list.push(Number(currentNumber));

    let result = joiningCalculations(calc_list);

    display.value = result;

    calc_list = [];
    currentNumber = String(result);
    shouldClear = true;
});

// =======================
// Clear
// =======================

clearButton.addEventListener("click", () => {

    display.value = "0";
    calc_list = [];
    currentNumber = "";
    shouldClear = false;
});

// =======================
// Backspace
// =======================

backButton.addEventListener("click", () => {

    display.value = display.value.slice(0, -1) || "0";
    currentNumber = display.value;
});

// =======================
// ± sign
// =======================

signButton.addEventListener("click", () => {

    display.value = String(Number(display.value) * -1);
    currentNumber = display.value;
});

// =======================
// Percent
// =======================

percentButton.addEventListener("click", () => {

    display.value = String(Number(display.value) / 100);
    currentNumber = display.value;
});
// =======================
// decimal
// =======================

decimalButton.addEventListener("click", () => {

    if (display.value.includes(".")) return;

    display.value += ".";
    currentNumber = display.value;
});

// =======================
// Math Operations
// =======================

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;

const divide = (a, b) => {
    if (b === 0) return "Error!";
    return a / b;
};

console.log(divide)
console.log(add)
console.log(multiply)
console.log(subtract)

// =======================
// Validate
// =======================

const isValidInput = (op, a, b) => {

    if (isNaN(a) || isNaN(b)) {
        return "Invalid Input!";
    }

    if (op === "÷" && b === 0) {
        return "Error!";
    }

    return true;
};

// =======================
// Operate
// =======================

function operate(a, b, op) {

    const valid = isValidInput(op, a, b);

    if (valid !== true) return valid;

    let result;

    switch (op) {

        case "+":
            result = add(a, b);
            break;

        case "-":
            result = subtract(a, b);
            break;

        case "×":
            result = multiply(a, b);
            break;

        case "÷":
            result = divide(a, b);
            break;
    }

    if (typeof result === "string") return result;

    return Number(result);
}

// =======================
// Chain Calculations
// =======================

function joiningCalculations(list) {

    let result = list[0];

    for (let i = 1; i < list.length; i += 2) {

        result = operate(result, list[i + 1], list[i]);
    }

    return result;
}

// =======================
// Keyboard Support
// =======================

document.addEventListener("keydown", (e) => {

    const key = e.key;

    if (/^[0-9.]$/.test(key)) {

        e.preventDefault();

        if (key === "." && display.value.includes(".")) return;

        if (shouldClear || display.value === "0") {
            display.value = key === "." ? "0." : key;
            shouldClear = false;
        } else {
            display.value += key;
        }

        currentNumber = display.value;
    }

    if (key === "Enter") equalButton.click();
    if (key === "Backspace") backButton.click();
    if (key === "Escape") clearButton.click();

    if (key === "+") document.querySelectorAll(".operator")[3].click();
    if (key === "-") document.querySelectorAll(".operator")[2].click();
    if (key === "*") document.querySelectorAll(".operator")[1].click();
    if (key === "/") document.querySelectorAll(".operator")[0].click();
});
