const { DataTypes } = require('sequelize');

module.exports = function (sequelize, dataTypes){

let alias = 'ProcEstM2m' // mismo  nomnre q el modelo, nombre con el cual sequelize identificara al modelo
const cols = { 
    procEstId:{type:dataTypes.STRING,primaryKey:true},
    procIdFk:{type:dataTypes.STRING},
    tipoEstadoIdFk:{type:dataTypes.STRING},
}

let config ={
    tableName: 'procesosEstadosM2m',
    timestamps: false,
    underscored: false
}

const ProcEstM2m = sequelize.define(alias, cols, config);

ProcEstM2m.associate = function (models){

    ProcEstM2m.belongsTo(models.Proc, {
        as: '',
        foreignKey: 'procIdFk'
    })

    ProcEstM2m.belongsTo(models.tEstado, {
        foreignKey: 'tipoEstadoIdFk'
    } )
}
return ProcEstM2m
}
