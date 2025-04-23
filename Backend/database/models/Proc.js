const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const alias = 'Proc';
  const cols = {
    PROC: { type: DataTypes.STRING, primaryKey: true },
    GRUP: { type: DataTypes.STRING },
    TPRO: { type: DataTypes.STRING },
    ACTO: { type: DataTypes.STRING },
    DEMA: { type: DataTypes.STRING },
    OBSE: { type: DataTypes.STRING },
    CARP: { type: DataTypes.STRING },
    INIC: { type: DataTypes.STRING },
    FINA: { type: DataTypes.STRING },
    DOCO: { type: DataTypes.STRING },
    OJUD: { type: DataTypes.STRING },
    INST: { type: DataTypes.STRING },
    EXP1: { type: DataTypes.STRING },
    EXP2: { type: DataTypes.STRING },
    EXP3: { type: DataTypes.STRING },
    EXP4: { type: DataTypes.STRING },
    SUPE: { type: DataTypes.STRING },
    MIEM: { type: DataTypes.STRING },
    AUX1: { type: DataTypes.STRING },
    AUX2: { type: DataTypes.STRING },
    AUX3: { type: DataTypes.STRING },
    AUX4: { type: DataTypes.STRING },
    AUX5: { type: DataTypes.STRING },
    AUX6: { type: DataTypes.STRING },
    AUX7: { type: DataTypes.STRING },
    AUX8: {
      type: DataTypes.STRING,
      get() {
        const actor = this.getDataValue('ACTO');
        const dddo = this.getDataValue('DEMA');
        const tpro = this.getDataValue('TPRO');
        return actor ? actor +(dddo ? ' C/ ' + dddo : '' ) + ' S/ ' + tpro : null;
      }
    },
    EDIT: { type: DataTypes.STRING }
  };

  const config = {
    tableName: 'Proc',
    timestamps: false,
    underscored: false
  };

  const Procesos = sequelize.define(alias, cols, config);

   Procesos.associate = function (db) {
    Procesos.belongsTo(db.Miembro, {
      foreignKey: 'MIEM'
    });
  };
 
  return Procesos;
};