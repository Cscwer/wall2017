// models.js 
// Schemas Map To Models 
const schemas = require('../schemas')
    , mongoose = require('../connect')
    , fs = require('then-fs')

let schemasNames = Object.keys(schemas); 

var extGeneretor = fileName => {
	let namePart = fileName.split('.'); 
	let [modelName, funcName] = namePart; 
	let func = require('./' + fileName); 

	return { modelName, funcName, func }; 
}

let publicFuncs = [];
let extFuncs = fs.readdirSync(__dirname).filter(name => {
	if (name === 'index.js'){
		return false; 
	} else if (!name.endsWith('.js')){
		return false; 
	} else if (name.startsWith('all.')){
		let ext = extGeneretor(name); 
		publicFuncs.push(ext); 
	} else {
		return true; 
	}
}).map(extGeneretor);

let models = schemasNames.reduce((acc, name) => {
	let model = mongoose.model(
		name,
		schemas[name]
	);

	// 私有方法 
	extFuncs.forEach(ext => {
		let { modelName, funcName, func } = ext; 

		if (name === modelName){
			model[funcName] = func; 
		}
	}); 

	// 公共方法 
	publicFuncs.forEach(ext => {
		let { modelName, funcName, func } = ext; 
		model[funcName] = func; 
	})

	acc[name + 'Model'] = model; 

	return acc;  
}, {})

module.exports = models; 
