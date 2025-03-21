const { DataTypes } = require('sequelize');



module.exports = function (sequelize, dataTypes){

let alias = 'Mtos' // mismo  nomnre q el modelo, nombre con el cual sequelize identificara al modelo

const cols = {
    mtoId:{type:dataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    proc:{type:dataTypes.STRING},
    createdAt:{type: dataTypes.STRING},
    fecha:{
      type: dataTypes.DATE,
      defaultValue: dataTypes.NOW},
    tipoDeMovimiento:{type:dataTypes.STRING},
    usuario:{type:dataTypes.STRING},
    descripcion:{type:dataTypes.STRING},
    realizado:{type:dataTypes.BOOLEAN},
    texto:{type:dataTypes.STRING},
    archivo:{type:dataTypes.BLOB},
    actor:{type:dataTypes.STRING},
    pteDemandada:{type:dataTypes.STRING},
    tpoProceso:{type:dataTypes.STRING},
    cobros_fk:{type:dataTypes.STRING},
    whatsapp:{type:dataTypes.STRING},
    grok:{type:dataTypes.STRING},

}

let config ={
    tableName: 'mtos',
    timestamps: false
   // underscored: true
}

const Mtos = sequelize.define(alias, cols, config)

Mtos.associate = function (models){

    Mtos.belongsTo(models.Proc, {
        foreignKey: 'proc',
        targetKey: 'PROC'
      });


    Mtos.belongsTo(models.Miembro, {
        foreignKey: 'usuario',
        targetKey: 'miemID'
    })

/*     Mtos.belongsToMany(models.Proc, {
        as: 'mtos',
        through: "PROC_MTOS",
        foreignKey: 'mto_id',
        otherKey: 'proc_id'
    } )

 */

// When creating or updating mtos record
    Mtos.beforeCreate(async (mtos, options) => {
    const relatedProc = await models.Proc.findByPk(mtos.proc);
  
    if (relatedProc) {
      mtos.actor = relatedProc.ACTO;
      mtos.pteDemandada = relatedProc.DEMA;
    }
  });
  
  Mtos.beforeUpdate(async (mtos, options) => {
    const relatedProc = await models.Proc.findByPk(mtos.proc);
  
    if (relatedProc) {
      mtos.actor = relatedProc.ACTO;
      mtos.pteDemandada = relatedProc.DEMA;
    }
  });


  
}
return Mtos
}