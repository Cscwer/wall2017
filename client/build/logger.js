// logger.js
const colors = require('colors')

// Set Theme 
colors.setTheme({
	silly: 'rainbow',
	input: 'grey',
	verbose: 'cyan',
	prompt: 'red',
	info: 'green',
	data: 'blue',
	help: 'cyan',
	warn: 'yellow',
	debug: 'magenta',
	error: 'red'
});

module.exports = function(title, word){
	console.log(
		'['.input,
		title,
		']'.input,
		word
	); 
}
