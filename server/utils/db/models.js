// models.js 
// Schemas Map To Models 
const schemas = require('./schemas')
    , mongoose = require('./connect'); 

let schemasNames = Object.keys(schemas); 

let models = schemasNames.reduce((acc, name) => {
	acc[name + 'Model'] = mongoose.model(
		name,
		schemas[name]
	);

	return acc;  
}, {})

module.exports = models; 
