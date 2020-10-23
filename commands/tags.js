const { db } = require('../database');

module.exports = {
	name: 'tags',
	description: 'Show all tags',
	async execute(message, args) {
		const tagList = await db.get('/tags.json')
			.then(response => {
				if (response.data) {
					console.log(response.data);
					return response.data;
				} else {
					console.error("Error retrieving tags", response)
				}
			})

		const tagString = tagList.map(t => '`'+t.name+'`').join(', ');
		if (tagList.length > 0) {
			return message.channel.send(`There are ${tagList.length} tags: ${tagString}`);
		} else {
			return message.channel.send("There are 0 tags.")
		}
	}
};