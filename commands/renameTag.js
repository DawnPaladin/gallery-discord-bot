const { Tags } = require('../database');

module.exports = {
	name: 'renametag',
	description: 'Rename a tag',
	async execute(message, args) {
		if (args.length == 0) {
			message.channel.send("This command renames a tag. Example: To rename `pics` to `pictures`, type `/renametag pics pictures`")
		} else {
			try {
				const oldName = args[0];
				const newName = args[1];
				if (oldName && newName) {
					const affectedRows = await Tags.update({ name: newName }, { where: { name: oldName }});
					if (affectedRows > 0) { 
						return message.channel.send(`Renamed \`${oldName}\` to \`${newName}\``);
					} else {
						return message.channel.send(`Couldn't find \`${oldName}\` tag.`)
					}
				} else {
					return message.channel.send("Please specify two tag names, separated by a space, like this: `/renametag pics pictures`")
				}
			} catch (error) {
				if (error.name === 'SequelizeUniqueConstraintError') {
					return message.channel.send("That tag already exists.")
				}
				console.error(error);
				return message.channel.send("Couldn't rename tag. Something went wrong.");
			}
		}
	},
};