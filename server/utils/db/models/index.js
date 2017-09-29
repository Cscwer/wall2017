// models.js 
// Schemas Map To Models 
const schemas = require('../schemas')
    , mongoose = require('../connect')
    , fs = require('then-fs')

let schemasNames = Object.keys(schemas); 

let extFuncs = fs.readdirSync(__dirname).filter(name => {
	if (name === 'index.js'){
		return false; 
	} else if (!name.endsWith('.js')){
		return false; 
	} else {
		return true; 
	}
}).map(fileName => {
	let namePart = fileName.split('.'); 
	let [modelName, funcName] = namePart; 
	let func = require('./' + fileName); 

	return { modelName, funcName, func }; 
}); 

let models = schemasNames.reduce((acc, name) => {
	let model = mongoose.model(
		name,
		schemas[name]
	);

	extFuncs.forEach(ext => {
		let { modelName, funcName, func } = ext; 

		if (name === modelName){
			model[funcName] = func; 
		}
	}); 

	acc[name + 'Model'] = model; 

	return acc;  
}, {})

module.exports = models; 
