const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRoles } = require("../helpers/get-cur-roles");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('get-roles')
		.setDescription('Returns the current roles!'),
	async execute(interaction) {
		let roles = getRoles();
		let reply = "";
		reply += "A csapat jegyzetelői: ";
		for(let i = 0; i < roles.groupAw.length; i++){
			await interaction.guild.members.fetch(roles.groupAw[i]).then(resp => reply += (resp.nickname || resp.user.username) + " ");
		};
		reply += "\n";

		reply += "B csapat jegyzetelői: ";
		for(let i = 0; i < roles.groupBw.length; i++){
			await interaction.guild.members.fetch(roles.groupBw[i]).then(resp => reply += (resp.nickname || resp.user.username) + " ");
		};
		reply += "\n";

		reply += "A csapat moderátorai: ";
		for(let i = 0; i < roles.groupAm.length; i++){
			await interaction.guild.members.fetch(roles.groupAm[i]).then(resp => reply += (resp.nickname || resp.user.username) + " ");
		};
		reply += "\n";

		reply += "B csapat moderátorai: ";
		for(let i = 0; i < roles.groupBm.length; i++){
			await interaction.guild.members.fetch(roles.groupBm[i]).then(resp => reply += (resp.nickname || resp.user.username) + " ");
		}
		reply += "\n";

		await interaction.reply(reply);
	},
}