var calculator = {
   value: 0,
   lastValue : 0,
   lastOperator: "",
   containsOperator: false,
   containsPeriod: false,
   newValue: true,
   expression: document.getElementById("expression"),
   output: document.getElementById("readout")
};

function btnSubmitDigit_Click(digit) {
    if (calculator.newValue) {
        calculator.output.value = "";
        calculator.newValue = false;
    }
    calculator.output.value += digit;
}

function submitOperator(operator) {
    if (calculator.containsOperator) {
        evaluate();
    }
    var value = parseFloat(calculator.output.value);
    if (value !== "") {
        calculator.value = value;
        calculator.expression.innerText = calculator.value + " " + operator + " ";
        calculator.lastValue = value;
        calculator.lastOperator = operator;
        calculator.containsOperator = true;
        calculator.newValue = true;
        calculator.containsPeriod = false;
    }
}

function btnSubmitSqrt_Click() {
    var value = parseFloat(calculator.output.value);
    if (value !== "")
        setValue(Math.sqrt(value));
}

function btnSubmitRecip_Click() {
    var value = parseFloat(calculator.output.value);
    if (value !== "")
        setValue(1 / value);
}

function btnSubmitPercent_Click() {
    var value = parseFloat(calculator.output.value);
    var percentOf = parseFloat(calculator.expression.innerText);
    if (value !== "" && !isNaN(percentOf))
        calculator.output.value = (value / 100) * percentOf;
}

function setValue(value) {
    calculator.value = value;
    calculator.expression.innerText = calculator.value;
    calculator.output.value = calculator.value;

    calculator.newValue = true;
    calculator.containsPeriod = false;
}

function btnSubmitDecimal_Click() {
    if (calculator.newValue) {
        calculator.output.value = "0.";
        calculator.newValue = false;
        calculator.containsPeriod = true;
    }
    else if(!calculator.containsPeriod) {
        calculator.output.value += ".";
        calculator.containsPeriod = true;
    }
    else {
        window.alert("You can only have one decimal.");
    }
}

function btnSubmitClear_Click(ce) {
    if  (ce === false) {
        calculator.expression.innerText = "";
        calculator.containsOperator = false;
    }
    calculator.newValue = true;
    calculator.containsPeriod = false;
    calculator.output.value = "";
}

function btnSubmitUnary_Click() {
    calculator.value = -1 * parseFloat(calculator.output.value);
    calculator.output.value = calculator.value;
}

function btnSubmitEqual_Click() {
    if (calculator.containsOperator)
        evaluate();
    else if (calculator.lastOperator !== "") {
        evaluateLastOperator();
    }
}

function evaluate() {
    var expression = calculator.expression.innerText.split(" ");
    var a = parseFloat(expression[0]);
    var b = parseFloat(calculator.output.value);
    var c;

    switch(expression[1]) {
        case "+":   c = a + b;  
                    break;
        case "-":   c = a - b;
                    break;
        case "*":   c = a * b;
                    break;
        case "/":   c = a / b;
                    break;
    }

    calculator.value = c;
    calculator.output.value = c;
    calculator.expression.innerText = c;
    calculator.containsOperator = false;
}

function evaluateLastOperator() {
    var a = parseFloat(calculator.expression.innerText);
    var b = calculator.lastValue;
    var c;
    switch(calculator.lastOperator) {
        case "+":   c = a + b;  
                    break;
        case "-":   c = a - b;
                    break;
        case "*":   c = a * b;
                    break;
        case "/":   c = a / b;
                    break;
    }

    calculator.value = c;
    calculator.output.value = c;
    calculator.expression.innerText = c;
    calculator.containsOperator = false;
}
