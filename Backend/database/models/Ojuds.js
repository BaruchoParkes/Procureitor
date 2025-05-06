const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');


module.exports = function (sequelize) {
  let alias = 'Ojuds';

  const cols = {


    id : { type: DataTypes.STRING, primaryKey: true  },
    nombre_corto: { type: DataTypes.STRING }, 
    jurisdiccion: { type: DataTypes.STRING }, 
    fuero: { type: DataTypes.STRING },
    nominacion: { type: DataTypes.STRING },
    sub_nominacion: { type: DataTypes.STRING },
    direccion: { type: DataTypes.STRING },
    telefono : { type: DataTypes.INTEGER },
    email: { type: DataTypes.STRING },
    zona_de_recorrida: { type: DataTypes.STRING },
    criterio: { type: DataTypes.STRING },
    Juez: { type: DataTypes.STRING },
    secretario: { type: DataTypes.STRING }
  };

  let config = {
    tableName: 'oficinas_judiciales',
    timestamps: false,
    underscored: false,
  }
    

  const Ojuds = sequelize.define(alias, cols, config);


  return Ojuds;
};
