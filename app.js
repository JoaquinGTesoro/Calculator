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

function round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num);
}

const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn');
const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.numbers');
const equalBtn = document.getElementById('equal');
const clearBtn = document.getElementById('clear');

let enteredNumber = null;
let operand = null;
let decimalClicked = false;
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
            if (number.innerHTML == ".") {
                if (decimalClicked == true) {
                    return 1;
                } else {
                    decimalClicked = true;
                }
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
        decimalClicked = false;
        operand = operator.innerHTML;
        display.innerHTML = "";
    })
});

equalBtn.addEventListener('click', () => {
    if (enteredNumber != null) calculation.push(parseFloat(enteredNumber));
    if(operand != null) calculation.push(operand);
    enteredNumber = null;
    operand = null;
    decimalClicked = false;
    let result;
    if (calculation.length == 1) {
        result = calculation[0]; 
    } else if (calculation.length == 2) {
        result = operate(calculation[0], calculation[0], checkOperand(calculation[1]));
    } else if (calculation.length == 3) {
        result = operate(calculation[0], calculation[2], checkOperand(calculation[1]));
    } else if (calculation.length > 3){
        while (calculation.length >= 3) {
            result = operate(calculation[0], calculation[2], checkOperand(calculation[1]));
            calculation[0] = result;
            calculation.splice(1, 2);
        }
    }
    display.innerHTML = round(result);
    clearEverything();
    calculation[0] = parseFloat(display.innerHTML);
});

clearBtn.addEventListener('click', () => {
    clearEverything();
})