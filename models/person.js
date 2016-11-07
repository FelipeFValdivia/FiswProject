
var db = require('../db.js');

exports.create = function(name, age,type,learning_type,email,password,nick , done) {
  var values = [name,age,type,learning_type,email,password,nick]
  db.get().query('INSERT INTO persons (name,age,type,learning_type,email,password,nick) VALUES(?, ?, ?, ?, ?,?,?)', values, function(err, result) {
    if (err) return done(err)
    done(null, result.insertId)
  })
}

exports.getAllStudent = function(done) {
  db.get().query('SELECT * FROM persons WHERE type = 2', function (err, rows) {
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