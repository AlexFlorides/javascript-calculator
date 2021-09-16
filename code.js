var operators = ["+", "-", "/", "*"];

var box = null;
var operator = null;
var equal = null;
var dot = null;

var firstNum = true;

var numbers = [];
var operator_value;

function button_number(button) {

    operator = document.getElementsByClassName("operator");
    box = document.getElementById("box");
    equal = document.getElementById("equal_sign").value;
    dot = document.getElementById("dot").value;

    // if button is not an operator or = sign
    if (!operators.includes(button) && button!=equal){
        // if it is the first button clicked
        if (firstNum){
            // and it's a dot, show 0.
            if (button == dot){
                box.innerText = "0"+dot;
            }
            // else clear box and show the number
            else {
                box.innerText = button;
            }
            firstNum = false;
        }
        else {
            // return if the box value is 0
            if (box.innerText.length == 1 && box.innerText == 0){

                if (button == dot){
                    box.innerText += button;
                }
                return;
            }
            // return if the box already has a dot and clicked button is a dot
            if (box.innerText.includes(dot) && button == dot){
                return;
            }
            // maximum allowed numbers inputted are 20
            if (box.innerText.length == 20){
                return;
            }

            // if pressed dot and box already has a - sign, show -0.
            if (button == dot && box.innerText == "-"){
                box.innerText = "-0"+dot;
            }
            // else append number
            else {
                box.innerText += button;
            }  
        }
    }
    // if it's an operator or = sign
    else {
        // show - sign in the box if it's the first button clicked
        if (button == "-" && box.innerText == 0){
            box.innerText = button;
            firstNum = false;
            return;
        } 

        // if button is either +, -, *, / store its value
        if (operators.includes(button)){
            last_operator = button;
        }

        // store first number of the equation
        if (numbers.length == 0){
            numbers.push(box.innerText);
        }
        // store the second number of the equation
        else {
            numbers[1] = box.innerText;

            // if = sign pressed calculate the total and show it
            if (button==equal && last_operator != null){
                var total = calculate(numbers[0], numbers[1], last_operator)
                box.innerText = total;
                numbers = [];
                numbers.push(total)
                last_operator = numbers;
            }
        }

        operator_value = button;
        firstNum = true;

        // highlight operator button when selected
        var elements = document.getElementsByClassName("operator");
        
        for (var i=0; i<elements.length; i++){
            elements[i].style.backgroundColor  = "#e68a00";
        }

        if (operator_value == "+"){
            document.getElementById("plusOp").style.backgroundColor  = "#ffd11a";
        }
        else if (operator_value == "-"){
            document.getElementById("subOp").style.backgroundColor  = "#ffd11a";
        }
        else if (operator_value == "*"){
            document.getElementById("multiOp").style.backgroundColor  = "#ffd11a";
        }
        else if (operator_value == "/"){
            document.getElementById("divOp").style.backgroundColor  = "#ffd11a";
        }
    }

}

// function to calculate the result using two number and an operator
function calculate(num1, num2, operator){

    if (operator === "+"){
        total = (parseFloat)(num1)+(parseFloat)(num2)
    }
    else if (operator === "-"){
        total = (parseFloat)(num1)-(parseFloat)(num2)
    }
    else if (operator === "*"){
        total = (parseFloat)(num1)*(parseFloat)(num2)
    }
    else if (operator === "/"){
        total = (parseFloat)(num1)/(parseFloat)(num2)
    }
    // if total is not integer, show maximum 12 decimal places
    if (!Number.isInteger(total)){
        total = total.toPrecision(12);
    }
    return parseFloat(total);
}

// function to clear box and reset everything
function button_clear(){
    window.location.reload()
}

document.addEventListener('keydown', keyPressed);

// function to capture keyboard events
function keyPressed(e) {
    var equal = document.getElementById("equal_sign").value;
    var dot = document.getElementById("dot").value;

    if (e.key == "Delete"){
        button_clear();
        return;
    }

    var isNumber = isFinite(e.key);
    var enterPress;
    var dotPress;

    if (e.key == "Enter"){
        enterPress = equal;
    }
    if (e.key == "."){
        dotPress = dot;
    }
    
    if (isNumber || operators.includes(e.key) || e.key == "Enter" || e.key == dotPress){
        if (e.key == "Enter"){
            button_number(enterPress)
        }
        else {
            button_number(e.key) 
        }   
    }
}

