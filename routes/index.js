var express = require('express');
var router = express.Router();
var db = require('../db.js');
var user = require('../models/user');
var course = require('../models/course');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// _______________________________________________________________________________________________________
/*
							Users routes
*/

//Get all users
router.get('/users', function(req,res,next){
	user.getAllUsers(function(err, users){
		if(err){
			return next(err);
		}
		res.json(users);

	})
});
//Get all admins
router.get('/admins', function(req,res,next){
	user.getAllAdmins(function(err, users){
		if(err){
			return next(err);
		}
		res.json(users);

	})
});
//Get al profesors
router.get('/profesors', function(req,res,next){
	user.getAllProfesors(function(err, users){
		if(err){
			return next(err);
		}
		res.json(users);

	})
});


//Get all students
router.get('/students', function(req,res,next){
	user.getAllStudent(function(err, users){
		if(err){
			return next(err);
		}
		res.json(users);

	})
});

router.post('/login', function(req,res,next){
	user.login(req.body.nick,function(err, users){

		if(err){
			return next(err);
		}
		if (users.length>0){
			if(users[0].password == req.body.password){
				res.json(users);
			}
			else{
				res.json("wrong password");	
			}	
		}

		else {
			res.json(null);
		}
		
	})
});

//Crea un usuario
router.post('/users', function(req,res,next){
	user.create(req.body.name,req.body.birthdate, req.body.type , req.body.learning_type ,req.body.email,req.body.password, req.body.nick,function(err, users){
		if(err){
			return next(err);
		}
		res.json(req.body);

	})
});

//Actualiza un usuario
router.put('/users/:user_id', function(req,res,next){
	user.update_user(req.body.name,req.body.birthdate, req.body.type , req.body.learning_type ,req.body.email,req.body.password, req.body.nick, req.params.user_id,function(err, users){
		if(err){
			return next(err);
		}
		res.json(req.body);

	})
});

//Obtener un usuario
router.get('/users/:user_id', function(req,res,next){
	user.get_user(req.params.user_id, function(err, users){
		if(err){
			return next(err);
		}
		res.json(users);

	})
});

//borrar un usuario
router.delete('/users/:user_id', function(req,res,next){
	user.delete_user(req.params.user_id, function(err, users){
		if(err){
			return next(err);
		}
		res.json(users);
	})
});

//____________________________________________________________________________________________________________________________
/*
							Courses routes
*/

//Get all courses
router.get('/courses', function(req,res,next){
	course.getAllCourses(function(err, users){
		if(err){
			return next(err);
		}
		res.json(users);

	})
});

//Create a course
router.post('/courses', function(req,res,next){
	course.create_course(req.body.name,req.body.description, req.body.short_name ,function(err, users){
		if(err){
			return next(err);
		}
		res.json(req.body);

	})
});

//Show a course
router.get('/courses/:course_id', function(req,res,next){
	course.get_course(req.params.course_id,function(err, users){
		if(err){
			return next(err);
		}
		res.json(users);

	})
});


//Actualiza un curso
router.put('/courses/:course_id', function(req,res,next){
	course.update_course(req.body.name,req.body.description, req.body.short_name , req.params.course_id,function(err, users){
		if(err){
			return next(err);
		}
		res.json(req.body);

	})
});

//eliminar un curso
router.delete('/courses/:course_id', function(req,res,next){
	course.delete_course(req.params.course_id, function(err, users){
		if(err){
			return next(err);
		}
		res.json(users);
	})
});

module.exports = router;
