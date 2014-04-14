chrome.app.runtime.onLaunched.addListener(function() {
	chrome.app.window.create('index.html', {
		"bounds": {
			"width": 194,
			"height": 291,
			"left": 100,
			"top": 100
		},
		"maxWidth": 194,
		"maxHeight": 291,
		"frame": "none",
		"resizable": false
	});
});