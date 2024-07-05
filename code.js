var operators = ["+", "-", "/", "*"];

var box = null;
var last_operation_history = null;
var operator = null;
var equal = null;
var dot = null;

var firstNum = true;

var numbers = [];
var operator_value;
var last_button;
var calc_operator;

var total;

var key_combination = []
function button_number(button) {
    const operators = ["+", "-", "*", "/"];
    const operatorButtons = document.getElementsByClassName("operator");
    const box = document.getElementById("box");
    const lastOperationHistory = document.getElementById("last_operation_history");
    const equal = document.getElementById("equal_sign").value;
    const dot = document.getElementById("dot").value;

    let lastButton = button;
    let isOperator = operators.includes(button);
    
    if (!isOperator && button !== equal) {
        if (firstNum) {
            box.innerText = button === dot ? "0" + dot : button;
            firstNum = false;
        } else {
            if (box.innerText === "0" && button !== dot) {
                box.innerText = button;
            } else if (!(box.innerText.includes(dot) && button === dot) && box.innerText.length < 20) {
                box.innerText += button;
            }
        }
    } else {
        if (button === "-" && box.innerText === "0") {
            box.innerText = "-";
            firstNum = false;
            operator_value = button;
            showSelectedOperator();
            return;
        }
        
        if (operator_value !== button) {
            if (isOperator) {
                calc_operator = last_operator || button;
                last_operator = button === "*" ? "×" : button === "/" ? "÷" : button;
                operator_value = button;
                firstNum = true;
                showSelectedOperator();
            }
            
            if (numbers.length === 0) {
                numbers.push(box.innerText);
                if (last_operator) {
                    lastOperationHistory.innerText = box.innerText + " " + last_operator;
                }
            } else {
                numbers[1] = box.innerText;
                if (button === equal && calc_operator) {
                    const total = calculate(numbers[0], numbers[1], calc_operator);
                    box.innerText = total;
                    if (!lastOperationHistory.innerText.includes("=")) {
                        lastOperationHistory.innerText += " " + numbers[1] + " =";
                    }
                    numbers[0] = total;
                    operator_value = null;
                    showSelectedOperator();
                    lastOperationHistory.innerText = lastOperationHistory.innerText.replace(numbers[0], total);
                } else if (calc_operator) {
                    lastOperationHistory.innerText = box.innerText + " " + last_operator;
                    calc_operator = button;
                    numbers = [box.innerText];
                }
            }
        }
    }
}
 // highlight operator button when selected
