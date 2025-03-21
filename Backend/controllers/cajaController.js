let db = require('../database/models');
let op = db.Sequelize.Op;

let cajaController = {

cajajson: function(req, res, next) {
  db.Caja.findAll()
  .then(function(data){
    console.log(data)
    let jsoncaja = data;
   return res.send(jsoncaja);
  })
  .catch(function(e){
    console.log(e)
  })
},

index: function(req, res, next) {
  db.Caja.findAll()
  .then(function(data){
    return res.send(data);
  })
  .catch(function(e){
    console.log(e)
  })
},

show: function(req, res, next) {
  let id = req.params.id
  db.Caja.findByPk( id)
    .then(function(data){
      res.send(data);
  })
  .catch(function(e){
    console.log(e)
  })
},

create: function (req,res){
  then(
  )
  .catch(function(e){
    console.log(e)
  })
},

search: function (req,res){
  let searchTerm = req.query.search
  db.Caja.findAll()
    .then(function(data){
    return res.send(data);
  })
  .catch(function(e){
    console.log(e)
  })
},

store: function (req,res){
  db.Caja.create(req.body)
  .then(()=>{ res.send('movimiento de caja creado: ', req.body);})
  .catch(function(e){
    console.error(e);
    res.status(500).send('Error al crear row en caja');
  })
},

update: function(req, res, next){
  db.Caja.update({AUX7:1}, {where: {PROC: req.body.PROC}})
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

module.exports = cajaController