module.exports = function (sequelize, dataTypes){

let alias = 'ProMtos' // mismo  nomnre q el modelo, nombre con el cual sequelize identificara al modelo
const cols = {

    proMtosId:{type:dataTypes.STRING,primaryKey:true},
    procIdFk:{type:dataTypes.STRING},
    mtoIdFK:{type:dataTypes.STRING}
}

let config ={
    tableName: 'promtos',
    timestamps: true,
    underscored: true
}

const ProMtos = sequelize.define(alias, cols, config);

ProMtos.associate = function (models){

    ProMtos.belongsTo(models.Proc, {
        as: 'Proceso',
        foreignKey: 'procIdFk'
    })

    ProMtos.belongsTo(models.tMto, {
        as: 'Movimiento',
        foreignKey: 'mtoIdFK',
    } )
}
return ProMtos
}
