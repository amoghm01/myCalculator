// define constants here, these will be our buttons later on
const numBtn = document.querySelectorAll('[number]')
const operBtn = document.querySelectorAll('[operation]')
const negateBtn = document.querySelector('[negate]')
const equalBtn = document.querySelector('[equal]')
const clearBtn = document.querySelector('[clear]')
const percentBtn = document.querySelector('[percent]')
const inoutElement = document.querySelector('[inout]')
const pointBtn = document.querySelector('[point]')

// define class Calculator containing all operational functions 
class Calculator{
    //initialize constructor 
    constructor(inoutElement){
        this.inoutElement = inoutElement    //set class variable to input output section of calculator
        this.flag = false       //initialize flag to false, this is for checking if the equal button has just been pushed.
        this.clear()            //clear the display
    }
    
    //clear 
    clear(){
        this.operand = ''               //clears everything
        this.prevOperand = ''
        this.operation = undefined
    }

    //append 
    append(number){
        if(this.flag === true || this.operand === '0'){     //if the equal button flag has been set to true OR if we have a leading 0
            this.operand = number.toString()                //replace the operand with just the number
        } else {
            this.operand = this.operand.toString() + number.toString()      //else just append to the operand
        }
        this.flag = false   //set the equal flag to false
    }

    //point function
    point(){
        if(this.operand === '.'){           //eliminate duplicate '.' showing up in the screen
            this.operand = '.'
        } else{                                                 //if not duplicate
            this.operand = this.operand.toString() + '.'        //append to the operand
        }
    }

    //operation function
    operate(operation){
        if(this.operand === ''){        //if no operand has been defined, return
            return
        }       
        this.operation = operation       //set current operation
        this.prevOperand = this.operand     //set previous oeprand to current operand
        this.operand = ''                   //set current operand to empty string
    }

    //negate
    negate(){
        this.operand *= -1          //negate the current operand
    }

    //percent
    percent(){
        this.operand *= 0.01        //convert current operand to a percent
    }

    //perform calculations
    calculate(){

        let first = parseFloat(this.prevOperand)        //first operand
        let second = parseFloat(this.operand)           //second operand
        if(first === NaN || second === NaN){            //if operands are null, return
            return
        }
        let result = ''
        switch (this.operation){
            case '+':
                result = first + second         //add
                break
            case '-':
                result = first - second         //subtract
                break
            case '*':
                result = first * second         //multiply
                break   
            case '÷':
                result = first / second         //divide
                result = Math.round(100*result)/100;        //round values
                break   
            default:
                break
        }
        this.operand = result
        this.operation = undefined
        this.prevOperand = ''
    }

    //display 
    displayAns(){
        this.inoutElement.innerText = this.operand      //display
    }

    //equal display
    equalDisplay(){
        this.flag = true            //set equal flag to true
        this.inoutElement.innerText = this.operand      //display current operand
    }

    //temporary display
    tempDisplay(){
        this.inoutElement.innerText = this.prevOperand    //display previous operand
    }
}

//instantiate new Calculator object
const calc = new Calculator(inoutElement)


//event listeners for each button, telling them what Calculator functions to call 
//numeric buttons
numBtn.forEach(button => {
    button.addEventListener('click', () => {
        calc.append(button.innerText)
        calc.displayAns()
    })
})

//operation buttons
operBtn.forEach(button => {
    button.addEventListener('click',() => {
        calc.operate(button.innerText)
        calc.tempDisplay()
    })
})

//clear button
clearBtn.addEventListener('click', ()=>{
    calc.clear()
    calc.displayAns()
})

//negate button
negateBtn.addEventListener('click', () => {
    calc.negate()
    calc.displayAns()
})

//equal button
equalBtn.addEventListener('click', () => {
    calc.calculate()
    calc.equalDisplay()
})

//percent button
percentBtn.addEventListener('click', () => {
    calc.percent()
    calc.displayAns()
})

//point button
pointBtn.addEventListener('click', () => {
    calc.point()
    calc.displayAns()
})



