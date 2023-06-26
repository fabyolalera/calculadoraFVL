class CalculadoraBasica {

    constructor() {
        this.basicOperationShape = new RegExp("(([1-9][0-9]*|[0.])(.[0-9]*[1-9])?[\-\+\*\/])(([1-9][0-9]*|[0.])(.[0-9]*[1-9])?)");
        this.memoryRegister = 0;
    }

    printMemoryContents() {
        this.clearDisplay();
        this.writeToDisplay(this.memoryRegister);
    }

    subtractFromMemory() {
        this.memoryRegister -= this.solveOperation();
    }

    addToMemory() {
        this.memoryRegister += this.solveOperation();
    }

    writeToDisplay(data) {
        let legacy = document.getElementById("displayBox").value;
        if (data == ".") {
            legacy += data;
        } else {
            legacy = legacy == "0" ? data : legacy += data;
        }
        document.getElementById("displayBox").value = legacy;
    }
    writeToDisplayConv(data) {
        let legacy = document.getElementById("displayBoxConv").value;
        if (data == ".") {
            legacy += data;
        } else {
            legacy = legacy == "0" ? data : legacy += data;
        }
        document.getElementById("displayBoxConv").value = legacy;
    }

    writeOperatorToDisplay(operator) {
        let legacy = document.getElementById("displayBox").value;
        if (this.basicOperationShape.test(legacy)) {
            this.solveOperation();
        }
        this.writeToDisplay(operator);
    }

    clearDisplay() {
        document.getElementById("displayBox").value = "0";
    }
    clearDisplayConv() {
        document.getElementById("displayBoxConv").value = "0";
    }

    solveOperation() {
        let operation = document.getElementById("displayBox").value;
        let result = 0;
        try {
            result = eval(operation == "" ? 0 : operation);
        } catch (err) {
            alert("Syntax error");
            this.clearDisplay();
        }
        document.getElementById("displayBox").value = result;
        return result;
    }

}

class CalculadoraCientifica extends CalculadoraBasica {

    
    // Función para convertir longitud de metros a pulgadas
    convertMetersToInches() {
        const meters = parseFloat(this.operationString.split(new RegExp("[^0-9.]")));
        const inches = meters * 39.37;
        this.clearDisplayConv();
        document.getElementById("displayBoxConv").value = inches;
    }

    // Función para convertir pulgadas a metros
    convertInchesToMeters() {
        const inches = parseFloat(this.operationString.split(new RegExp("[^0-9.]")));
        const meters = inches / 39.37;
        this.clearDisplayConv();
        document.getElementById("displayBoxConv").value = meters;
    }

    // Función para convertir temperatura de Celsius a Fahrenheit
    convertCelsiusToFahrenheit() {
        const celsius = parseFloat(this.operationString.split(new RegExp("[^0-9.]")));
        const fahrenheit = (celsius * 9/5) + 32;
        this.clearDisplayConv();
        document.getElementById("displayBoxConv").value = fahrenheit;
    }

    // Función para convertir temperatura de Fahrenheit a Celsius
    convertFahrenheitToCelsius() {
        const fahrenheit = parseFloat(this.operationString.split(new RegExp("[^0-9.]")));
        const celsius = (fahrenheit - 32) * 5/9;
        this.clearDisplayConv();
        document.getElementById("displayBoxConv").value = celsius;
    }


    constructor() {
        super();
        this.inputList = new Array();
        this.operationString = "";
        this.justSolved = false;
        this.operationMap = {
            "sin(": "Math.sin((Math.PI/180)*",
            "cos(": "Math.cos((Math.PI/180)*",
            "tan(": "Math.tan((Math.PI/180)*",
            "asin(": "Math.asin(",
            "acos(": "Math.acos(",
            "atan(": "Math.atan(",
            "log(": "Math.log10(",
            "ln(": "Math.log(",
            "abs(": "Math.abs(",
            "cbrt(": "Math.cbrt(",
            "sqrt(": "Math.sqrt(",
            "PI": "Math.PI",
            "e": "Math.E"
        };
    }

