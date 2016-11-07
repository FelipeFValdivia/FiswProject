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
	person.create(req.body.name,req.body.age, 0 , 0 ,req.body.email,req.body.password, req.body.nick,function(err, persons){
		if(err){
			return next(err);
		}
		res.json(req.body);

	})
});
module.exports = router;
