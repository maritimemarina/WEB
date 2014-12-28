calc = new Calculator();

function Calculator() {

    this.init = function (outId) {
        this.currents = 0;
        this.flagNewNum = false;
        this.pendingOp = "";
        this.readOut = document.getElementById(outId);
    }


    // обработчик нажатия
    // цифровой кнопки
    this.numPressed = function(num) {
        if (this.flagNewNum) {
            this.readOut.value = num;
            this.flagNewNum = false;
        }
        else {
            if (this.readOut.value == "0") {
                this.readOut.value = num;
            }
            else {
                this.readOut.value += num;
            }
        }
    }

    // обработчик нажатия
    // кнопки действия
    this.operation = function(op) {
        var readOut = this.readOut.value;
        if (this.flagNewNum && this.pendingOp != "=") {
            this.readOut.value = this.currents;
        }
        else {
            this.flagNewNum = true;
            if ('+' == this.pendingOp)
                this.currents += parseFloat(readOut);
            else if ('-' == this.pendingOp)
                this.currents -= parseFloat(readOut);
            else if ('/' == this.pendingOp)
                this.currents /= parseFloat(readOut);
            else if ('*' == this.pendingOp)
                this.currents *= parseFloat(readOut);
            else
                this.currents = parseFloat(readOut);
            this.readOut.value = this.currents;
            this.pendingOp = op;
        }
    }

    // добавление десятичной точки с числу
    this.decimal = function() {
        var curreadOut = this.readOut.value;
        if (this.flagNewNum) {
            curreadOut = "0.";
            this.flagNewNum = false;
        }
        else {
            if (curreadOut.indexOf(".") == -1)
                curreadOut += ".";
        }
        this.readOut.value = curreadOut;
    }

    // Очистка текущего результата
    this.clearEntry = function () {
        this.readOut.value = "0";
        this.flagNewNum = true;
    }

    // Полная очистка всех результатов
    this.clear = function () {
        this.currents = 0;
        this.pendingOp = "";
        this.clearEntry();

    }

    // меняем знак текущего результата
    this.neg = function() {
        this.readOut.value =
            parseFloat(this.readOut.value) * -1;
    }

    // вычисляем значение процентов
    this.percent = function() {
        this.readOut.value = (parseFloat(this.readOut.value) / 100) * parseFloat(this.currents);
    }
}