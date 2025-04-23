const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');


module.exports = function (sequelize) {
  let alias = 'Miembro';

  const cols = {
    Iniciales: { type: DataTypes.STRING },
    Name: { type: DataTypes.STRING },
    Fecha_de_Ingreso: { type: DataTypes.STRING },
    Horario_de_Trabajo: { type: DataTypes.STRING },
    Horario_Libros: { type: DataTypes.STRING },
    Antiguedad: { type: DataTypes.STRING },
    Empleador: { type: DataTypes.STRING },
    Email: { type: DataTypes.STRING },
    Whatsapp: { type: DataTypes.STRING },
    Telefono: { type: DataTypes.STRING },
    Interno: { type: DataTypes.STRING },
    Descripcion_de_Posicion: { type: DataTypes.STRING },
    Oficinas_Judiciales: { type: DataTypes.STRING },
    Backup: { type: DataTypes.STRING },
    Matricula_Provincia: { type: DataTypes.STRING },
    Matricula_CABA: { type: DataTypes.STRING },
    Teléfono_Personal: { type: DataTypes.STRING },
    Dirección: { type: DataTypes.STRING },
    Contacto_de_emergencia: { type: DataTypes.STRING },
    CUIL: { type: DataTypes.STRING },
    CBU: { type: DataTypes.STRING },
    DNI_Frente: { type: DataTypes.STRING },
    DNI_Dorso: { type: DataTypes.STRING },
    Fecha_de_Nacimiento: { type: DataTypes.STRING },
    Edad: { type: DataTypes.STRING },
    Fecha_de_Egreso: { type: DataTypes.STRING },
    Activo: { type: DataTypes.STRING },
    Condicion_Impositiva: { type: DataTypes.STRING },
    Sueldos: { type: DataTypes.STRING },
    miemID: { type: DataTypes.STRING, primaryKey: true },
    password: { type: DataTypes.STRING },
    usuario: { type: DataTypes.STRING },
    lex_id: { type: DataTypes.STRING },
    avatar: { type: DataTypes.STRING },
    nivel_acceso: { type: DataTypes.STRING }

  };

  let config = {
    tableName: 'MIEM',
    timestamps: false,
    underscored: false,
    hooks: {
      beforeCreate: async (miembro) => {
        miembro.password = await bcrypt.hash(miembro.password, 10);
      },
      beforeUpdate: async (miembro) => {
        if (miembro.changed('password')) {
          miembro.password = await bcrypt.hash(miembro.password, 10);
        }
      }
    }
  };

  const Miembros = sequelize.define(alias, cols, config);

/*   Miembros.associate = function (db) {
    // New association with cobros
    Miembros.hasMany(db.Cobros, {
      foreignKey: 'quien_cobra', // Foreign key in Cobros
      sourceKey: 'miemID',       // Primary key in Miembro
      as: 'cobros'       // Alias for the relationship
    });
  };
 */
  Miembros.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return Miembros;
};
