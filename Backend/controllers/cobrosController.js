let db = require('../database/models');
let op = db.Sequelize.Op;

let cobrosController = {

  index: function(req, res, next) {
    db.Cobros.findAll()
    .then(function(data){
        return res.send(data);
    })
    .catch(function(e){
      console.log(e)
    })
  },

  show: function(req, res, next) {
    let id = req.params.id
    db.Cobros.findByPk( id)
      .then(function(data){
        res.send(data);
    })
    .catch(function(e){
      console.log(e)
    })
  },

  create: function (req,res){
    then(
    res.render ('nuevoProceso', {title: "Nuevo Proceso"})
    )
    .catch(function(e){
      console.log(e)
    })
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

  store: async function (req,res){
    try{
    const newCobro = await db.Cobros.create(req.body);
    console.log('New cobro created:', newCobro.toJSON());
    res.status(201).json(newCobro.cobro_id)}
    catch(error){
      console.log(error)
    }
  },

  update: function(req, res, next){
    db.Cobros.update({where: {cobro_id: req.body.cobro_id}})
    .then(()=>{ res.send('fijate update');})
    .catch(function(e){
      console.error(e);
      res.status(500).send('An error occurred while updating the record');
    })
  },

}

module.exports = cobrosController