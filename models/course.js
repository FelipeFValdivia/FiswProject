
var db = require('../db.js');

exports.create_person = function(name, age,type,learning_type,email,password,nick , done) {
  var values = [name,age,type,learning_type,email,password,nick]
  db.get().query('INSERT INTO persons (name,age,type,learning_type,email,password,nick) VALUES(?, ?, ?, ?, ?,?,?)', values, function(err, result) {
    if (err) return done(err)
    done(null, result)
  })
}
//Obtener todos los usuarios
exports.getAllUsers = function(done) {
  db.get().query('SELECT * FROM persons ', function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}
//obtener todos los estudiantes
exports.getAllStudent = function(done) {
  db.get().query('SELECT * FROM persons WHERE type = 2', function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}
//obtener todos los admins
exports.getAllAdmins = function(done) {
  db.get().query('SELECT * FROM persons WHERE type = 0', function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}
//obtener todos los profesores
exports.getAllProfesors = function(done) {
  db.get().query('SELECT * FROM persons WHERE type = 1', function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}

exports.login = function(name,done) {
	var value = name;
  db.get().query('SELECT * FROM persons WHERE nick = ?',value, function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}

// exports.getAllByUser = function(userId, done) {
//   db.get().query('SELECT * FROM persons WHERE user_id = ?', userId, function (err, rows) {
//     if (err) return done(err)
//     done(null, rows)
//   })
// }