const { Tags } = require('../database');

module.exports = {
	name: 'deletetag',
	description: 'Delete a tag',
	async execute(message, args) {
		if (args.length == 0) {
			message.channel.send("This command deletes a tag. Example: To delete the `doomed` tag, type `!deletetag doomed`");
		} else {
			try {
				const tagName = args[0];
				const rowCount = await Tags.destroy({ where: { name: tagName }});
				if (rowCount == 0) {
					return message.channel.send(`Tag \`${tagName}\` not found.`);
					// TODO: Confirm tag deletion
				} else {
					return message.channel.send(`Tag \`${tagName}\` deleted.`);
				}
			} catch (error) {
				console.error(error);
				return message.channel.send("Couldn't delete the \`${tagName}\` tag. Something went wrong.");
			}
		}
	},
};