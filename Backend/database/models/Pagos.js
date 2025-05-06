const { DataTypes } = require('sequelize');

module.exports = function (sequelize, DataTypes) {

    const alias = 'Pagos'; // Name used by Sequelize to identify the model
    const cols = {
      pagoId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      pagoLabel: { type: DataTypes.STRING },
      gastoIdFkEnPagos: { type: DataTypes.STRING },
      concepto: { type: DataTypes.STRING },
      importe: { type: DataTypes.INTEGER },
      fechaDeCarga: { type: DataTypes.STRING },
      factura: { type: DataTypes.STRING },
      documento: { type: DataTypes.STRING },
      aclaracion: { type: DataTypes.STRING },
      comprobante: { type: DataTypes.STRING },
      estado: { type: DataTypes.STRING },
      paga: { type: DataTypes.STRING }, // Foreign key referencing Miembro
      fechadepago: { type: DataTypes.STRING },
      created_at: { type: DataTypes.DATE },
      usuario: { type: DataTypes.STRING }, // Foreign key referencing Miembro
      categoria: { type: DataTypes.STRING },
      proceso: { type: DataTypes.STRING }
    };
  
    const config = {
      tableName: 'pagos',
      timestamps: false
    //  underscored: false,
    };
  
const Pagos = sequelize.define(alias, cols, config);
  
    // Define associations
     Pagos.associate = function (db) {
      // Association for 'paga' field referencing Miembro
      Pagos.belongsTo(db.Miembro, {
        as: 'PagaMiembro', // Alias for the association
        foreignKey: 'paga', // Foreign key in Pagos table
        targetKey: 'miemID', // Primary key in Miembro table (adjust if different)
      }); 
  
      // Association for 'usuario' field referencing Miembro
       Pagos.belongsTo(db.Miembro, {
        as: 'UsuarioMiembro', // Alias for the association
        foreignKey: 'usuario', // Foreign key in Pagos table
        targetKey: 'miemID', // Primary key in Miembro table (adjust if different)
      });

      // Association for 'Proceso'
      Pagos.belongsTo(db.Proc, {
        as: 'PagoProceso', // Alias for the association
        foreignKey: 'proceso', // Foreign key in Pagos table
        targetKey: 'PROC', // Primary key in Miembro table (adjust if different)
      });
    
    };
   
    return Pagos
  }
