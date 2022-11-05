class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.readyToReset = false;
    this.clear();
    }

    clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
    } 
    delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    } 
    appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
    this.compute();
    }
    if (operation === '^') {
    this.operation = '^';
    } else {
    this.operation = operation;
    }
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
    }
    compute() {
    let computation;
    const chislo = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(chislo) || isNaN(current)) return;
    switch (this.operation) {
    case '+':
    computation = chislo + current;
    break;
    case '-':
    computation = chislo - current;
    break;
    case '*':
    computation = chislo * current;
    break;
    case '÷':
    computation = chislo / current;
             if (chislo / 0)
                 {
                     computation = 'Error'
                 }
    break;
    case '%':
    computation = chislo % current;
    break;
    case '^':
    computation = chislo ** current;
    break;
    default:
    return;
    }
    this.readyToReset = true;
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
    }
    
    getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
    integerDisplay = '';
    } else {
    integerDisplay = integerDigits.toLocaleString('ru', {
    maximumFractionDigits: 0
    })
    }
    if (decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`
    } else {
    return integerDisplay;
    }
    }
    
    updateDisplay() {
    this.currentOperandTextElement.innerText =
    this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
    this.previousOperandTextElement.innerText =
    `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
    this.previousOperandTextElement.innerText = '';
    }
    }
    
    changeNegative() {
    this.currentOperand *= -1;
    }
    
    sqrt() {
    const current = parseFloat(this.currentOperand);
    if (isNaN(current)) return;
    this.currentOperand = Math.sqrt(current);
    this.readyToReset = true;
    this.operation = undefined;
    }
    asin() {
    const current = parseFloat(this.currentOperand);
    if (isNaN(current)) return;
    this.currentOperand = Math.asin(current);
    this.readyToReset = true;
    this.operation = undefined;
    }
    acos() {
    const current = parseFloat(this.currentOperand);
    if (isNaN(current)) return;
    this.currentOperand = Math.acos(current);
    this.readyToReset = true;
    this.operation = undefined;
    }
    atan() {
    const current = parseFloat(this.currentOperand);
    if (isNaN(current)) return;
    this.currentOperand = Math.atan(current);
    this.readyToReset = true;
    this.operation = undefined;
    }
    actan() {
    const current = parseFloat(this.currentOperand);
    if (isNaN(current)) return;
    this.currentOperand = Math.PI / 2 - Math.atan(current);
    this.readyToReset = true;
    this.operation = undefined;
    }
    sin() {
    const current = parseFloat(this.currentOperand);
    if (isNaN(current)) return;
    this.currentOperand = Math.sin(current);
    this.readyToReset = true;
    this.operation = undefined;
    }
    cos() {
    const current = parseFloat(this.currentOperand);
    if (isNaN(current)) return;
    this.currentOperand = Math.cos(current);
    this.readyToReset = true;
    this.operation = undefined;
    }
    tan() {
    const current = parseFloat(this.currentOperand);
    if (isNaN(current)) return;
    this.currentOperand = Math.tan(current);
    this.readyToReset = true;
    this.operation = undefined;
    }
    ctan() {
    const current = parseFloat(this.currentOperand);
    if (isNaN(current)) return;
    this.currentOperand = 1 / Math.tan(current);
    this.readyToReset = true;
    this.operation = undefined;
    }
    }
    
    const numberButtons = document.querySelectorAll('[data-number]');
    const operationButtons = document.querySelectorAll('[data-operation]');
    const equalsButton = document.querySelector('[data-equals]');
    const deleteButton = document.querySelector('[data-delete]');
    const allClearButton = document.querySelector('[data-all-clear]');
    const previousOperandTextElement = document.querySelector('[data-previous-operand]');
    const currentOperandTextElement = document.querySelector('[data-current-operand]');
    const negativeButton = document.querySelector('[data-change-negative]');
    const sqrtButton = document.querySelector('[data-sqrt]');
    const powButton = document.querySelector('[data-pow]');
    const sinButton = document.querySelector('[data-sin]');
    const cosButton = document.querySelector('[data-cos]');
    const tanButton = document.querySelector('[data-tan]');
    const ctanButton = document.querySelector('[data-ctan]');
    const asinButton = document.querySelector('[data-asin]');
    const acosButton = document.querySelector('[data-acos]');
    const atanButton = document.querySelector('[data-atan]');
    const actanButton = document.querySelector('[data-actan]');
    
    const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);
    
    numberButtons.forEach(button => {
    button.addEventListener('click', () => {
    if (calculator.previousOperand === "" && calculator.currentOperand !== "" && calculator.readyToReset) {
    calculator.currentOperand = "";
    calculator.readyToReset = false;
    }
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
    })
    })
    operationButtons.forEach(button => {
    button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
    })
    })
    equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
    })
    allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
    })
    deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
    })
    negativeButton.addEventListener('click', button => {
    calculator.changeNegative();
    calculator.updateDisplay();
    })
    sqrtButton.addEventListener('click', button => {
    calculator.sqrt();
    calculator.updateDisplay();
    })
    sinButton.addEventListener('click', button => {
    calculator.sin();
    calculator.updateDisplay();
    })
    cosButton.addEventListener('click', button => {
    calculator.cos();
    calculator.updateDisplay();
    })  
    asinButton.addEventListener('click', button => {
    calculator.asin();
    calculator.updateDisplay();
    })
    acosButton.addEventListener('click', button => {
    calculator.acos();
    calculator.updateDisplay();
    })
    tanButton.addEventListener('click', button => {
    calculator.tan();
    calculator.updateDisplay();
    })
    ctanButton.addEventListener('click', button => {
    calculator.ctan();
    calculator.updateDisplay();
    })
    atanButton.addEventListener('click', button => {
    calculator.atan();
    calculator.updateDisplay();
    })
    actanButton.addEventListener('click', button => {
    calculator.actan();
    calculator.updateDisplay();
    })