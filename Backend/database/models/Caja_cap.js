const { DataTypes } = require('sequelize');


module.exports = function (sequelize, dataTypes){

let alias = 'Caja_cap' // mismo  nomnre q el modelo, nombre con el cual sequelize identificara al modelo
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
    tableName: 'Caja_cap',
    timestamps: false,
    underscored: false
}

const Caja_cap = sequelize.define(alias, cols, config);

  // Adding the afterCreate Hook
  Caja_cap.afterCreate(async (newRecord, options) => {

    console.log('this: ', this)
    try {
      // Example: Insert a related record in another table
      const db = require('.');

       const lastRow = await db.Caja.findOne({
            order: [['cajaID', 'DESC']] // Replace 'id' with the relevant column for ordering.
          });

      await db.Caja.create({
        created_at: Date.now(),

        cobros_fk: newRecord.cobros_fk,
        monto: newRecord.monto,
        cobro_pago :'c',	
        categoria: newRecord.categoria,
        usuario: newRecord.usuario,
        notas: newRecord.notas,
        monto: newRecord.monto,
        saldo: lastRow.saldo + newRecord.monto,
        caja: alias,
        nombre: newRecord.movimiento
      });
    } catch (error) {
      console.error('Error in afterCreate hook:', error);
    }
  });

return Caja_cap
};
