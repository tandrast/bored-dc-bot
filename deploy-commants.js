const dotenv = require('dotenv');
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

// setup enviroment variables
dotenv.config();

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
	try {
        await rest.put(
            // slash commands on a server
			Routes.applicationGuildCommands(process.env.APP_ID, process.env.GUILD_ID),
            { body: commands },
		);
		
        /*await rest.put(
            // slash commands in direct messages
            Routes.applicationCommands(process.env.APP_ID),
			{ body: commands },
		);*/

		console.log('Successfully registered application commands.');
	} catch (error) {
		console.error(error);
	}
})();
