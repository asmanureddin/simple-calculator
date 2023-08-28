class Calculator {
    constructor(prevOperandDisplay,currOperandDisplay) {
        this.prevOperandDisplay = prevOperandDisplay;
        this.currOperandDisplay = currOperandDisplay;
        this.clear();
        
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
        
    }

    deletetion() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
        this.updateDisplay()
    }

    appendNumber(num) {
        this.currentOperand = this.currentOperand + num;
    }

    getDecimal(num) {
        const dot = '.';
        const decimalString = num.toString();
        this.currentOperand = this.currentOperand + dot;
        return (this.currentOperand);
        
    }
    // Number.parseFloat(this.currentOperand).toFixed(0)

    useOperation(operation) {
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        const prevNum = parseFloat(this.previousOperand);
        const currNum = parseFloat(this.currentOperand);
        const op = this.operation;
        let result;
        switch(op){
            case '+': result = prevNum+currNum; break;
            case '-': result = prevNum-currNum; break;
            case '*': result = prevNum*currNum; break;
            case '/': result = prevNum/currNum; break;
            case '%': result = prevNum/100; break;
            default: return;

        }

        const outputLength = result.toString().length;
        const decPart = outputLength - (result.toString().indexOf('.'));
        console.log("result", result)
        console.log("length of decPart",decPart)
        console.log("length of decPart/2",decPart/2)
        console.log("length of decPart/2.5",decPart/2.5)
        console.log("length of decPart/4",decPart/4)
        if((decPart>=5)&&(decPart<8)) {
            this.currentOperand = result.toFixed(decPart/2);
        } else if((decPart>=9)&&(decPart<=12)) {
            this.currentOperand = result.toFixed(decPart/2.5);
        } else if(decPart>12) {
            this.currentOperand = result.toFixed(decPart/4);
        } else {this.currentOperand = result.toFixed(decPart-1)}
        console.log("output Length",outputLength);
        console.log("type of outputLength",typeof(outputLength));
        console.log("type of decimalPart=",typeof(decPart))
        this.previousOperand = '';

    }

    updateDisplay() {
      //  this.currentOperand = Number(this.currentOperand).toFixed(2);
        this.currOperandDisplay.innerText= this.currentOperand;
        
    }

    historyDisplay() {
        this.currOperandDisplay = this.currentOperand
        this.updateDisplay()
    }
    
}



const numButton = document.querySelectorAll('[data-number]')
const operationButton = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equal]')
const allClearButton = document.querySelector('[all-clear]')
const deleteButton = document.querySelector('[del-button]')
const percentageButton = document.querySelector('[perc-button]')
const calcDecimal = document.querySelector('[data-decimal]')
const prevOperandDisplay = document.querySelector('[data-prev-operand]')
const opDisplay = document.querySelector('[data-op]')
const currOperandDisplay = document.querySelector('[data-curr-operand]')

const calculator = new Calculator(prevOperandDisplay,currOperandDisplay) 

numButton.forEach(buttonListen);
operationButton.forEach(buttonListen);
equalsButton.addEventListener('click', button=> {
    calculator.compute();
    calculator.updateDisplay();
})
allClearButton.addEventListener('click',()=>{
    calculator.clear();
    calculator.updateDisplay();
})
deleteButton.addEventListener('click', ()=> {
    calculator.deletetion();
})


function buttonListen(button){
    if((button.innerText >= 0 ) && (button.innerText < 10 )) {
        button.addEventListener('click', ()=> {
            calculator.appendNumber(button.innerText);
            calculator.updateDisplay();
        })
    } else if(button.innerText === '.') {
        button.addEventListener('click', ()=> {
            calculator.getDecimal(currOperandDisplay);
            calculator.updateDisplay();
        })

    } else if((button.innerText === '+') || (button.innerText === '-') || (button.innerText === '*') || (button.innerText === '/') || (button.innerText=== '%')) {
        button.addEventListener('click', () => {
            calculator.useOperation(button.innerText);
            calculator.updateDisplay();
        })
    }
    
};



/*
numButton.forEach( button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

*/

