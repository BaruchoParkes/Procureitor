let db = require('../database/models');
let op = db.Sequelize.Op;

let tMtosController = {

  index: function(req, res, next) {

    db.tEstado.findAll()
    .then(function(data){
      res.send(data)
    })
    .catch(function(e){
      console.log(e)
    })
  },

  show: function(req, res, next) {
    let id = req.params.id
    db.Proc.findByPk('5yURv2KkyZ',     
    {include: [{association: 'Miembro' },
    {association: 'Mtos' }
    ]}
  
  )
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


  mtos: function(req, res, next) {

    db.Mto.findAll()
    .then(function(data){
      // return res.send(data);
      let movList = data;
      res.render('movimientos', { title: 'Movimientos', listaMovimientos: movList});
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
  }
}


module.exports = tMtosController