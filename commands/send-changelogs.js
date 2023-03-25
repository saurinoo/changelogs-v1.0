const { SlashCommandBuilder, PermissionFlagsBits, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
    developer: true, // Only work with additional code on the interactionCreate event
    data: new SlashCommandBuilder()
        .setName('send-changelogs')
        .setDescription('Send a new bot changelogs')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        if (interaction.user.id !== 'YOUR ID HERE') return; // Use this if you can't use the "developer: true" above
        
        const modal = new ModalBuilder()
            .setCustomId('changelogs')
            .setTitle('Send changelogs');

        const title = new TextInputBuilder()
            .setCustomId('changelogs-title')
            .setLabel("Changelogs title")
            .setStyle(TextInputStyle.Short)
            .setRequired(false)
            .setMaxLength(30)
            .setPlaceholder('April changelogs');

        const description = new TextInputBuilder()
            .setCustomId('changelogs-description')
            .setLabel("Changelogs description")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true)
            .setMaxLength(500)
            .setPlaceholder('Fixed bugs related to the help command');

        const footer = new TextInputBuilder()
            .setCustomId('changelogs-footer')
            .setLabel("Embed footer")
            .setStyle(TextInputStyle.Short)
            .setRequired(false)
            .setMaxLength(20)
            .setPlaceholder('monthly update');

        const color = new TextInputBuilder()
            .setCustomId('changelogs-color')
            .setLabel("Embed color")
            .setStyle(TextInputStyle.Short)
            .setRequired(false)
            .setMaxLength(7)
            .setMinLength(7)
            .setPlaceholder('#ffffff || #000000');

        const type = new TextInputBuilder()
            .setCustomId('changelogs-type')
            .setLabel("Changelogs type")
            .setStyle(TextInputStyle.Short)
            .setRequired(false)
            .setMaxLength(20)
            .setPlaceholder('new commands implemented | bugs fixed | optimization');

        const titleActionRow = new ActionRowBuilder().addComponents(title);
        const descriptionActionRow = new ActionRowBuilder().addComponents(description);
        const footerActionRow = new ActionRowBuilder().addComponents(footer);
        const colorActionRow = new ActionRowBuilder().addComponents(color);
        const typeActionRow = new ActionRowBuilder().addComponents(type);

		modal.addComponents(titleActionRow, descriptionActionRow, footerActionRow, colorActionRow, typeActionRow);

		await interaction.showModal(modal);

    }
}
