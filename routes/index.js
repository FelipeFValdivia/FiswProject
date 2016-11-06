var express = require('express');
var router = express.Router();
var db = require('../db.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.get('/persons', function(req,res,next){
	Persons.find(function(err, persons){
		if(err){
			return next(err);
		}
		res.json(persons);

	})
});
module.exports = router;
