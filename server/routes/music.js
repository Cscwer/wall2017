// music.js
const express = require('express')
    , router = express.Router()
    , rps = require('../utils/rps')
    , { httpGet } = require('../utils/http.client')
    , qs = require('querystring')


let nowProcess = null; 

function initer(){

}
setInterval(initer, 60 * 1000);

router.get('/', function(req, res){
	rps.send2000(res, nowProcess);
}); 

// 抢歌 
// router.post('/', function(req, res){

// });

let SEARCH_URL = 'http://mobilecdn.kugou.com/api/v3/search/song'; 

// ?format=json&keyword=初音&page=1&pagesize=10
// router.get('/search', function(req, res){

// }); 

module.exports = router; 
