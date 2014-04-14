$(function(){

	var $numbers = $(".number.button");
	var $operators = $(".operator.button");
	var $actions = $(".action.button");
	var $display = $("#display");
	var $status = $("#status");
	var $info = $("#info-overlay");
	var $dismiss = $("#dismiss-overlay");
	var $exit = $("#exit");
	var $minimize = $("#minimize");
	var calculator = new Calculator($display, $status);

	$numbers.click(function(){
		var digit = $(this).data("number");
		calculator.appendDigit(digit);
		return false;
	});

	$operators.click(function(){
		var operator = $(this).data("operator");
		calculator.operatorInput(operator);
		return false;
	});

	$actions.click(function(){
		var action = $(this).data("action");
		switch (true)
		{
			case (action == "clear"):
				calculator.clear();
				break;
			case (action == "info"):
				$info.show();
				break;
		}
		return false;
	});

	$dismiss.click(function(){
		$info.hide();
		return false;
	});

	$exit.click(function(){
		window.close();
	});

	$minimize.click(function(){
		chrome.app.window.current().minimize();
	})

});