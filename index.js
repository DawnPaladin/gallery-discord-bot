require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
// const { prefix } = require('./config.json');

client.once('ready', () => {
	console.log("Starting gallery-bot");
});
client.login(process.env.BOT_TOKEN);

client.on('message', message => {
	message.attachments.each(attachment => {
		console.log("Name: ", attachment.name)
		message.channel.send(`Thanks for sharing your work! Would you like your work shown in our gallery?

Options: :regional_indicator_a: Always, :thumbsup: Yes please, :thumbsdown: No thank you, :regional_indicator_n: No, and don't ask me again`).then(sentMessage => {
			sentMessage.react('🇦')
				.then(() => sentMessage.react('👍'))
				.then(() => sentMessage.react('👎'))
				.then(() => sentMessage.react('🇳'))
		})
	});
})