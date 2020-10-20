const { Tags } = require('../database');

module.exports = {
	name: 'tags',
	description: 'Show all tags',
	async execute(message, args) {
		const tagList = await Tags.findAll({ attributes: ['name'] });
		const tagString = tagList.map(t => '`'+t.name+'`').join(', ');
		if (tagList.length > 0) {
			return message.channel.send(`There are ${tagList.length} tags: ${tagString}`);
		} else {
			return message.channel.send("There are 0 tags.")
		}
	}
};