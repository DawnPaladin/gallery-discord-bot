const { db } = require('../database');

module.exports = {
	name: 'newtag',
	description: 'Create a new tag',
	async execute(message, args) {
		if (args.length == 0) {
			message.channel.send("This command creates a new tag. Example: To create a \"Characters\" tag, type `/newtag Characters`")
		} else {
			try {
				const tagName = args[0];
				db.post('tags.json', {
					name: tagName,
					createdBy: message.author.tag // e.g. DawnPaladin#5461 https://discord.js.org/#/docs/main/stable/class/User?scrollTo=tag
				}).then(response => console.log(response))
				.catch(response => console.warn("Error creating tag", response.toJSON()));
				console.log(tagName, "created by", message.author.tag)
				return message.channel.send(`Created \`${tagName}\` tag.`)
			} catch (error) {
				if (error.name === 'SequelizeUniqueConstraintError') {
					return message.channel.send("That tag already exists.")
				}
				console.error(error);
				return message.channel.send("Couldn't create that tag. Something went wrong.");
			}
		}
	},
};