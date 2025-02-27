const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

// Define your model
const YourModel = sequelize.define('YourModel', {
    // Define your columns here
    column1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    column2: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

const loadData = async (jsonData) => {
    try {
        await sequelize.sync(); // Ensure the database is in sync
        for (let obj of jsonData) {
            await YourModel.create(obj);
        }
        console.log('Data successfully loaded!');
    } catch (error) {
        console.error('Error loading data:', error);
    }
};

module.exports = loadData;
