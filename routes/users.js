var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/students', function(req,res,next){
	person.getAllStudent(function(err, persons){
		if(err){
			return next(err);
		}
		res.json(persons);

	})
});
module.exports = router;