let db = require('../database/models');
let op = db.Sequelize.Op;

let cajaController = {

  cajajson: function(req, res, next) {
    db.Caja.findAll()
    .then(function(data){
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
    db.Caja.findByPk(id)
      .then(function(data){
        res.send(data);
    })
    .catch(function(e){
      console.log(e)
    })
  },

  create: function (req,res){
    then()
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

  store: async function (req,res){
    
    const lastRow = await db.Caja.findOne({
      order: [['cajaID', 'DESC']] // Replace 'id' with the relevant column for ordering.
    });

    console.log('last row: ', lastRow)
    console.log('req.body: ', req.body)

    let caja_del_pago = 'caja_'+req.body.caja
    caja_del_pago = caja_del_pago.toString()
    console.log(caja_del_pago)


    // Iterate and update value

const keyToUpdate = caja_del_pago;
let newValue; // Replace with 'YYYY'

if (req.body.caja == '')
{
  lastRow.dataValues.caja_cash = lastRow.dataValues.caja_cash + req.body.monto; 
}
else {
  Object.keys(lastRow.dataValues).forEach(key => {
    console.log(key)
    if (key === caja_del_pago) {
      lastRow.dataValues[key] = lastRow.dataValues[key] + req.body.monto;
      console.log('last row key ',lastRow.dataValues[key])
    }
  });
}
    const newRow = {...req.body, 
      saldo: lastRow.saldo + req.body.monto,
    }
      console.log(newRow)
    db.Caja.create(newRow)
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
    db.Proc.update({GRUP:"B"}, {where: {PROC: req.body.PROC}})
    .then(()=>{ res.send('el siguiente proceso fue archivado: ', req.body.PROC);})
    .catch(function(e){
      console.error(e);
      res.status(500).send('An error occurred while updating the record');
    })
  },

  usuario: function(req, res, next) {
    let usuario = req.params.usuario
    db.Caja.findAll({where: {caja : usuario}, 
      attributes: ['nombre', `CAJA_${usuario}`, ]}
    )
      .then(function(data){
        res.send(data);
    })
    .catch(function(e){
      console.log(e)
    })
  },

  cash: function(req, res, next) {
    db.Caja_cash.findAll()
      .then(function(data){
        res.send(data);
    })
    .catch(function(e){
      console.log(e)
    })
  },

  cap: function(req, res, next) {
    db.Caja_cap.findAll()
      .then(function(data){
        res.send(data);
    })
    .catch(function(e){
      console.log(e)
    })
  },

  geo: function(req, res, next) {
    db.Caja_geo.findAll()
      .then(function(data){
        res.send(data);
    })
    .catch(function(e){
      console.log(e)
    })
  },

  is: function(req, res, next) {
    db.Caja_is.findAll()
      .then(function(data){
        res.send(data);
    })
    .catch(function(e){
      console.log(e)
    })
  },

  isv: function(req, res, next) {
    db.Caja_isv.findAll()
      .then(function(data){
        res.send(data);
    })
    .catch(function(e){
      console.log(e)
    })
  },

  sag: function(req, res, next) {
    db.Caja_sag.findAll()
      .then(function(data){
        res.send(data);
    })
    .catch(function(e){
      console.log(e)
    })
  },

  mvp: function(req, res, next) {
    db.Caja_mvp.findAll()
      .then(function(data){
        res.send(data);
    })
    .catch(function(e){
      console.log(e)
    })
  },

  zcc: function(req, res, next) {
    db.Caja_zcc.findAll()
      .then(function(data){
        res.send(data);
    })
    .catch(function(e){
      console.log(e)
    })
  },

  la: function(req, res, next) {
    db.Caja_la.findAll()
      .then(function(data){
        res.send(data);
    })
    .catch(function(e){
      console.log(e)
    })
  },

  sucesion: function(req, res, next) {
    db.Caja_sucesion.findAll()
      .then(function(data){
        res.send(data);
    })
    .catch(function(e){
      console.log(e)
    })
  },





}

module.exports = cajaController