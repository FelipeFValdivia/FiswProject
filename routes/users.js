var express = require('express');
var router = express.Router();

/*
  "/users"
    GET: finds all users
    POST: create a new user
*/

router.get("/users", function(req, res){
});

router.post("/users", function(req, res){
});

/*
  "/users/:id"
    GET: show user by id
    PUT: update user by id
    DELETE: deletes user by id
*/

app.get("/users/:id", function(req, res) {
});

app.put("/users/:id", function(req, res) {
});

app.delete("/users/:id", function(req, res) {
});



/*
/* GET users listing.
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
*/
