var db = require('../db.js');

exports.create_course = function(name, description,short_name, done) {
  var values = [name, description,short_name]
  db.get().query('INSERT INTO courses (name, description,short_name) VALUES(?, ?, ?)', values, function(err, result) {
    if (err) return done(err)
    done(null, result)
  })
}
//Obtener todos los cursos
exports.getAllCourses = function(done) {
  db.get().query('SELECT * FROM courses ', function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}

//Obtener un curso
exports.get_course = function(course_id,done) {
  value = course_id
  db.get().query('SELECT * FROM courses WHERE id_course = ? ', value, function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}

//actualizar un curso
exports.update_course = function(name, description, short_name, course_id, done) {
  var values = [name, description, short_name, course_id]
  db.get().query('UPDATE courses SET name = ?, description = ?, short_name = ? WHERE id_course = ?', values, function(err, result) {
    if (err) return done(err)
    done(null, result)
  })
}

//eliminar un curso
exports.delete_course = function(course_id ,done) {
  value = course_id
  db.get().query('DELETE FROM courses WHERE id_course =  ?', value, function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}

