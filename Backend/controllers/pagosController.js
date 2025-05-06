const multer = require('multer');
let db = require('../database/models');

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
    db.Pagos.findByPk(id)
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
          pagoLabel: req.body.pagoLabel,
          gastoIdFkEnPagos: req.body.gastoIdFkEnPagos,
          concepto: req.body.concepto,
          importe: parseInt(req.body.importe, 10),
          created_at: Date.now(),
          factura: req.files?.['factura'] ? req.files['factura'][0].path : null,
          documento: req.files?.['documento'] ? req.files['documento'][0].path : null,
          aclaracion: req.body.aclaracion,
          comprobante: req.files?.['comprobante'] ? req.files['comprobante'][0].path : null,
          estado: req.body.estado,
          paga: req.body.paga,
          fechadepago: req.body.fechadepago || null,
          usuario: req.body.usuario,
          proceso: req.body.proceso
        });
  
        console.log('New pago created:', newPago.toJSON());
  
        let message = 'Pago creado exitosamente';
        if (req.body.estado === 'Pagado') {
          let lastRow;
          let saldoAnterior;
          const newRow = {
            created_at: Date.now(),
            usuario: req.body.usuario,
            categoria: req.body.concepto,
            notas: req.body.aclaracion,
            pagos_fk: newPago.pagoId,
            monto: (req.body.importe * (-1)),
            movimiento: req.body.label,
            cobro_pago: 'p',
            movimiento: req.body.pagoLabel
          };
  
          switch (req.body.paga) {
            case '':
              console.log('entra a case de cash');
              lastRow = await db.Caja_cash.findOne({
                order: [['id', 'DESC']],
              });
              saldoAnterior = lastRow ? lastRow.dataValues.saldo : 0;
              await db.Caja_cash.create({
                ...newRow,
                saldo: saldoAnterior + (req.body.importe * (-1)),
              });
              message = 'Cobro actualizado y movimiento de caja cash creado';
              break;
  
            case 'GEO':
              lastRow = await db.Caja_geo.findOne({
                order: [['id', 'DESC']],
              });
              saldoAnterior = lastRow ? lastRow.dataValues.saldo : 0;
              await db.Caja_geo.create({
                ...newRow,
                saldo: saldoAnterior + (req.body.importe * (-1)),
              });
              message = 'Cobro actualizado y movimiento de caja geo creado';
              break;
  
            case 'CAP':
              lastRow = await db.Caja_cap.findOne({
                order: [['id', 'DESC']],
              });
              saldoAnterior = lastRow ? lastRow.dataValues.saldo : 0;
              await db.Caja_cap.create({
                ...newRow,
                saldo: saldoAnterior + (req.body.importe * (-1)),
              });
              message = 'Cobro actualizado y movimiento de caja cap creado';
              break;
  
            case 'IS':
              lastRow = await db.Caja_is.findOne({
                order: [['id', 'DESC']],
              });
              saldoAnterior = lastRow ? lastRow.dataValues.saldo : 0;
              await db.Caja_is.create({
                ...newRow,
                saldo: saldoAnterior + (req.body.importe * (-1)),
              });
              message = 'Cobro actualizado y movimiento de caja IS creado';
              break;
  
            case 'ISV':
              lastRow = await db.Caja_isv.findOne({
                order: [['id', 'DESC']],
              });
              saldoAnterior = lastRow ? lastRow.dataValues.saldo : 0;
              await db.Caja_isv.create({
                ...newRow,
                saldo: saldoAnterior + (req.body.importe * (-1)),
              });
              message = 'Cobro actualizado y movimiento de caja isv creado';
              break;
  
            case 'LA':
              lastRow = await db.Caja_la.findOne({
                order: [['id', 'DESC']],
              });
              saldoAnterior = lastRow ? lastRow.dataValues.saldo : 0;
              await db.Caja_la.create({
                ...newRow,
              saldo: saldoAnterior + (req.body.importe * (-1)),
              });
              message = 'Cobro actualizado y movimiento de caja la creado';
              break;
  
            case 'SAG':
              lastRow = await db.Caja_sag.findOne({
                order: [['id', 'DESC']],
              });
              saldoAnterior = lastRow ? lastRow.dataValues.saldo : 0;
              await db.Caja_sag.create({
                ...newRow,
              saldo: saldoAnterior + (req.body.importe * (-1)),
              });
              message = 'Cobro actualizado y movimiento de caja sag creado';
              break;
  
            case 'MVP':
              lastRow = await db.Caja_mvp.findOne({
                order: [['id', 'DESC']],
              });
              saldoAnterior = lastRow ? lastRow.dataValues.saldo : 0;
              await db.Caja_mvp.create({
                ...newRow,
                saldo: saldoAnterior + (req.body.importe * (-1)),
              });
              message = 'Cobro actualizado y movimiento de caja mvp creado';
              break;
  
            case 'ZCC':
              lastRow = await db.Caja_zcc.findOne({
                order: [['id', 'DESC']],
              });
              saldoAnterior = lastRow ? lastRow.dataValues.saldo : 0;
              await db.Caja_zcc.create({
                ...newRow,
              saldo: saldoAnterior + (req.body.importe * (-1)),
              });
              message = 'Pago actualizado y movimiento de caja zcc creado';
              break;
  
            default:
              message = 'Pago actualizado pero caja no reconocida';
              break;
          }
        }
  
        // Send a single response
        res.status(201).json({
          pagoId: newPago.pagoId,
          message
        });
  
      } catch (error) {
        console.error('Error creating pago:', error);
        res.status(500).json({ error: 'Error creating pago' });
      }
    });
  },

  update: async function (req, res, next) {

    try {
      const { id } = req.params;
      const  estado  = req.body.estado;
      const comprobante = req.file;
      const updateData =  estado ;

      console.log('id', id)
      console.log('estado ', estado)


      if (comprobante) {
        updateData.comprobante = comprobante.path; // Store file path or URL
      }
  
      const [updated] = await db.Pagos.update(
        updateData,
        { where: { pagoId: id } }
      );
  
      if (!updated) {
        return res.status(404).send('pago not found');
      }
  
      let message = 'Pago actualizado';
  
      if (estado === 'Pagado') {

        const newRow = {
          created_at: Date.now(),
          usuario: req.body.usuario,
          categoria: req.body.concepto,
          notas: req.body.aclaracion,
          pagos_fk: id,
          monto: (req.body.importe * (-1)),
          movimiento: req.body.label,
          cobro_pago: 'p',
          movimiento: req.body.pagoLabel,
          proceso: req.body.proceso
        };

        lastRow = await db.Caja_zcc.findOne({
          order: [['id', 'DESC']],
        });
        saldoAnterior = lastRow ? lastRow.dataValues.saldo : 0;
        await db.Caja_zcc.create({
          ...newRow,
        saldo: saldoAnterior + (req.body.importe * (-1)),
        });
        message = 'Pago actualizado y movimiento de caja zcc creado';

        const mto = req.body.mtos_fk;
        const RefMto = await db.Mtos.findByPk(mto);
        const usuario = req.body.usuario;
        if (RefMto) {
          const today = new Date();
          const formattedDate = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear().toString().slice(-2)} ${today.getHours().toString().padStart(2, '0')}:${today.getMinutes().toString().padStart(2, '0')}`;
          const newDescripcion = `${RefMto.descripcion} / COBRADO: ${formattedDate} / por ${usuario}`;

          
          await db.Mtos.update(
            { descripcion: newDescripcion },
            { where: { mtoId: mto } }
          );
        }
      }
      res.send(message);
    } catch (error) {
      console.error('Error updating cobro:', error);
      res.status(500).send('An error occurred while updating the record');
    }
  },

  update2: async (req, res) => {

    const { id } = req.params;
    const comprobante = req.file; 

    console.log("Received pagoId:", id);
    console.log("Received estado:", req.body.estado);
    console.log('req.body: ', req.body)
    console.log("Received comprobante:", comprobante);

    upload(req, res, async (err) => {
      if (err) {
        console.error('Multer error:', err);
        return res.status(500).json({ error: 'File upload failed' });
      }
  
      try {
        const newPago = await db.Pagos.update({
          comprobante: req.files?.['comprobante'] ? req.files['comprobante'][0].path : null,
          estado: req.body.estado
        },
        { where: { pagoId: id } }
      );
  
        console.log('Pago updated:', newPago);
  
        let message = 'Pago creado exitosamente';

         if (req.body.estado === 'Pagado') {
          let lastRow;
          let saldoAnterior;
          const newRow = {
            created_at: Date.now(),
            usuario: req.body.usuario,
            categoria: req.body.concepto,
            notas: req.body.aclaracion,
            pagos_fk: newPago.pagoId,
            monto: (req.body.importe * (-1)),
            movimiento: req.body.pagoLabel,
            cobro_pago: 'p',
            movimiento: req.body.pagoLabel
          };
  
          switch (req.body.paga) {
            case '':
              console.log('entra a case de cash');
              lastRow = await db.Caja_cash.findOne({
                order: [['id', 'DESC']],
              });
              saldoAnterior = lastRow ? lastRow.dataValues.saldo : 0;
              await db.Caja_cash.create({
                ...newRow,
                saldo: saldoAnterior + (req.body.importe * (-1)),
              });
              message = 'Cobro actualizado y movimiento de caja cash creado';
              break;
  
            case 'GEO':
              lastRow = await db.Caja_geo.findOne({
                order: [['id', 'DESC']],
              });
              saldoAnterior = lastRow ? lastRow.dataValues.saldo : 0;
              await db.Caja_geo.create({
                ...newRow,
                saldo: saldoAnterior + (req.body.importe * (-1)),
              });
              message = 'Cobro actualizado y movimiento de caja geo creado';
              break;
  
            case 'CAP':
              lastRow = await db.Caja_cap.findOne({
                order: [['id', 'DESC']],
              });
              saldoAnterior = lastRow ? lastRow.dataValues.saldo : 0;
              await db.Caja_cap.create({
                ...newRow,
                saldo: saldoAnterior + (req.body.importe * (-1)),
              });
              message = 'Cobro actualizado y movimiento de caja cap creado';
              break;
  
            case 'IS':
              lastRow = await db.Caja_is.findOne({
                order: [['id', 'DESC']],
              });
              saldoAnterior = lastRow ? lastRow.dataValues.saldo : 0;
              await db.Caja_is.create({
                ...newRow,
                saldo: saldoAnterior + (req.body.importe * (-1)),
              });
              message = 'Cobro actualizado y movimiento de caja IS creado';
              break;
  
            case 'ISV':
              lastRow = await db.Caja_isv.findOne({
                order: [['id', 'DESC']],
              });
              saldoAnterior = lastRow ? lastRow.dataValues.saldo : 0;
              await db.Caja_isv.create({
                ...newRow,
                saldo: saldoAnterior + (req.body.importe * (-1)),
              });
              message = 'Cobro actualizado y movimiento de caja isv creado';
              break;
  
            case 'LA':
              lastRow = await db.Caja_la.findOne({
                order: [['id', 'DESC']],
              });
              saldoAnterior = lastRow ? lastRow.dataValues.saldo : 0;
              await db.Caja_la.create({
                ...newRow,
              saldo: saldoAnterior + (req.body.importe * (-1)),
              });
              message = 'Cobro actualizado y movimiento de caja la creado';
              break;
  
            case 'SAG':
              lastRow = await db.Caja_sag.findOne({
                order: [['id', 'DESC']],
              });
              saldoAnterior = lastRow ? lastRow.dataValues.saldo : 0;
              await db.Caja_sag.create({
                ...newRow,
              saldo: saldoAnterior + (req.body.importe * (-1)),
              });
              message = 'Cobro actualizado y movimiento de caja sag creado';
              break;
  
            case 'MVP':
              lastRow = await db.Caja_mvp.findOne({
                order: [['id', 'DESC']],
              });
              saldoAnterior = lastRow ? lastRow.dataValues.saldo : 0;
              await db.Caja_mvp.create({
                ...newRow,
                saldo: saldoAnterior + (req.body.importe * (-1)),
              });
              message = 'Cobro actualizado y movimiento de caja mvp creado';
              break;
  
            case 'ZCC':
              lastRow = await db.Caja_zcc.findOne({
                order: [['id', 'DESC']],
              });
              saldoAnterior = lastRow ? lastRow.dataValues.saldo : 0;
              await db.Caja_zcc.create({
                ...newRow,
              saldo: saldoAnterior + (req.body.importe * (-1)),
              });
              message = 'Pago actualizado y movimiento de caja zcc creado';
              break;
  
            default:
              message = 'Pago actualizado pero caja no reconocida';
              break;
          }
        } 
        // Send a single response
       res.status(201).json({
          pagoId: newPago.pagoId,
          message
        });
  
      } catch (error) {
        console.error('Error creating pago:', error);
        res.status(500).json({ error: 'Error creating pago' });
      }
    });
  },

    // viejo upload2 hecho por copilot
  
  /* update2: async function (req, res, next) {
  try {
    const { id } = req.params;  // Fix: Retrieve ID correctly
    const estado = req.body.estado; // Fix: Estado was undefined due to FormData
    const comprobante = req.file; 

    console.log("Received pagoId:", id);
    console.log("Received estado:", estado);
    console.log("Received comprobante:", comprobante);

    if (!id || !estado) {
      return res.status(400).json({ error: "Missing pagoId or estado" });
    }

    const updateData = { estado };

    if (comprobante) {
      updateData.comprobante = comprobante.path; // Save file path if exists
    }

    const [updated] = await db.Pagos.update(updateData, { where: { pagoId: id } });

    if (!updated) {
      return res.status(404).json({ error: "Pago not found" });
    }

    res.status(200).json({ message: "Pago updated successfully" });
  } catch (error) {
    console.error("Error updating pago:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}, */

  usuario: function(req, res, next) {
    let usuario = req.params.usuario
    db.Pagos.findAll(
      {where: {paga : usuario}}
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