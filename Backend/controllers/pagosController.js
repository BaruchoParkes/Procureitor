let db = require('../database/models');
let op = db.Sequelize.Op;
const { v4: uuidv4 } = require('uuid');


let pagosController = {
  
  index: function(req, res, next) {
    db.Pagos.findAll()
    .then(function(data){
      
      res.send(data);
    })
    .catch(function(e){
      console.log(e)
    })
  },

  index100: function(req, res, next) {
    db.Pagos.findAll({ limit: 100, order: [['fechaDeCarga', 'DESC']] })
    .then(function(data){      
      res.send(data);
    })
    .catch(function(e){
      console.log(e)
    })
  },

  show: function(req, res, next) {
    let id = req.params.id
    db.Pagos.findByPk(id)
      .then(function(data){
        res.send(data);
    })
    .catch(function(e){
      console.log(e)
    })
  },

  search: function (req,res){
    let searchTerm = req.query.search
    db.Pagos.findAll({
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

  create: function (req,res){
    res.render ('nuevoPago', {title: "Nuevo Pago"})
  },

  store: function (req,res){
    let info = req.body;
    console.log(info)
    const newId = uuidv4();
    const today = new Date().toISOString();
    db.Pagos.create({
      pagoId: newId, 
      pagoLabel: req.body.pagoLabel,
      gastoIdFkEnPagos: req.body.gastoIdFkEnPagos,
      concepto: req.body.concepto,
      importe: req.body.importe,
      fechaDeCarga: today,
      factura: req.body.factura,
      documento: req.body.documento,
      aclaracion: req.body.aclaracion,
      comprobante: req.body.comprobante,
      estado: req.body.estado,
      paga: req.body.paga,
      fechadepago: req.body.fechadepago
    })
    .then(function(mto){
    res.send(mto)
    } )
    .catch(function(e){
       console.log(e)
    })     
  },


  update: function (req,res){
    let info = req.body;
    db.Pagos.create(proce)
  .then(function(newProce){
    return res.send(newProce)
  })
    return res.redirect('/');
}};


module.exports = pagosController