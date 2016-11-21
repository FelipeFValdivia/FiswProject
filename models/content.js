var db = require('../db.js');
//Crear un contenido
exports.create_content = function(name, type,content,chapter_id, done) {
  var values = [name, type,content,chapter_id]
  db.get().query('INSERT INTO contents (name, type,content,chapter_id) VALUES(?, ?, ?, ?)', values, function(err, result) {
    if (err) return done(err)
    done(null, result)
  })
}
//Actualizar un contenido
exports.update_content = function(name, type,content , content_id, done) {
  var values = [name, type,content , content_id]
  db.get().query('UPDATE contents SET name = ?, type = ?, content = ? WHERE id_content = ?', values, function(err, result) {
    if (err) return done(err)
    done(null, result)
  })
}

//Obtener todos los contenidos
exports.getAllcontents = function(done) {
  db.get().query('SELECT * FROM contents ', function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}

//obtener un contenido especifico
exports.get_content = function(content_id ,done) {
  value = content_id
  db.get().query('SELECT * FROM contents WHERE id_content = ?', value, function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}

//eliminar un contenido
exports.delete_content = function(content_id ,done) {
  value = content_id
  db.get().query('DELETE FROM contents WHERE id_content =  ?', value, function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}


//obtener todos los contenidos de un capitulo
exports.get_contents_from_chapter = function(chapter_id ,done) {
  value = chapter_id
  db.get().query('SELECT * FROM contents WHERE chapter_id = ?', value, function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}
