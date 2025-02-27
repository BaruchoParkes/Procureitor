const { DataTypes } = require('sequelize');


module.exports = function (sequelize, dataTypes){

let alias = 'Resumenes' // mismo  nomnre q el modelo, nombre con el cual sequelize identificara al modelo
const cols = {
  
id:{type:dataTypes.STRING ,primaryKey:true},
procIdFK:{type:dataTypes.STRING},
resumen:{type:dataTypes.TEXT}
}

let config ={
    tableName: 'Resumenes',
    timestamps: false,
    underscored: false
}



const Resumenes = sequelize.define(alias, cols, config);

Resumenes.associate = function (models){

    Resumenes.belongsTo(models.Proc, {
        as: 'Proceso',
        foreignKey: 'procIdFk'
    })


}
return Resumenes
}
