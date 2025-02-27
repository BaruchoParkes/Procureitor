const { DataTypes } = require('sequelize');


module.exports = function (sequelize, dataTypes){

let alias = 'Gastos' // mismo  nomnre q el modelo, nombre con el cual sequelize identificara al modelo
const cols = {
gastoId:{type:dataTypes.STRING,primaryKey:true},
gasto:{type:dataTypes.STRING},
concepto:{type:dataTypes.STRING}
}

let config ={
    tableName: 'gastos',
    timestamps: false,
    underscored: false
}


const Gastos = sequelize.define(alias, cols, config);

/* Procesos.associate = function (models){

    Procesos.belongsTo(models.Miembro, {
        as: 'Miembro',
        foreignKey: 'MIEM'
    })

    Procesos.belongsToMany(models.Mtos, {
        as: 'Mtos',
        through: "PROC_MTOS",
        foreignKey: 'PROC',
        otherKey: 'mto_id'
    } )
} */
return Gastos
}
