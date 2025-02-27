let db = require('../database/models');
let op = db.Sequelize.Op;


let procesosController = {

  indexoa: function(req, res, next) {
    db.Proc.findAll({
      where:[{GRUP:'A'}],
      include: [
      {
        model: db.Miembro ,
        as: 'Miembro',
        attributes: ['Iniciales'], 
      }
    ]})
    .then(function(data){
      // return res.send(data);
      let procesosLista = data;
      res.send(procesosLista);
    })

    .catch(function(e){
      console.log(e)
    })
  },

  indexob: function(req, res, next) {
    db.Proc.findAll({
      where:[{GRUP:'B'}],
      include: [
      {
        model: db.Miembro ,
        as: 'Miembro',
        attributes: ['Iniciales'], 
      }
    ]})
    .then(function(data){
      // return res.send(data);
      let procesosLista = data;
      res.send(procesosLista);
    })

    .catch(function(e){
      console.log(e)
    })
  },

  indexoCAP: function(req, res, next) {
    db.Proc.findAll({
      where: [{MIEM: '5yURv4IQaM', AUX7:0}]
    })
    .then(function(data){
      // return res.send(data);
      let procesosLista = data;
      res.send(procesosLista);
    })

    .catch(function(e){
      console.log(e)
    })
  },

  index: function(req, res, next) {
    db.Proc.findAll()

    .then(function(data){
      // return res.send(data);
      let procList = data;
      res.render('procesos', { title: 'PROCESOS', listaProcesos: procList});
    })

    .catch(function(e){
      console.log(e)
    })

    },

    show: function(req, res, next) {
      let id = req.params.id
      db.Proc.findByPk( id
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
      db.Proc.findAll({
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
      let proce = {

    "PROC": "5yURv2fbux",
    "GRUP": "A",
    "TPRO": "5zU3@0007h",
    "ACTO": "RODRIGUEZ MARIO DE LA PRUEBA",
    "DEMA": "PRUEBA COTO C.I.C.S.A. Y OTRO",
    "OBSE": "",
    "CARP": "1349 A",
    "INIC": "20070830",
    "FINA": "",
    "DOCO": "5yURv21ykN",
    "OJUD": "5zU3@0018Y",
    "INST": "1",
    "EXP1": "10.352",
    "EXP2": "",
    "EXP3": "",
    "EXP4": "",
    "SUPE": "1",
    "MIEM": "5yURveG5Sj",
    "AUX1": "",
    "AUX2": "",
    "AUX3": "",
    "AUX4": "",
    "AUX5": "",
    "AUX6": "",
    "AUX7": "0",
    "AUX8": "0",
    "EDIT": ""
  };

      db.Proc.create(proce)
      .then(function(newProce){
        return res.send(newProce)

      } )
      req.session.lastMovie = info;
      res.cookie('lastMovie', info.title, {maxAge: 1000 * 60 *5 })
      /*return res.send(req.session); */
      return res.redirect('/');
  },

  update2: function(req, res, next){
    db.Proc.update({AUX7:1}, {where: {PROC: req.body.PROC}})
    .then(()=>{ res.send('fijate (update 2)');})
    .catch(function(e){
      console.error(e);
      res.status(500).send('An error occurred while updating the record');
    })
    },
  

  archivar: function(req, res, next){
    console.log(req)
    db.Proc.update({GRUP:"B"}, {where: {PROC: req.body.PROC}})
    .then(()=>{ res.send('el siguiente proceso fue archivado: ', req.body.PROC);})
    .catch(function(e){
      console.error(e);
      res.status(500).send('An error occurred while updating the record');
    })
    }
}

//let lista =  db.Proc.findAll();

module.exports = procesosController
//module.exports = lista