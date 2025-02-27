let db = require('../database/models');
let op = db.Sequelize.Op;


let resumenesController = {


    index: function(req, res, next) {

      db.Resumenes.findAll()

      .then(function(data){
        // return res.send(data);
        let procList = data;
        res.render('procesos', { title: 'PROCESOS  2', listaProcesos: procList});
      })

      .catch(function(e){
        console.log(e)
      })

      },

    show: function(req, res, next) {
      let id = req.params.id
      db.Resumenes.findByPk( id
      /* , 
      {include: [{association: 'Miembro' },
      {association: 'Mtos' }
      ]} */

      )
        .then(function(data){
         res.send(data);
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
      db.Resumenes.findAll({
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
  
    update: function(req, res, next){
      db.Resumenes.update({ resumen: req.body.resumenes}, {where: {id: req.body.id}})
      .then(()=>{ res.send('fijate (update)');})
      .catch(function(e){
        console.error(e);
        res.status(500).send('An error occurred while updating the record');
      })
      },

    store: function (req,res){
      let info = req.body;

      db.Resumenes.create(proce)
      .then(function(newProce){
        return res.send(newProce)

      } )
      req.session.lastMovie = info;
      res.cookie('lastMovie', info.title, {maxAge: 1000 * 60 *5 })
      /*return res.send(req.session); */
      return res.redirect('/');
  }
}

module.exports = resumenesController
