
const { DataTypes } = require('sequelize');


module.exports = function (sequelize, dataTypes){

let alias = 'Gastos' // mismo  nomnre q el modelo, nombre con el cual sequelize identificara al modelo
const cols = {
gastoId:{type:dataTypes.STRING,primaryKey:true},
gasto:{type:dataTypes.STRING},
concepto:{type:dataTypes.STRING},
usuario:{type:dataTypes.INTEGER}
}

let config ={
    tableName: 'gastos',
    timestamps: false,
    underscored: false
}


const Gastos = sequelize.define(alias, cols, config);

return Gastos
}
