var Calculator = function Calculator($display, $status){
	this.$d = $display;
	this.$s = $status;
};

Calculator.prototype = {
	lastOperator: false,
	lastNumber: null,
	clearOnNextNumberPress: true,
	justPressedOperator: false,
	appendDigit: function(digit) {
		// if clearOnNextPress flag is true just set the display to this digit
		if (this.clearOnNextNumberPress)
		{
			this.clearOnNextNumberPress = false;
			this.justPressedOperator = false;
			this.updateDisplay(digit);
		}
		else // append digit to the display number
		{
			this.justPressedOperator = false;
			var n = this.getDisplayNumber();
			// don't allow multiple decimals
			if (digit == "." && n.indexOf(".") != -1)
				return;
			this.updateDisplay(n + digit);
		}	
	},
	/*
	The bulk of the work happens here. When an operator is input the calculator records the display's number and the operator so it can execute the operation later. It would also complete a previous operation if one is in waiting. The calculator also updates its "status" which shows the operation waiting to be performed.
	*/
	operatorInput: function(operator) {
		// don't allow operation unless a number has been input
		if (this.lastNumber != null || this.getDisplayNumber())
		{
			// if an operation was the previous input just replace that operation with this one
			if (this.justPressedOperator)
			{
				// unless the operator is equals
				if (operator == "=")
					return;
				this.updateStatus(this.lastNumber + " " + operator);
				this.lastOperator = operator;
			}
			else
			{
				var n = this.getDisplayNumber();
				// if a previous operation is waiting to execute then execute
				if (this.lastOperator)
				{
					n = this.performOperation(this.lastNumber, n, this.lastOperator);
					this.updateDisplay(n);
				}
				this.lastNumber = n;
				if (operator == "=") // then we're on hold for now
				{
					this.lastOperator = false;
					this.updateStatus("");
				}
				else // the user is going straight into another operation
				{
					this.lastOperator = operator;
					this.updateStatus(n + " " + operator);
					this.updateDisplay("");
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
				console.log(numberA + " + " + numberB + " = " + result);
				break;
			case (operator == "-"):
				result = numberA - numberB;
				console.log(numberA + " - " + numberB + " = " + result);
				break;
			case (operator == "*"):
				result = numberA * numberB;
				console.log(numberA + " * " + numberB + " = " + result);
				break;
			case (operator == "/"):
				result = numberA / numberB;
				console.log(numberA + " / " + numberB + " = " + result);
				break;
		}
		return result;
	},
	getDisplayNumber: function() {
		return this.$d.val();
	},
	updateDisplay: function(number) {
		this.$d.val(number);
	},
	updateStatus: function(str) {
		this.$s.html(str);
	},
	clear: function() {
		this.lastOperator = false;
		this.lastNumber = null;
		this.clearOnNextNumberPress = true;
		this.justPressedOperator = false;
		this.updateDisplay("");
		this.updateStatus("");
	}
};