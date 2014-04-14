var Calculator = function Calculator($display, $status){
	this.$d = $display;
	this.$s = $status;
	this.updateDisplay();
};

Calculator.prototype = {
	lastOperator: false,
	lastNumber: null,
	clearOnNextNumberPress: true,
	justPressedOperator: false,
	appendDecimal: false,
	appendDigit: function(digit) {
		if (digit == ".")
			this.appendDecimal = true;
		this.justPressedOperator = false;
		var number = this.getDisplayNumber();
		if (this.clearOnNextNumberPress)
		{
			number = 0;
			this.clearOnNextNumberPress = false;
		}
		else if (this.appendDecimal)
		{
			number += ".";
		}
		number = number.toString();
		if (digit == "." && number.indexOf(".") != -1)
			this.updateDisplay(number);
		else
			this.updateDisplay(number + digit);
	},
	operatorPress: function(operator) {
		if (this.lastNumber != null || this.getDisplayNumber())
		{
			var num = this.getDisplayNumber();
			if (this.justPressedOperator)
			{
				this.$s.html(this.lastNumber + " " + operator);
				this.lastOperator = operator;
			}
			else
			{
				if (this.lastOperator)
				{
					var num = this.performOperation(this.lastNumber, num, this.lastOperator);
					this.updateDisplay(num);
				}
				this.lastNumber = num;
				if (operator == "=")
				{
					this.lastOperator = false;
					this.$s.html("");
				}
				else
				{
					this.lastOperator = operator;
					this.$s.html(num + " " + operator);
					this.updateDisplay();
				}
				this.clearOnNextNumberPress = true;
				this.justPressedOperator = true;
			}
		}
	},
	performOperation: function(numberA, numberB, operator) {
		numberA = parseFloat(numberA);
		numberB = parseFloat(numberB);
		var result;
		switch (true)
		{
			case (operator == "+"):
				result = numberA + numberB;
				break;
			case (operator == "-"):
				result = numberA - numberB;
				break;
			case (operator == "*"):
				result = numberA * numberB;
				break;
			case (operator == "/"):
				result = numberA / numberB;
				break;
		}
		return result;
	},
	updateDisplay: function(number) {
		if (number == null)
		{
			this.$d.val("");
		}
		else
		{
			number = this.getFloat(number);
			if (this.appendDecimal)
				number += ".";
			this.$d.val(number);
			this.appendDecimal = false;
		}
	},
	clear: function() {
		this.lastOperator = false;
		this.lastNumber = null;
		this.clearOnNextNumberPress = true;
		this.justPressedOperator = false;
		this.appendDecimal = false;
		this.updateDisplay();
		this.$s.html("");
	},
	getDisplayNumber: function() {
		return this.$d.val();
	},
	getFloat: function(number) {
		number = parseFloat(number);
		if (isNaN(number))
			return "0";
		return number;
	}
};