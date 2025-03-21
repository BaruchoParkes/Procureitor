const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
  let alias = 'Cobros';

  const cols = {

    cobro_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    createdAt: { type: DataTypes.DATE },
    fecha: { type: DataTypes.DATE },
    usuario: { type: DataTypes.STRING },
    proc: { type: DataTypes.STRING },
    capital_honorarios: { type: DataTypes.STRING },
    monto: { type: DataTypes.INTEGER },
    PCL: { type: DataTypes.INTEGER },
    cuota: { type: DataTypes.STRING },
    quien_cobra: { type: DataTypes.STRING }, // Foreign key to Miembro.miemID
    cobrado_sn: { type: DataTypes.BOOLEAN },
    notas: { type: DataTypes.STRING },
    actor_moroso_sn: { type: DataTypes.STRING },
    libranza_judicial_transferencia_directa: { type: DataTypes.STRING },
    confirmado_por_receptor: { type: DataTypes.STRING },
  
  };

  let config = {
    tableName: 'Cobros',
    timestamps: false,
    underscored: false
  };

  const Cobros = sequelize.define(alias, cols, config);

  Cobros.associate = function (models) {
    // Existing association with Proc
    Cobros.belongsTo(models.Proc, {
      foreignKey: 'proc',
      targetKey: 'PROC'
    });

    // New association with Miembro
    Cobros.belongsTo(models.Miembro, {
      foreignKey: 'quien_cobra', // Foreign key in cobros
      targetKey: 'miemID',       // Primary key in Miembro
      as: 'receptor'             // Alias for the relationship
    });
  };

  return Cobros;
};