// page.js
const N = 10
    , { wishModel } = require('../../utils/db')


function find(query, p, N){
	return wishModel
		.find(query)
		.populate('she')
		.sort({
			created_at: -1
		})
		.skip(p * N)
		.limit(N)
}

module.exports = {
	find: find
}
