const axios = require('axios').default;
const db = axios.create({
	baseURL: 'https://gallery-database.herokuapp.com'
	// baseURL: 'https://localhost:3000'
});

module.exports = { db };
