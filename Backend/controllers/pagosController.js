const multer = require('multer');
const path = require('path');
const db = require('../database/models');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files to uploads/ folder
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    cb(null, `${timestamp}-${file.originalname}`); // e.g., "1710691200000-factura.jpg"
  }
});

const upload = multer({ storage }).fields([
  { name: 'factura', maxCount: 1 },
  { name: 'documento', maxCount: 1 },
  { name: 'comprobante', maxCount: 1 }
]);

const pagosController = {

index: function(req, res, next) {
  db.Pagos.findAll()
  .then(function(data){
      return res.send(data); 
  })
  .catch(function(e){
    console.log(e)
  })
},

show: function(req, res, next) {
  let id = req.params.id
  db.Pagos.findByPk( id)
    .then(function(data){
      res.send(data);
  })
  .catch(function(e){
    console.log(e)
  })
},

  store: async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        console.error('Multer error:', err);
        return res.status(500).json({ error: 'File upload failed' });
      }

      try {
        const newPago = await db.Pagos.create({
          pagoLabel: req.body.pagoLabel || `${req.body.concepto} - ${req.body.fechadepago}`,
          gastoIdFkEnPagos: req.body.gastoIdFkEnPagos,
          concepto: req.body.concepto,
          importe: parseInt(req.body.importe, 10),
          fechaDeCarga: req.body.fechaDeCarga,
          factura: req.files?.['factura'] ? req.files['factura'][0].path : null,
          documento: req.files?.['documento'] ? req.files['documento'][0].path : null,
          aclaracion: req.body.aclaracion,
          comprobante: req.files?.['comprobante'] ? req.files['comprobante'][0].path : null,
          estado: req.body.estado,
          paga: req.body.paga,
          fechadepago: req.body.fechadepago || null,
          usuario: req.body.usuario
        });
        console.log('New pago created:', newPago.toJSON());
        res.status(201).json(newPago.pagoId);
      } catch (error) {
        console.error('Error creating pago:', error);
        res.status(500).json({ error: 'Error creating pago' });
      }
    });
  },

  update: function(req, res, next){
    db.Pagos.update({where: {cobro_id: req.body.cobro_id}})
    .then(()=>{ res.send('fijate update');})
    .catch(function(e){
      console.error(e);
      res.status(500).send('An error occurred while updating the record');
    })
  },

  usuario: function(req, res, next) {
    let usuario = req.params.usuario
    db.Pagos.findAll({where: {paga : usuario}}
    )
      .then(function(data){
        res.send(data);
    })
    .catch(function(e){
      console.log(e)
    })
  }
  
};

module.exports = pagosController;