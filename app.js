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

function addNumber(number) {
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
        if (number == ".") {
            if (decimalClicked == true) {
                return 1;
            } else {
                decimalClicked = true;
            }
        }
        display.innerHTML += number;
        if (enteredNumber == null) {
            enteredNumber = number
        } else {
            enteredNumber += number;
        }
    }   
    console.log(enteredNumber);
}

function addOperator(operator) {
    if (enteredNumber != null) calculation.push(parseFloat(enteredNumber));
    enteredNumber = null;
    decimalClicked = false;
    if (operator == "%") {
        calculation[0] = calculation[0] / 100;
        display.innerHTML = calculation[0];
        return 1;
    }
    if (operator == "√") {
        calculation[0] = Math.sqrt(calculation[0]);
        if (calculation[0] > 0) {
            calculation[0] = round(calculation[0]);
        } else {
            calculation[0] = "Does not exist"
        }
        display.innerHTML = calculation[0];
        return 1;
    }
    operand = operator;
    display.innerHTML = "";
}

function makeCalc() {
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
    number.addEventListener('click', function(){addNumber(number.innerHTML)})
});

operators.forEach(operator => {
    operator.addEventListener('click', function(){addOperator(operator.innerHTML)})
});

equalBtn.addEventListener('click', function(){makeCalc()})

clearBtn.addEventListener('click', () => {
    clearEverything();
})

//Keyboard Support 
document.addEventListener('keypress', (event) => {
    var name = event.key;
    console.log(name);
    if (isNaN(name) == false) {
        addNumber(name);
    } else {
        switch (name) {
            case "/":
                event.preventDefault();
                addOperator("/")
                break;
            case "*":
                addOperator("*")
                break;
            case "-":
                addOperator("-")
                break;
            case "+":
                addOperator("+")
                break;
            case ".":
                addNumber(".")
                break;
            case "Enter":
                makeCalc()
                break;
            default:
                break;
        }
    }
})

document.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
        clearEverything();
    }
})