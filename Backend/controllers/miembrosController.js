let db = require('../database/models');
let op = db.Sequelize.Op;


let miembrosController = {

indexo: function(req, res, next) {

  db.Miembro.findAll()
  .then(function(data){
    // return res.send(data);
    let miembrosLista = data;
    res.send(miembrosLista);
  })
  .catch(function(e){
    console.log(e)
  })
},

index: function(req, res, next) {
  db.Miembro.findAll()
  .then(function(data){
    // return res.send(data);
    let procList = data;
    res.render('miembros', { title: 'miembros  2', listamiembros: procList});
  })
  .catch(function(e){
    console.log(e)
  })
  },

show: function(req, res, next) {
  let id = req.params.id
  db.Miembro.findByPk(id)
    .then(function(data){
    return res.send(data);
  })
  .catch(function(e){
    console.log(e)
  })
},

    create: function (req,res){
      res.render ('nuevoProceso', {title: "Nuevo Proceso"})
    },
    search: function (req,res){

      let searchTerm = req.query.search
      db.Miembro.findAll({
        where: [{acto: {[op.like]:'%RODRIGUEZ%'}}]
      })
        .then(function(data){
        return res.send(data);

      res.render ('searchResults' , {title: "Resultados de la Busqueda", searchTerm})
      })
      .catch(function(e){
        console.log(e)
      })
    },
  

    store: function (req,res){
      let info = req.body;

      db.Miembro.create()
      .then(function(newProce){
        return res.send(newProce)

      } )
      req.session.lastMovie = info;
      res.cookie('lastMovie', info.title, {maxAge: 1000 * 60 *5 })
      /*return res.send(req.session); */
      return res.redirect('/');
  }
}

module.exports = miembrosController