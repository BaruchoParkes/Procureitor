const db = require('./models/index');
const sequelize = db.sequelize;

(async () => {
  try {
   // console.log('Attempting sync...');
    await sequelize.sync({ force: true });
    //console.log('Sync successful!');
  } catch (error) {
    //console.error('Sync failed:', error);
  } finally {
    await sequelize.close();
  }
})();