module.exports = function (sequelize, dataTypes){

let alias = 'tEstado' // mismo  nomnre q el modelo, nombre con el cual sequelize identificara al modelo
const cols = {

    tipoEstadoId:{type:dataTypes.STRING,primaryKey:true}
}

let config ={
    tableName: 'tiposDeEstados',
    timestamps: false,
    underscored: false
}

const tEstado = sequelize.define(alias, cols, config);

/*  tMtos.associate = function (models){

    Procesos.belongsTo(models.Miembro, {
        as: 'Miembro',
        foreignKey: 'MIEM'
    })

    Procesos.belongsToMany(models.Mto, {
        as: 'Mtos',
        through: "PROC_MTOS",
        foreignKey: 'PROC',
        otherKey: 'mto_id'
    } )
}
    */
return tEstado
}
