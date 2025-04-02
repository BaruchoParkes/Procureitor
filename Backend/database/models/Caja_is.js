const { DataTypes } = require('sequelize');


module.exports = function (sequelize, dataTypes){

let alias = 'Caja_is' // mismo  nomnre q el modelo, nombre con el cual sequelize identificara al modelo
const cols = {
    caja_is_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
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
    tableName: 'Caja_is',
    timestamps: false,
    underscored: false
}

const Caja_is = sequelize.define(alias, cols, config);

return Caja_is
}
