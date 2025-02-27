let db = require('../database/models');
let op = db.Sequelize.Op;


let MaViewController = {

    index: function(req, res, next) {

      db.MaView.findAll()
      .then(function(data){
        // return res.send(data);
        let MaViewList = data;
        res.render('MaView', { title: 'Ma iew', listaMaView: MaViewList});
      })
      .catch(function(e){
        console.log(e)
      })
      },

    show: function(req, res, next) {
      let id = req.params.id
      db.MaView.findByPk('5yURv0&B4J_1') 
  
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
      let adpupdate = {

    "tipoDeProceso": 'caca',
    "estadoProcesal": 'acaca'

  };

      db.MaView.create(adpupdate)
      .then(function(adpupdate){
        return res.send(adpupdate)

      } )
      req.session.lastMovie = info;
      res.cookie('lastMovie', info.title, {maxAge: 1000 * 60 *5 })
      /*return res.send(req.session); */
      return res.redirect('/');
  },


  update: function(req, res) {
    let id = req.params.id;
    let updatedData = req.body;

    db.MaView.findByPk(id)
        .then(function(record) {
            if (record) {
                record.update({
                    acto: updatedData.acto,
                    dema: updatedData.dema,
                    exp1: updatedData.exp1,
                    tipoDeProceso: updatedData.tipoDeProceso,
                    estadoProcesal: updatedData.estadoProcesal,
                    pendiente1: updatedData.pendiente1
                })
                .then(function(updatedRecord) {
                    res.json({ success: true, data: updatedRecord });
                })
                .catch(function(error) {
                    console.log('Error updating record:', error);
                    res.status(500).json({ success: false, message: 'Internal server error' });
                });
            } else {
                res.status(404).json({ success: false, message: 'Record not found' });
            }
        })
        .catch(function(error) {
            console.log('Error finding record:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        });

}
}

module.exports = MaViewController