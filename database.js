const Sequelize = require('sequelize');
const database = new Sequelize(process.env.DATABASE, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
	host: 'localhost',
	dialect: 'postgres',
});
// Note when documenting this later: had to go into psql and run `\password`, setting the value to the same as in .env

const Tags = database.define('tags', {
	name: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
	},
	createdBy: Sequelize.STRING,
});

module.exports = { Sequelize, database, Tags };