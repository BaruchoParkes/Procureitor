module.exports = function (sequelize, dataTypes){

let alias = 'tMto' // mismo  nomnre q el modelo, nombre con el cual sequelize identificara al modelo
const cols = {

    tipoMtoID:{type:dataTypes.STRING,primaryKey:true},
    movimiento:{type:dataTypes.STRING},
    tipo:{type:dataTypes.STRING},
    tituloEscrito:{type:dataTypes.STRING},
    cuerpoEscrito:{type:dataTypes.STRING},
    informe:{type:dataTypes.STRING},
    proximoPasoID:{type:dataTypes.STRING},
    ppEnCuantosDias:{type:dataTypes.INTEGER},
    estadoProcesal:{type:dataTypes.STRING},
}

let config ={
    tableName: 'tiposdemtos',
    timestamps: false,
    underscored: false
}

const tMtos = sequelize.define(alias, cols, config);

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
return tMtos
}
