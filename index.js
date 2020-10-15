require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
// const { prefix } = require('./config.json');

const messageExpirationTime = 1000 * 60 * 5; // 5 minutes

client.once('ready', () => {
	console.log("Starting gallery-bot");
});
client.login(process.env.BOT_TOKEN);

client.on('message', message => {
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
})