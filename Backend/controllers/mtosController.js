let db = require('../database/models');
let op = db.Sequelize.Op;

let jsonDeAyer = 
[


]


let mtosController = {

  indexo: function(req, res, next) {
    db.Mtos.findAll(
      {

        include: [{
          model: db.Proc,
          attributes: ['ACTO', 'DEMA'], 
        },
        {
          model: db.Miembro,
          attributes: ['Iniciales'], 
        }
      ],
      }
    )
    .then(function(data){
      data.sort((a, b) => {
        if (a.Proc.ACTO < b.Proc.ACTO) return -1;
        if (a.Proc.ACTO > b.Proc.ACTO) return 1;
        return 0;
      });
       return res.send(data);
    })
    .catch(function(e){
      console.log(e)
    })
  },

  pendientes: function(req, res, next) {
    db.Mtos.findAll(
      {
        where: {realizado: 0},
        include: [{
          model: db.Proc,
          attributes: ['ACTO', 'DEMA'], 
        },
        {
          model: db.Miembro,
          attributes: ['Iniciales'], 
        }
      ],
      }  
    )
    .then(function(data){
      data.sort((a, b) => {
        if (a.Proc.ACTO < b.Proc.ACTO) return -1;
        if (a.Proc.ACTO > b.Proc.ACTO) return 1;
        return 0;
      });
       return res.send(data);
    })
    .catch(function(e){
      console.log(e)
    })
  },

  indexe: function(req, res, next) {
    db.Mtos.findAll(
      {
        where: {
          proc: req.params.proc,
        },
        include: [{
          model: db.Proc,
          attributes: ['ACTO', 'DEMA'], 
        },
        {
          model: db.Miembro,
          attributes: ['Iniciales'], 
        }
      ],
      }
    )
    .then(function(data){
      /* hay que ordenar todos los movimientos por fecha descendiente 
        data.sort((a, b) => {
        if (a.Proc.ACTO < b.Proc.ACTO) return -1;
        if (a.Proc.ACTO > b.Proc.ACTO) return 1;
        return 0;
      }); */
       return res.send(data);
    })
    .catch(function(e){
      console.log(e)
    })
  },

  index: function(req, res, next) {
    db.Mtos.findAll()
    .then(function(data){
      let mtosList = data;
      res.render('mtos', {title: "Movimientos", listaMtos: data});
    })
    .catch(function(e){
      console.log(e)
    })
  },

  show: function(req, res, next) {
    let id = req.params.id
    db.Mtos.findByPk(id,
      {
        include: [{
          model: db.Proc,
          attributes: ['ACTO', 'DEMA', ], 
        },
        {
          model: db.Miembro,
          attributes: ['Iniciales'], 
        }
      ],
      }
  
     )
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
    },

  update2: function(req, res, next){
      const today = new Date().toISOString();
      db.Mtos.update({descripcion:"Done!", fechaDeRealizacion: today}, {where: {mtoId: req.body.id}})
      .then(()=>{ res.send('fijate (update 2)');})
      .catch(function(e){
        console.error(e);
        res.status(500).send('An error occurred while updating the record');
      })
      },

    cargaJson: function(req, res, next){

      const loadData = async (jsonData) => {

        if (!Array.isArray(jsonData)) {
          console.error('Invalid data format: jsonData is not an array.');
          return;
      }

        try {
            for (let obj of jsonData) {
                await db.Mtos.create(obj);
            }
            console.log('Data successfully loaded!');
        } catch (error) {
            console.error('Error loading data:', error);
        }
    };

    loadData(jsonDeAyer)

      db.Mtos.update({descripcion:"Done!", fechaDeRealizacion: today}, {where: {mtoId: 's'}})
      .then(()=>{ res.send('carga json mtos ok');})
      .catch(function(e){
        console.error(e);
        res.status(500).send('An error occurred while updating the record');
      })
    },

  byDate: function(req, res, next) {
    const { date } = req.query; // Expect date as a query param, e.g., ?date=2025-02-24
    if (!date) {
      return res.status(400).send({ error: 'Date parameter is required' });
    }

    // Assuming the date column in mtos is called 'fecha' (adjust if different)
    db.Mtos.findAll({
      where: {
        // Use Sequelize Op to match only the date part
        fecha: {
          [db.Sequelize.Op.between]: [
            `${date} 00:00:00`, // Start of the day
            `${date} 23:59:59`, // End of the day
          ],
        },
      },
      include: [
        {
          model: db.Proc,
          attributes: ['ACTO', 'DEMA', 'MIEM'],
          include: [
            {
              model: db.Miembro, // Nested include for Miembro
              attributes: ['Iniciales'], // Only fetch 'Iniciales'
            },
          ]
        },
      ],
    })
      .then(function(data) {
        data.sort((a, b) => {
          if (a.Proc.ACTO < b.Proc.ACTO) return -1;
          if (a.Proc.ACTO > b.Proc.ACTO) return 1;
          return 0;
        },
      );
      console.log(data)
      let listaMtos = data;
      res.render('mtosBydate', { title: `MOVIMIENTOS ${date}`, listaMtos});

//        return res.send(data);

      })
      .catch(function(e) {
        console.log(e);
        return res.status(500).send({ error: 'Server error' });
      });
  }
}


module.exports = mtosController
