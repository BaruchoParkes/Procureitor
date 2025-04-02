const { DataTypes } = require('sequelize');


module.exports = function (sequelize, dataTypes){

let alias = 'Caja_cash' // mismo  nomnre q el modelo, nombre con el cual sequelize identificara al modelo
const cols = {  
    caja_cash_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    pagos_fk :{type:dataTypes.INTEGER},
    cobros_fk : {type: DataTypes.INTEGER},
    created_at	:{type:dataTypes.DATE},
    usuario :{type:dataTypes.STRING},	
    categoria :{type:dataTypes.STRING},
    movimiento: {type:dataTypes.STRING},
    notas	:{type:dataTypes.STRING},
    monto	: {type: DataTypes.INTEGER},
    saldo	: {type: DataTypes.INTEGER}
}

let config ={
    tableName: 'caja_cash',
    timestamps: false,
    underscored: false
}

const Caja_cash = sequelize.define(alias, cols, config);

return Caja_cash
}