    /**
     * Writes new user input from the calculator buttons onto the
     * display.
     * 
     * @param {String} data The data to display on the screen.
     * Given by a button click from the user. 
     */
    writeToDisplay(data) {
        if (document.getElementById("displayBox").value == "Syntax Error") {
            super.clearDisplay();
        }
        super.writeToDisplay(data);
        this.operationString += data;
        this.inputList.push(data);
    }
    writeToDisplayConv(data) {
        if (document.getElementById("displayBoxConv").value == "Syntax Error") {
            super.clearDisplayConv();
        }
        super.writeToDisplayConv(data);
        this.operationString += data;
        this.inputList.push(data);
    }

    /**
     * Writes the operator clicked by the user to the screen.
     * 
     * @param {String} operator An string representing the operator 
     * that has been clicked on by the user. 
     */
    writeOperatorToDisplay(operator) {
        if (document.getElementById("displayBox").value == "Syntax Error") {
            super.clearDisplay();
        }
        this.operationString += operator;
        super.writeToDisplay(operator);
        this.inputList.push(operator);
    }


    solveOperation() {
        let result = 0;
        try {
            result = eval(this.operationString == "" || this.operationString == "Syntax Error" ? 0 : this.operationString);
        } catch (err) {
            result = "Syntax Error";
        }
        document.getElementById("displayBox").value = result;
        this.operationString = "";
        this.operationString += result;
        this.justSolved = true;
        return result;
    }

    /*
      Limpia pantalla
     */
    clearDisplay() {
        super.clearDisplay();
        this.operationString = "";
    }
    clearDisplayConv() {
        super.clearDisplayConv();
        this.operationString = "";
    }

    toggleSign() {
        var displayBox = document.getElementById("displayBox");
        var displayContents = displayBox.value;
        if (displayContents == "Syntax Error") {
            super.clearDisplay();
        }
        if (displayContents == "0") {
            displayBox.value = "-";
            this.operationString += "-";
        } else {
            displayBox.value = "-" + displayBox.value;
            this.operationString = "-" + this.operationString;
        }
    }
    toggleSignConv() {
        var displayBox = document.getElementById("displayBoxConv");
        var displayContents = displayBox.value;
        if (displayContents == "Syntax Error") {
            super.clearDisplayConv();
        }
        if (displayContents == "0") {
            displayBox.value = "-";
            this.operationString += "-";
        } else {
            displayBox.value = "-" + displayBox.value;
            this.operationString = "-" + this.operationString;
        }
    }

    clearMemory() {
        super.subtractFromMemory(this.memoryRegister);
    }

    readMemory() {
        this.clearDisplay();
        this.writeToDisplay(this.memoryRegister);
    }

    saveToMemory() {
        this.memoryRegister = this.solveOperation();
    }

    eraseLastInput() {
        this.inputList.pop();
        var recreatedOperation = "";
        for (var each in this.inputList) {
            recreatedOperation += this.inputList[each];
        }
        document.getElementById("displayBox").value = recreatedOperation;
        for (var each in this.operationMap) {
            recreatedOperation = recreatedOperation.replace(each, this.operationMap[each]);
        }
        this.operationString = recreatedOperation;
    }

    eraseLastInputConv() {
        this.inputList.pop();
        var recreatedOperation = "";
        for (var each in this.inputList) {
            recreatedOperation += this.inputList[each];
        }
        document.getElementById("displayBoxConv").value = recreatedOperation;
        for (var each in this.operationMap) {
            recreatedOperation = recreatedOperation.replace(each, this.operationMap[each]);
        }
        this.operationString = recreatedOperation;
    }

    writeMathFunction(data) {
        if (document.getElementById("displayBox").value == "Syntax Error") {
            super.clearDisplay();
        }
        super.writeToDisplay(data);
        this.operationString += this.operationMap[data];
        this.inputList.push(data);
    }

