module.exports = function (sequelize, dataTypes){

let alias = 'ADP' // mismo  nomnre q el modelo, nombre con el cual sequelize identificara al modelo
const cols = {

    adpId:{type:dataTypes.INTEGER, primaryKey:true},
	procesoId:{type:dataTypes.STRING},
    autos:{type:dataTypes.STRING},
	tipoDeProceso:{type:dataTypes.ENUM( 	
                                        "cn",
                                        "lrt",
                                        "ddi",
                                        "vd",
                                        "rc",
                                        "rl2",
                                        "ep",
                                        "ain",
                                        "atr",
                                        "di",
                                        "dcc",
                                        "dsc",
                                        "247",
                                        "212",
                                        "dnc",
                                        "suc",
                                        "eje",
                                        "dc",
                                        "bls",
                                        "qui",
                                        "jub",
                                        "otr"
)},
estadoProcesal:{type:dataTypes.ENUM(	
                                    "cn",
                                    "ilt",
                                    "int",
                                    "sec",
                                    "fcc",
                                    "rnl",
                                    "srt",
                                    "lpt",
                                    "ini",
                                    "td",
                                    "pru",
                                    "cam",
                                    "tp",
                                    "sen",
                                    "eje",
                                    "igb"
)},
pendiente1:{type:dataTypes.STRING},
pendiente2:{type:dataTypes.STRING},
pendiente3:{type:dataTypes.STRING},
pendiente4:{type:dataTypes.STRING},
pendiente5:{type:dataTypes.STRING},
fechaDeMora:{type:dataTypes.DATE},
monto:{type:dataTypes.INTEGER},
radicacion :{type:dataTypes.STRING},
ADP:{type:dataTypes.STRING}
}


let config ={
    tableName: 'ADP',
    timestamps: false,
    underscored: false
}

const ADP = sequelize.define(alias, cols, config);

ADP.associate = function (models){
ADP.belongsTo(models.Proc, {
    as: 'proc',
    foreignKey: 'procesoID'
})
}


return ADP
}