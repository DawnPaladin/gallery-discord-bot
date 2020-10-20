const Sequelize = require('sequelize');
const database = new Sequelize(process.env.DATABASE, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
	host: 'localhost',
	dialect: 'postgres',
});
// Note when documenting this later: had to go into psql and run `\password`, setting the value to the same as in .env
// Also need to run these commands:
// sudo -u postgres psql 	// need superuser privileges
// \c pilotnet-gallery-bot 	// connect to our database
// CREATE EXTENSION citext;	// enable citext (case-insensitive-text) extension

const Tags = database.define('tags', {
	name: {
		type: Sequelize.CITEXT,
		unique: true,
		allowNull: false,
	},
	createdBy: Sequelize.STRING,
});

module.exports = { Sequelize, database, Tags };