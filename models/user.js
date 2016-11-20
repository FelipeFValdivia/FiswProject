
var db = require('../db.js');
//Crear un usuario
exports.create = function(name, birthdate,type,learning_type,email,password,nick , done) {
  var values = [name,birthdate,type,learning_type,email,password,nick]
  db.get().query('INSERT INTO users (name,birthdate,type,learning_type,email,password,nick) VALUES(?, ?, ?, ?, ?,?,?)', values, function(err, result) {
    if (err) return done(err)
    done(null, result)
  })
}
//Actualizar el nombre de un usuario
exports.update_user = function(name, birthdate,type,learning_type,email,password,nick , user_id, done) {
  var values = [name,birthdate,type,learning_type,email,password,nick,user_id]
  db.get().query('UPDATE users SET name = ?, birthdate = ?, type = ?, learning_type = ?, email = ?, password = ?, nick = ? WHERE id_person = ?', values, function(err, result) {
    if (err) return done(err)
    done(null, result)
  })
}

//Obtener todos los usuarios
exports.getAllUsers = function(done) {
  db.get().query('SELECT * FROM users ', function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}
//obtener todos los estudiantes
exports.getAllStudent = function(done) {
  db.get().query('SELECT * FROM users WHERE type = 2', function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}
//obtener todos los admins
exports.getAllAdmins = function(done) {
  db.get().query('SELECT * FROM users WHERE type = 0', function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}
//obtener todos los profesores
exports.getAllProfesors = function(done) {
  db.get().query('SELECT * FROM users WHERE type = 1', function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}

//obtener un usuario especifico
exports.get_user = function(user_id ,done) {
  value = user_id
  db.get().query('SELECT * FROM users WHERE id_person = ?', value, function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}

exports.delete_user = function(user_id ,done) {
  value = user_id
  db.get().query('DELETE FROM users WHERE id_person =  ?', value, function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}


exports.login = function(name,done) {
	var value = name;
  db.get().query('SELECT * FROM users WHERE nick = ?',value, function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}

// exports.getAllByUser = function(userId, done) {
//   db.get().query('SELECT * FROM users WHERE user_id = ?', userId, function (err, rows) {
//     if (err) return done(err)
//     done(null, rows)
//   })
// }