const { DataTypes } = require('sequelize');


module.exports = function (sequelize, dataTypes){

let alias = 'Pagos' // mismo  nomnre q el modelo, nombre con el cual sequelize identificara al modelo
const cols = {
    pagoId: {type:dataTypes.STRING,primaryKey:true}, 
    pagoLabel:{type:dataTypes.STRING},
    gastoIdFkEnPagos:{type:dataTypes.STRING},
    concepto:{type:dataTypes.STRING},
    importe: {type:dataTypes.STRING},
    fechaDeCarga:{type:dataTypes.STRING},
    factura:{type:dataTypes.STRING},
    documento:{type:dataTypes.STRING},
    aclaracion: {type:dataTypes.STRING},
    comprobante:{type:dataTypes.STRING},
    estado:{type:dataTypes.STRING},
    paga:{type:dataTypes.STRING},
    fechadepago:{type:dataTypes.STRING}
}

let config ={
    tableName: 'pagos',
    timestamps: false,
    underscored: false
}

const Pagos = sequelize.define(alias, cols, config);

return Pagos
}
