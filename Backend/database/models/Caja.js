const { DataTypes } = require('sequelize');


module.exports = function (sequelize, dataTypes){

let alias = 'Caja' // mismo  nomnre q el modelo, nombre con el cual sequelize identificara al modelo
const cols = {
  
cajaID: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
created_at	:{type:dataTypes.DATE},
pagos_fk :{type:dataTypes.STRING},
cobros_fk : {type: DataTypes.INTEGER},
cobro_pago :{type:dataTypes.STRING},	
categoria :{type:dataTypes.STRING},
usuario :{type:dataTypes.STRING},	
notas	:{type:dataTypes.STRING},
monto	: {type: DataTypes.INTEGER},
saldo	: {type: DataTypes.INTEGER},
caja	: {type: DataTypes.STRING},
caja_cash : {type: DataTypes.INTEGER},
caja_GEO : {type: DataTypes.INTEGER},
caja_CAP : {type: DataTypes.INTEGER},
caja_IS : {type: DataTypes.INTEGER},
caja_SAG : {type: DataTypes.INTEGER},
caja_ISV : {type: DataTypes.INTEGER},
caja_LA : {type: DataTypes.INTEGER},
caja_MVP : {type: DataTypes.INTEGER},
caja_ZCC : {type: DataTypes.INTEGER},
caja_Sucesion : {type: DataTypes.INTEGER},
nombre: {type:dataTypes.STRING}
}

let config ={
    tableName: 'Caja',
    timestamps: false,
    underscored: false
}

const Caja = sequelize.define(alias, cols, config);
Caja.associate = function (models){
}
return Caja
}
