module.exports = function (sequelize, dataTypes){

    let alias = 'MaView' // mismo  nomnre q el modelo, nombre con el cual sequelize identificara al modelo
    const cols = {
    mavId:{type:dataTypes.STRING, primaryKey:true},
    created_at:{type:dataTypes.STRING},
    proc:{type:dataTypes.STRING},
    acto:{type:dataTypes.STRING},
    dema:{type:dataTypes.STRING},
    obse:{type:dataTypes.STRING},
    exp1:{type:dataTypes.STRING},
    tipoDeProceso:{type:dataTypes.STRING},
    estadoProcesal:{type:dataTypes.STRING},
    responsable:{type:dataTypes.STRING},
    descripcion:{type:dataTypes.STRING},
    realizado:{type:dataTypes.STRING},
    texto:{type:dataTypes.STRING},
    archivo:{type:dataTypes.STRING}
  } 
  
  let config =
  {
    tableName: 'mtosAdpView',
    timestamps: false,
    underscored: false,
  }

  const MaView = sequelize.define(alias, cols, config);

  MaView.associate = function (models){
    MaView.belongsTo(models.Proc, {
      as: 'proceso',
      foreignKey: 'proc'
    })
    MaView.belongsTo(models.Mtos, {
      as: 'mto',
      foreignKey: 'mavid'
    })
    /*MaView.belongsTo(models.ADP, {
      as: 'adp',
      foreignKey: 'adpID'
    })*/
  }


  return MaView
}
