let db = require('../database/models');
let op = db.Sequelize.Op;


let adpController = {

    index: function(req, res, next) {

      db.ADP.findAll()
      .then(function(data){
        // return res.send(data);
        let adpList = data;
        res.render('adp', { title: 'adp', listaADP: adpList});
      })
      .catch(function(e){
        console.log(e)
      })
      },

    show: function(req, res, next) {
      let id = req.params.id
      db.ADP.findByPk('5yURv2KkyZ', 

      
      {include: [{association: 'Proc' }
      ]}
    
    )
        .then(function(data){
        return res.send(data);
      })
      .catch(function(e){
        console.log(e)
      })
    },

    create: function (req,res){
      res.render ('nuevoProceso', {title: "Nuevo Proceso"})
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
  

    store: function (req,res){

      let info = req.body;
      let nuevoADP= {
                      id: 1,
                      procesoId: "5yURv0&B4J",
                      tipoDeProceso:"dc",
                      estadoProcesal:"pru",
                      pendiente1: "",
                      pendiente2: "",
                      pendiente3: "",
                      pendiente4: "",
                      pendiente5: "",
                      fechaDeMora: 12/08/1999,
                      monto: 0,
                      radicacion: "CIVIL 11 LZ",
                      ADP:""
                    }


      db.ADP.create(nuevoADP)
      .then(function(nuevoADP){
        return res.send(nuevoADP)
      })
      .catch

  }
}


module.exports = adpController