    // En el objeto 'calculadora' existente, agrega la siguiente función:

    negativeExponent = function() {
        let display = document.getElementById('displayBox');
        let expression = display.value;
    
        if (expression.includes('^')) {
        let parts = expression.split('^');
        let base = parseFloat(parts[0]);
        let exponent = parseFloat(parts[1]);
    
        if (exponent > 0) {
            display.value = "Potencia positiva";
            return;
        }
        let result = Math.pow(base,  Math.abs(exponent));
        display.value = `1 / ${result}`;
        }
    };
  positiveExponent = function() {
    let display = document.getElementById('displayBox');
    let expression = display.value;
 
    if (expression.includes('^')) {
      let parts = expression.split('^');
      let base = parseFloat(parts[0]);
      let exponent = parseFloat(parts[1]);
  
      if (exponent < 0) {
        display.value = "Potencia negativa";
        return;
      }
      let result = Math.pow(base,  exponent);
      display.value = result;
    }
  };  

  convertToDegrees = function() {
    let display = document.getElementById('displayBox');
    let expression = display.value;
  
    // Verificar si hay un número en la expresión
    if (!isNaN(expression)) {
      let radians = parseFloat(expression);
  
      // Convertir a grados
      let degrees = (radians * 180) / Math.PI;
  
      // Mostrar el resultado en el display
      display.value = `${degrees}°`;
    }
  }
    convertToRadians = function() {
        let display = document.getElementById('displayBox');
        let expression = display.value;
    
        // Verificar si hay un ángulo en la expresión
        let anglePattern = /^(\d+)°(\d+)´(\d+)"$/;
        let match = expression.match(anglePattern);
    
        if (match) {
        let degrees = parseInt(match[1]);
        let minutes = parseInt(match[2]);
        let seconds = parseInt(match[3]);
    
        // Convertir a radianes
        let radians = (degrees + minutes / 60 + seconds / 3600) * (Math.PI / 180);
    
        // Mostrar el resultado en el display
        display.value = radians;
        }
    }
  
  

   calculatePercentage = function() {
    let display = document.getElementById('displayBox');
    let expression = display.value;

    if (expression.includes('%')) {
      let parts = expression.split('%');
      let number = parseFloat(parts[0]);
      let percentage = parseFloat(parts[1]);
  
      let result = (number * percentage) / 100;

      display.value = result;
    }
  }
  

    calculateFactorial() {
        var number = parseInt(this.operationString.split(new RegExp("[^0-9]")));
        var result = 0;
        try {
            result = this.calculateRecursiveFactorial(number);
        } catch (err) {
            document.getElementById("displayBox").value = "Número muy grande";
        }
        this.clearDisplay();
        document.getElementById("displayBox").value = result;
    }

    calculateRecursiveFactorial(number) {
        if (number == 1 || number == 0) {
            return 1;
        }
        return number * this.calculateRecursiveFactorial(number - 1);
    }

    nthTenPower() {
        var number = parseInt(this.operationString.split(new RegExp("[^0-9]")));
        this.clearDisplay();
        document.getElementById("displayBox").value = Math.pow(10, parseInt(number));
    }

    square() {
        var number = parseInt(this.operationString.split(new RegExp("[^0-9]")));
        this.clearDisplay();
        document.getElementById("displayBox").value = Math.pow(parseInt(number), 2);
    }

    cube() {
        var number = parseInt(this.operationString.split(new RegExp("[^0-9]")));
        this.clearDisplay();
        document.getElementById("displayBox").value = Math.pow(parseInt(number), 3);
    }

    inverseNumber() {
        var number = parseInt(this.operationString.split(new RegExp("[^0-9]")));
        this.clearDisplay();
        document.getElementById("displayBox").value = Math.pow(parseInt(number), -1);
    }

}

const calculadora = new CalculadoraCientifica();