require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log("Starting gallery-bot");
});
client.login(process.env.BOT_TOKEN);

client.on('message', message => {
	if (message.content === '!ping') {
		message.channel.send('Pong.');
	}
})