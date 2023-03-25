const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const changelogs = require('../../schemas/changelogs/changelogs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('changelogs')
        .setDescription('Show last bot changelogs'),
    async execute(interaction, client) {
        changelogs.findOne({}).sort({ date: -1 }).exec(async (err, data) => {
            if (err) throw err;
            if (!data) interaction.reply({ content: `No changelogs exist`, ephemeral: true });
            if (data) {
                const embed = new EmbedBuilder()
                    .setTitle(!data.config.title ? `${client.user.username} Changelogs` : data.config.title)
                    .setDescription(!data.config.description ? 'A new changelogs is here!' : data.config.description)
                    .setFooter({ text: `${!data.config.footer ? `${client.user.username} Changelogs` : `${data.config.footer}`} ${!data.config.type ? `| Bot` : `| ${data.config.type}`}`, iconURL: client.user.avatarURL() })
                    .setColor(!data.config.color ? 'White' : data.config.color)

                interaction.reply({ embeds: [embed], ephemeral: true });
            }
        });
    }
}
