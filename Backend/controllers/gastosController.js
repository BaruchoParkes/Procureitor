let db = require('../database/models');
let op = db.Sequelize.Op;

let gastosController = {

index: function(req, res, next) {
  db.Gastos.findAll()
  .then(function(data){
    res.send(data);
  })
  .catch(function(e){
    console.log(e)
  })
},

usuarios: function(req, res, next) {
  db.Gastos.findAll(
    {where : {usuario : 1}}
  )
  .then(function(data){
    res.send(data);
  })
  .catch(function(e){
    console.log(e)
  })
},

show: function(req, res, next) {
  let id = req.params.id
  db.Gastos.findByPk( id
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
  res.render ('nuevoGastoseso', {title: "Nuevo Gastoseso"})
},

search: function (req,res){
  let searchTerm = req.query.search
  db.Gastos.findAll({
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
};

module.exports = gastosController