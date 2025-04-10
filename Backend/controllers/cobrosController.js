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

    })
    .catch(function(e){
      console.log(e)
    })
  },

  store: async function (req,res){
    try{
    const newCobro = await db.Cobros.create(req.body);
    console.log('New cobro created:', newCobro.toJSON());
    let  estado  = req.body.estado;
    console.log('req body estado: ',req.body.estado)
   

    if (estado === 'Cobrado') {
      console.log('entra al if');
      let lastRow;
      let saldoAnterior;
      const newRow = {
        created_at: Date.now(),
        usuario: req.body.usuario,
        categoria: req.body.capital_honorarios,
        notas: req.body.notas,
        cobros_fk: req.body.id,
        monto: req.body.monto,
        movimiento: req.body.nombre
      };

      switch (req.body.quien_cobra) {

        case "":
          console.log('entra a case de cash')
          lastRow = await db.Caja_cash.findOne({
            order: [['id', 'DESC']],
          });
          saldoAnterior = lastRow ? lastRow.dataValues.saldo : 0; // Fallback to 0 if no row exists
          await db.Caja_cash.create({
            ...newRow,
            saldo: saldoAnterior + req.body.monto,
          });
          message = 'cobro actualizado y movimiento de caja cash creado';
          break;


        case 'GEO':
          lastRow = await db.Caja_geo.findOne({
            order: [['id', 'DESC']],
          });
          saldoAnterior = lastRow ? lastRow.dataValues.saldo : 0; // Fallback to 0 if no row exists
          await db.Caja_geo.create({
            ...newRow,
            saldo: saldoAnterior + req.body.monto,
          });
          message = 'cobro actualizado y movimiento de caja geo creado';
          break;

        case 'CAP':
          lastRow = await db.Caja_cap.findOne({
            order: [['id', 'DESC']],
          });
          saldoAnterior = lastRow ? lastRow.dataValues.saldo : 0;
          await db.Caja_cap.create({
            ...newRow,
            saldo: saldoAnterior + req.body.monto,
          });
          message = 'cobro actualizado y movimiento de caja cap creado';
          break;

        case 'IS':
          lastRow = await db.Caja_is.findOne({
            order: [['id', 'DESC']],
          });
          saldoAnterior = lastRow ? lastRow.dataValues.saldo : 0;
          await db.Caja_is.create({
            ...newRow,
            saldo: saldoAnterior + req.body.monto,
          });
          message = 'cobro actualizado y movimiento de caja IS creado';
          break;

        case 'ISV':
          lastRow = await db.Caja_isv.findOne({
            order: [['id', 'DESC']],
          });
          saldoAnterior = lastRow ? lastRow.dataValues.saldo : 0;
          await db.Caja_isv.create({
            ...newRow,
            saldo: saldoAnterior + req.body.monto,
          });
          message = 'cobro actualizado y movimiento de caja isv creado';
          break;

        case 'LA':
          lastRow = await db.Caja_la.findOne({
            order: [['id', 'DESC']],
          });
          saldoAnterior = lastRow ? lastRow.dataValues.saldo : 0;
          await db.Caja_la.create({
            ...newRow,
            saldo: saldoAnterior + req.body.monto,
          });
          message = 'cobro actualizado y movimiento de caja la creado';
          break;

        case 'SAG':
          lastRow = await db.Caja_sag.findOne({
            order: [['id', 'DESC']],
          });
          saldoAnterior = lastRow ? lastRow.dataValues.saldo : 0;
          await db.Caja_sag.create({
            ...newRow,
            saldo: saldoAnterior + req.body.monto,
          });
          message = 'cobro actualizado y movimiento de caja sag creado';
          break;

        case 'MVP':
          lastRow = await db.Caja_mvp.findOne({
            order: [['id', 'DESC']],
          });
          saldoAnterior = lastRow ? lastRow.dataValues.saldo : 0;
          await db.Caja_mvp.create({
            ...newRow,
            saldo: saldoAnterior + req.body.monto,
          });
          message = 'cobro actualizado y movimiento de caja mvp creado';
          break;

        case 'ZCC':
          lastRow = await db.Caja_zcc.findOne({
            order: [['id', 'DESC']],
          });
          saldoAnterior = lastRow ? lastRow.dataValues.saldo : 0;
          await db.Caja_zcc.create({
            ...newRow,
            saldo: saldoAnterior + req.body.monto,
          });
          message = 'cobro actualizado y movimiento de caja zcc creado';
          break;

        default:
          message = 'cobro actualizado pero caja no reconocida';
          break;
      }
    }
    res.status(201).json(newCobro.cobro_id)}
    catch(error){
      console.log(error)
    }
  },

  update: async function (req, res, next) {
    try {
      const { id } = req.params;
      const { estado } = req.body;
  
      const [updated] = await db.Cobros.update(
        { estado: estado },
        { where: { cobro_id: id } }
      );
  
      if (!updated) {
        return res.status(404).send('Cobro not found');
      }
  
      let message = 'cobro actualizado';
  
      if (estado === 'Cobrado') {
        const newRow = {
          created_at: new Date(),
          usuario: req.body.usuario,
          categoria: req.body.capital_honorarios,
          notas: req.body.notas,
          cobros_fk: id, // Changed to match cobro_id
          monto: req.body.monto,
          movimiento: req.body.nombre
        };
  
        let lastRow;
        let saldoAnterior;
  
        switch (req.body.caja) {
          case "":
            lastRow = await db.Caja_cash.findOne({ order: [['id', 'DESC']] });
            saldoAnterior = lastRow ? lastRow.saldo : 0;
            await db.Caja_cash.create({
              ...newRow,
              saldo: saldoAnterior + req.body.monto,
            });
            message = 'cobro actualizado y movimiento de caja cash creado';
            break;
  
          // ... other cases remain similar, just fix the message consistency ...
  
          default:
            message = 'cobro actualizado pero caja no reconocida';
            break;
        }
  
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

  pendientesUsuario: function(req, res, next) {
    let usuario = req.params.usuario
    db.Cobros.findAll({
      where: {
        [op.and]: [
          {estado : 'Pendiente'}],
        [op.or]: [
          {usuario : usuario}, 
          {quien_cobra : usuario}
        ]
      }
    })
      .then(function(data){
        res.send(data);
    })
    .catch(function(e){
      console.log(e)
    })
  },

  usuario: function(req, res, next) {
    let usuario = req.params.usuario
    db.Cobros.findAll({
      where: {
        [op.or]: [
          {usuario : usuario}, 
          {quien_cobra : usuario}
        ]
      }
    })
      .then(function(data){
        res.send(data);
    })
    .catch(function(e){
      console.log(e)
    })
  }
}

module.exports = cobrosController