function showSelectedOperator(){

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
    else {
        if (total == box.innerText){
            return total
        }
        else {
            return box.innerText
        }
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

function backspace_remove(){

    box = document.getElementById("box");
    var elements = document.getElementsByClassName("operator");

    for (var i=0; i<elements.length; i++){
        elements[i].style.backgroundColor  = "#e68a00";
    }

    var last_num = box.innerText;
    last_num = last_num.slice(0, -1)
    
    box.innerText = last_num

    // show 0 zero if all characters on screen are removed
    if (box.innerText.length == 0){
        box.innerText = 0
        firstNum = true
    }

}


// function to change the sign of the number currently on screen
function plus_minus(){
    box = document.getElementById("box");

    // if any operator is already pressed
    if (typeof last_operator != "undefined"){
        if (numbers.length>0){
            // if last button pressed is an operator
            if (operators.includes(last_button)){
                // if the displayed text is just a negative sign, replace it with a 0
                if (box.innerText == "-"){
                    box.innerText = 0
                    firstNum = true
                    return
                }
                // if the displayed text is not a just a negative sign, replace it with a negative sign
                else {
                    box.innerText = "-"
                    firstNum = false
                }
            }
            // if last button pressed is not an operator, change its sign
            else {
                box.innerText = -box.innerText

                if (numbers.length==1){
                    numbers[0] = box.innerText
                }
                else {
                    numbers[1] = box.innerText
                }
            }
        }
        return
    }

    // if displayed text is 0, replace it with a negative sign
    if (box.innerText == 0){
        box.innerText = "-"
        firstNum = false
        return
    }
    box.innerText = -box.innerText
}

// function to calculate square root of the number currently on screen
function square_root(){
    box = document.getElementById("box");
    var square_num = Math.sqrt(box.innerText)
    box.innerText = square_num
    numbers.push(square_num)
}

// function to calculate the division of 1 with the number currently on screen
function division_one(){
    box = document.getElementById("box");
    var square_num = 1/box.innerText
    box.innerText = square_num
    numbers.push(square_num)
}

// function to calculate the power of the number currently on screen
function power_of(){
    box = document.getElementById("box");
    var square_num =Math.pow(box.innerText, 2)
    box.innerText = square_num
    numbers.push(square_num)
}

// function to calculate the percentage of a number
function calculate_percentage(){
    var elements = document.getElementsByClassName("operator");
    box = document.getElementById("box");

    if (numbers.length > 0 && typeof last_operator != "undefined"){

        var perc_value = ((box.innerText / 100) * numbers[0])
        if (!Number.isInteger(perc_value)) {
            perc_value = perc_value.toFixed(2);
        }
        box.innerText = perc_value
        numbers.push(box.innerText)
    
        // append second number to history
        if (!last_operation_history.innerText.includes("=")){
            last_operation_history.innerText += " " + numbers[1] + " ="
        }
    }
    else {
        box.innerText = box.innerText/100
    }

    numbers.push(box.innerText)
    var res = calculate(numbers[0], numbers[1], last_operator)
    box.innerText = res
    operator_value = "="

    // deselect operator if any selected
    for (var i=0; i<elements.length; i++){
        elements[i].style.backgroundColor  = "#e68a00";
    }
}

// function to clear last number typed into the display
function clear_entry(){
    box = document.getElementById("box");

    if (numbers.length > 0 && typeof last_operator != "undefined"){
        box.innerText = 0
        var temp = numbers[0]
        numbers = []
        numbers.push(temp)
        firstNum = true;
    }
}

document.addEventListener('keydown', keyPressed);
document.addEventListener('keyup', keyReleased);

// function to capture keydown events
function keyPressed(e) {
    e.preventDefault()
    var equal = document.getElementById("equal_sign").value;
    var dot = document.getElementById("dot").value;

    if (e.key == "Delete"){
        button_clear();
        return;
    }

    var isNumber = isFinite(e.key);
    var enterPress;
    var dotPress;
    var commaPress = false;

    if (e.key == "Enter"){
        enterPress = equal;
    }
    if (e.key == "."){
        dotPress = dot;
    }
    if (e.key == ","){
        commaPress = true;
    }
    
    if (isNumber || operators.includes(e.key) || e.key == "Enter" || e.key == dotPress || 
        commaPress || e.key == "Backspace"){
        if (e.key == "Enter"){
            button_number(enterPress)
        }
        else if (e.key == "Backspace"){
            document.getElementById("backspace_btn").style.backgroundColor  = "#999999";
            backspace_remove()
        }
        else if (commaPress){
            button_number(dot)
        }
        else {
            button_number(e.key) 
        }   
    }
    if (e.key) {
        key_combination[e.code] = e.key;
    }
}

// function to capture keyup events
function keyReleased(e){
    if (key_combination['ControlLeft'] && key_combination['KeyV']) {
        navigator.clipboard.readText().then(text => {
            box = document.getElementById("box");
            var isNumber = isFinite(text);
            if (isNumber){
                var copy_number = text
                firstNum = true
                button_number(copy_number)
            }
        }).catch(err => {
            console.error('Failed to read clipboard contents: ', err);
        });
    }
    if (key_combination['ControlLeft'] && key_combination['KeyC']) {
        box = document.getElementById("box");
        navigator.clipboard.writeText( box.innerText)
    }
    key_combination = []
    e.preventDefault()
    // set the color of the backspace button back to its original
    if (e.key == "Backspace"){
        document.getElementById("backspace_btn").style.backgroundColor  = "#666666";
    }
}
