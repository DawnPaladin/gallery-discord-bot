// startup: Node environment
require('dotenv').config();
const fs = require('fs');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const { prefix, databaseName } = require('./config.json');

// startup: Discord
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

// startup: database
const Sequelize = require('sequelize');
const sequelize = new Sequelize(databaseName, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
	host: 'localhost',
	dialect: 'postgres',
	logging: false
});

// startup: initialize constants
const messageExpirationTime = 1000 * 60 * 5; // 5 minutes

// starup: load command files
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log("Starting gallery-bot");
});
client.login(process.env.BOT_TOKEN);
// startup complete

client.on('message', message => {

	if (message.content.startsWith(prefix)) {
		const input = message.content.slice(prefix.length).trim().split(' ');
		const command = input.shift().toLowerCase();
		const args = input.join(' ');

		if (!client.commands.has(command)) return;
		try {
			client.commands.get(command).execute(message, args);
		} catch (error) {
			console.error(error);
			message.reply("Sorry, I didn't understand that.");
		}
	}

	message.attachments.each(attachment => {
		console.log("Detected ", attachment.name)
		message.channel.send(`Thanks for sharing your work, <@${message.author.id}>! Would you like ${attachment.name} shown in our gallery?

Options: :regional_indicator_a: Always, :thumbsup: Yes please, :thumbsdown: No thank you, :regional_indicator_n: No, and don't ask me again`)
		.then(async sentMessage => {
			try {
				await sentMessage.react('🇦');
				await sentMessage.react('👍');
				await sentMessage.react('👎');
				await sentMessage.react('🇳');
			} catch(err) { return }
			const reactjiFilter = (reaction, user) => {
				return user.id === message.author.id && ['🇦', '👍', '👎', '🇳'].includes(reaction.emoji.name)
			}		
			sentMessage.awaitReactions(reactjiFilter, { max: 1, time: messageExpirationTime, errors: ['time'] })
				.then(collected => {
					sentMessage.channel.send("Received " + collected.firstKey());
					sentMessage.delete();
				})
				.catch(() => { return })
			;
			sentMessage.delete({ timeout: messageExpirationTime });
		}).catch(() => { return });
	});
});
