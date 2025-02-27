const { DataTypes } = require('sequelize');


module.exports = function (sequelize, dataTypes){

let alias = 'Proc' // mismo  nomnre q el modelo, nombre con el cual sequelize identificara al modelo
const cols = {
  
PROC:{type:dataTypes.STRING,primaryKey:true},
GRUP:{type:dataTypes.STRING},
TPRO:{type:dataTypes.STRING},
ACTO:{type:dataTypes.STRING},
DEMA:{type:dataTypes.STRING},
OBSE:{type:dataTypes.STRING},
CARP:{type:dataTypes.STRING},
INIC:{type:dataTypes.STRING},
FINA:{type:dataTypes.STRING},
DOCO:{type:dataTypes.STRING},
OJUD:{type:dataTypes.STRING},
INST:{type:dataTypes.STRING},
EXP1:{type:dataTypes.STRING},
EXP2:{type:dataTypes.STRING},
EXP3:{type:dataTypes.STRING},
EXP4:{type:dataTypes.STRING},
SUPE:{type:dataTypes.STRING},
MIEM:{type:dataTypes.STRING},
AUX1:{type:dataTypes.STRING},
AUX2:{type:dataTypes.STRING},
AUX3:{type:dataTypes.STRING},
AUX4:{type:dataTypes.STRING},
AUX5:{type:dataTypes.STRING},
AUX6:{type:dataTypes.STRING},
AUX7:{type:dataTypes.STRING},
AUX8:{

  type: DataTypes.STRING,
  get() {
    const actor = this.getDataValue('ACTO');
    const dddo = this.getDataValue('DEMA');

    return actor ? actor + ' C/ ' + dddo : null;
  }
},
EDIT:{type:dataTypes.STRING}
}

let config ={
    tableName: 'Proc',
    timestamps: false,
    underscored: false
}

const autos = sequelize.define('autos', {

    ACTO: DataTypes.TEXT,
    DEMA: DataTypes.TEXT,
    autos: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.ACTO} ${this.DEMA}`;
      },
      set(value) {
        throw new Error('Do not try to set the `fullName` value!');
      },
    },
  });
  



const Procesos = sequelize.define(alias, cols, config);

Procesos.associate = function (models){

  Procesos.belongsTo(models.Miembro, {
      foreignKey: 'MIEM'
  })

  Procesos.belongsToMany(models.Mtos, {
      as: 'Mtos',
      through: "PROC_MTOS",
      foreignKey: 'PROC',
      otherKey: 'mto_id'
  } )
}
return Procesos
}
