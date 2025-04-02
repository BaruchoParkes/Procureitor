const bcrypt = require('bcryptjs');
const db = require('./database/models');

/* { Iniciales: 'GEO', password: 'Sol3dad$2025' },
{ Iniciales: 'SAG', password: 'Cafe#Noche12' },
{ Iniciales: 'CAP', password: 'Rio@Azul77' },
{ Iniciales: 'LA', password: 'LunaNieve$9' },
{ Iniciales: 'IS', password: 'P3dro!Verano' },
{ Iniciales: 'MVP', password: 'Mañana#Claro8' },
{ Iniciales: 'MSJ', password: 'Tortuga22&Sol' },
{ Iniciales: 'SV', password: 'F1esta@Invierno' },
{ Iniciales: 'ZCC', password: 'Arbol$Estrella3' },
{ Iniciales: 'EA', password: 'CieloAzul#15' },
{ Iniciales: 'SUCESION', password: 'Gomez&Verano99'}
{ Iniciales: 'FAM', password: 'Invierno&Sol-1995' }
{ Iniciales: 'ISV', password: 'Tuerca$Reloj-1980' }


 */


const updatePasswords = async () => {
  try {
    const newPasswords = [
        { Iniciales: 'ISV', password: 'Tuerca$Reloj-1980' }
    ];

    for (const { Iniciales, password } of newPasswords) {
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(`Updating ${Iniciales} with new password: ${password} -> ${hashedPassword}`);

      const [updated] = await db.Miembro.update(
        { password: hashedPassword },
        { where: { Iniciales } }
      );

      if (updated === 0) {
        console.log(`User ${Iniciales} not found, creating...`);
        await db.Miembro.create({
          miemID: `${Iniciales}${Math.floor(Math.random() * 10000)}`, // Simple unique ID
          Iniciales,
          password, // Hook hashes it
          nombre: Iniciales // Placeholder, update later
        });
      }
    }

    console.log('All passwords updated successfully');
  } catch (error) {
    console.error('Error updating passwords:', error);
  } finally {
    await db.sequelize.close();
  }
};

updatePasswords();