var express = require('express');
var router = express.Router();
var db = require('../db.js');
var person = require('../models/person');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.get('/students', function(req,res,next){
	person.getAllStudent(function(err, persons){
		if(err){
			return next(err);
		}
		res.json(persons);

	})
});

router.post('/student', function(req,res,next){
	person.create("12",23,0,0,"123","123","123",function(err, persons){
		if(err){
			return next(err);
		}
		res.json(req.body);

	})
});
module.exports = router;
