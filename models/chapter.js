var db = require('../db.js');
//Crear un capitulo
exports.create_chapter = function(name, description,course_id,number, done) {
  var values = [name, description,course_id,number]
  db.get().query('INSERT INTO chapters (name, description,course_id,number) VALUES(?, ?, ?, ?)', values, function(err, result) {
    if (err) return done(err)
    done(null, result)
  })
}
//Actualizar el nombre de un capitulo
exports.update_chapter = function(name, description,course_id,number , chapter_id, done) {
  var values = [name, description,course_id,number,chapter_id]
  db.get().query('UPDATE chapters SET name = ?, description = ?, course_id = ?, number = ? WHERE id_chapter = ?', values, function(err, result) {
    if (err) return done(err)
    done(null, result)
  })
}

//Obtener todos los capitulos
exports.getAllchapters = function(done) {
  db.get().query('SELECT * FROM chapters ', function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}

//obtener un capítulo especifico
exports.get_chapter = function(chapter_id ,done) {
  value = chapter_id
  db.get().query('SELECT * FROM chapters WHERE id_chapter = ?', value, function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}

//eliminar un capitulo
exports.delete_chapter = function(chapter_id ,done) {
  value = chapter_id
  db.get().query('DELETE FROM chapters WHERE id_chapter =  ?', value, function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}


//obtener todos los capítulos de un curso
exports.get_chapters_from_course = function(course_id ,done) {
  value = course_id
  db.get().query('SELECT * FROM chapters WHERE course_id = ?', value, function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}
// exports.getAllBychapter = function(chapterId, done) {
//   db.get().query('SELECT * FROM chapters WHERE chapter_id = ?', chapterId, function (err, rows) {
//     if (err) return done(err)
//     done(null, rows)
//   })
// }