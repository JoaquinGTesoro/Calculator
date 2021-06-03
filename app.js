function add(num1, num2) {
    return num1 + num2;
}

function substract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(num1, num2, operation) {
    return operation(num1, num2);
}

function checkOperand(operand) {
    if (operand == "+") {
        return add;
    } else if (operand == "-") {
        return substract;
    } else if (operand == "*") {
        return multiply;
    } else if (operand == "/") {
        return divide;
    }
}

function clearEverything() {
    enteredNumber = null;
    operand = null
    calculation = [];
}

const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn');
const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.numbers');
const equalBtn = document.getElementById('equal');
const clearBtn = document.getElementById('clear');

let enteredNumber = null;
let operand = null;
let calculation = [];

numbers.forEach(number => {
    number.addEventListener('click', () => {
        if (enteredNumber != null && enteredNumber.split("").length >= 9) {
            return 1;
        } else {
            if (display.innerHTML == calculation[0]) {
                display.innerHTML = "";
                clearEverything();
            }
            if (operand != null) {
                calculation.push(operand);
                operand = null;
            }
            display.innerHTML += number.innerHTML;
            if (enteredNumber == null) {
                enteredNumber = number.innerHTML
            } else {
                enteredNumber += number.innerHTML;
            }
        }   
        console.log(enteredNumber);
    })
});

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        if (enteredNumber != null) calculation.push(parseFloat(enteredNumber));
        enteredNumber = null;
        operand = operator.innerHTML;
        display.innerHTML = "";
    })
});

equalBtn.addEventListener('click', () => {
    if (enteredNumber != null) calculation.push(parseFloat(enteredNumber));
    if(operand != null) calculation.push(operand);
    enteredNumber = null;
    operand = null;
    if (calculation.length == 1) {
        display.innerHTML = calculation[0]; 
    } else if (calculation.length == 2) {
        display.innerHTML = operate(calculation[0], calculation[0], checkOperand(calculation[1]));
    } else {
        display.innerHTML = operate(calculation[0], calculation[2], checkOperand(calculation[1]));
    }
    clearEverything();
    calculation[0] = parseFloat(display.innerHTML);
});

clearBtn.addEventListener('click', () => {
    clearEverything();
})