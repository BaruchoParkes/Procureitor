let db = require('../database/models');
let op = db.Sequelize.Op;


let procEstM2mController = {

  indexo: function(req, res, next) {
    db.procEstM2m.findAll()
  },

  index: function(req, res, next) {
    db.ProcEstM2m.findAll()
    .then(function(data){
      // return res.send(data);
      let procList = data;
      res.send(procList);
    })
    .catch(function(e){
      console.log(e)
    })},

  show: function(req, res, next) {
    let proc = req.params.proc
    db.ProcEstM2m.findAll({
      where: [{procIdFk: proc}]
    }
    /* , 
    {include: [{association: 'Miembro' },
    {association: 'Mtos' }
    ]} */
    )
    .then(function(data){
      const tipoEstadoIdFkValues = data.map(item => item.tipoEstadoIdFk);
      res.send(tipoEstadoIdFkValues);
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
    db.procEstM2m.findAll({
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
    console.log(info)
    db.ProcEstM2m.create({
      procIdFk: req.body.proc ,
      tipoEstadoIdFk: req.body.estado,
    })
    .then(function(mto){
    res.send(mto)
    } )
    .catch(function(e){
       console.log(e)
    })     
  }
}

module.exports = procEstM2mController