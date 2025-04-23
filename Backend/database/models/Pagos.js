module.exports = function (sequelize, dataTypes) {
    let alias = 'Pagos'; // Name used by Sequelize to identify the model
    const cols = {
      pagoId: { type: dataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      pagoLabel: { type: dataTypes.STRING },
      gastoIdFkEnPagos: { type: dataTypes.STRING },
      concepto: { type: dataTypes.STRING },
      importe: { type: dataTypes.INTEGER },
      fechaDeCarga: { type: dataTypes.STRING },
      factura: { type: dataTypes.STRING },
      documento: { type: dataTypes.STRING },
      aclaracion: { type: dataTypes.STRING },
      comprobante: { type: dataTypes.STRING },
      estado: { type: dataTypes.STRING },
      paga: { type: dataTypes.STRING }, // Foreign key referencing Miembro
      fechadepago: { type: dataTypes.STRING },
      created_at: { type: dataTypes.DATE },
      usuario: { type: dataTypes.STRING }, // Foreign key referencing Miembro
      categoria: { type: dataTypes.STRING },
    };
  
    let config = {
      tableName: 'pagos',
      timestamps: false,
      underscored: false,
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
    };
  
    return Pagos;
  };
