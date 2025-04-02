const { DataTypes } = require('sequelize');


module.exports = function (sequelize, dataTypes){

let alias = 'Pagos' // mismo  nomnre q el modelo, nombre con el cual sequelize identificara al modelo
const cols = {
    pagoId: {type:dataTypes.INTEGER,primaryKey:true, autoIncrement: true}, 
    pagoLabel:{type:dataTypes.STRING},
    gastoIdFkEnPagos:{type:dataTypes.STRING},
    concepto:{type:dataTypes.STRING},
    importe: {type:dataTypes.INTEGER},
    fechaDeCarga:{type:dataTypes.STRING},
    factura:{type:dataTypes.STRING},
    documento:{type:dataTypes.STRING},
    aclaracion: {type:dataTypes.STRING},
    comprobante:{type:dataTypes.STRING},
    estado:{type:dataTypes.STRING},
    paga:{type:dataTypes.STRING},
    fechadepago:{type:dataTypes.STRING},
    created_at: {type:dataTypes.DATE},
    usuario :{type:dataTypes.STRING}, 
    categoria:{type:dataTypes.STRING}
}

let config ={
    tableName: 'pagos',
    timestamps: false,
    underscored: false
}

const Pagos = sequelize.define(alias, cols, config);

return Pagos
}
