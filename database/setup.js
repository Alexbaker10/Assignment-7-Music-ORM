const {Sequelize, DataTypes} = require('sequelize');
require('dotenv').config();

const db = new Sequelize({
    dialect: process.env.DB_TYPE || 'sqlite',
    storage: `database/${process.env.DB_NAME}` || 'database/music_library.db',
    logging: console.log,
});

const Track = db.define('Track', {
    trackID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    songTitle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    artistName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    albumName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
     genre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER,   
    },
    releaseYear: {
        type: DataTypes.INTEGER,   
    },
});

async function setupDatabase() {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
        await db.sync({ force: true });
        console.log(`Database file created at: database/${process.env.DB_NAME}`);
        await db.close();
    } catch (error) {
        console.error(`Unable to connect to the database:, ${error}`);
    }
}

if (require.main === module) {
    setupDatabase();
}
module.exports = { db, Track};