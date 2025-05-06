let db = require('../database/models');
let op = db.Sequelize.Op;


let ojudsController = {

  index: function(req, res, next) {
    db.Mtos.findAll()
    .then(function(data){
      res.send(data);
    })
    .catch(function(e){
      console.log(e)
    })
  },

  show: function(req, res, next) {
    let id = req.params.id
    db.Mtos.findByPk()
    .then(function(data){
    return res.send(data);
    })
      .catch(function(e){
        console.log(e)
      })
    },

  create: function (req,res){
   
      res.render('nuevoMto', {title: 'nuevo movimiento'})
   
    },


  store: async function (req,res){
    try {
      const newMto = await db.Mtos.create({
        proc: req.body.proc,
        // Add defaults or other fields as needed
      });
      res.status(201).json(newMto); // Returns the full row, including mtoId
    } catch (error) {
      console.error('Error creating mto:', error);
      res.status(500).json({ error: 'Failed to create row' });
    }
  },


  update: function(req, res, next){
    const today = new Date().toISOString();
    db.Mtos.update({
      descripcion: req.body.descripcion, 
      fechaDeRealizacion: req.body.fechaDeRealizacion, 
      realizado: req.body.realizado, 
      texto: req.body.texto, 
      usuario: req.body.usuario,
      cobros_fk: req.body.cobros_fk,
      tipoDeMovimiento: req.body.tipoDeMovimiento,
    }, 
      {where: {mtoId: req.body.id}})
    .then(()=>{ res.send('fijate (update)');})
    .catch(function(e){
      console.error(e);
      res.status(500).send('An error occurred while updating the record');
    })
    }

}


module.exports = ojudsController;
