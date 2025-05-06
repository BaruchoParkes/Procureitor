const { DataTypes } = require('sequelize');


module.exports = function (sequelize, dataTypes){

let alias = 'Caja_zcc' // mismo  nomnre q el modelo, nombre con el cual sequelize identificara al modelo
const cols = {  
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
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
    tableName: 'Caja_zcc',
    timestamps: false,
    underscored: false
}

const Caja_zcc = sequelize.define(alias, cols, config);

// Hook para crear row en caja gral cada vez que se crea row en caja user
Caja_zcc.afterCreate(async (newRecord, options) => {
try {
    // Example: Insert a related record in another table
    const db = require('.');

    const lastRow = await db.Caja.findOne({
        order: [['cajaID', 'DESC']] // Replace 'id' with the relevant column for ordering.
        });

    let cual_caja = alias.substring(5).toUpperCase();

    await db.Caja.create({
    created_at: Date.now(),
    cobros_fk: newRecord.cobros_fk,
    caja_fk: newRecord.id,
    monto: newRecord.monto,
    cobro_pago : newRecord.cobro_pago,	
    categoria: newRecord.categoria,
    usuario: newRecord.usuario,
    notas: newRecord.notas,
    monto: newRecord.monto,
    saldo: lastRow.saldo + newRecord.monto,
    caja: cual_caja,
    nombre: newRecord.movimiento
    });
} catch (error) {
    console.error('Error in afterCreate hook:', error);
}
});


return Caja_zcc
}
