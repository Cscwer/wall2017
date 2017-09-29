// schemas.js
const mongoose = require('../connect')
    , fs = require('then-fs')
    , schemas = {}

let schemaList = fs.readdirSync(__dirname).filter(name => {
	if (name === 'index.js'){
		return false; 
	} else if (!name.endsWith('.js')){
		return false; 
	} else {
		return true; 
	}
}).map(e => e.replace('.js', '')); 

schemaList.forEach(name => {
	schemas[name] = require('./' + name); 
}); 

module.exports = schemas; 
