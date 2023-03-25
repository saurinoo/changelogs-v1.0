const { EmbedBuilder } = require('discord.js');
const changelogs = require('../../schemas/changelogs/changelogs');
const currentDate = new Date().toISOString();

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isModalSubmit()) return;

        const { customId, fields } = interaction;

        if (customId !== 'changelogs') return;
        
        function isValidHexColor(str) {
            return /^#[0-9A-F]{6}$/i.test(str);
          }

        const title = fields.getTextInputValue('changelogs-title');
        const description = fields.getTextInputValue('changelogs-description');
        const footer = fields.getTextInputValue('changelogs-footer');
        const color = fields.getTextInputValue('changelogs-color');
        const type = fields.getTextInputValue('changelogs-type');

        changelogs.findOne({ date: currentDate }, (err, data) => {
            if (err) throw err;
            if (!data) {
                changelogs.create({
                    date: Date.now(),
                    config: {
                        title: !title ? null : title,
                        description: description,
                        footer: !footer ? null : footer,
                        color: isValidHexColor(color) ? color : null,
                        type: !type ? null : type
                    }
                })
                const embed = new EmbedBuilder()
                    .setDescription(`\`📍\` **Changelogs embed information**
                    
                    > |\`✏️\` **Title -** ${!title ? `${client.user.username} Changelogs` : title}
                    > |\`🧾\` **Description -** ${!description ? 'A new changelogs is here!' : description}
                    > |\`📌\` **Footer -** ${!footer ? `${client.user.username} Changelogs` : `${footer}`} ${!type ? `| Bot` : `| ${type}`}
                    > |\`🎨\` **Color -** \`${!color ? '#ffffff' : color}\``)
                    .setColor('#a2d2ff')
                return interaction.reply({ embeds: [embed], ephemeral: true });
            }
            if (data) return interaction.reply({ content: `A changelog created in this second was found, wait at least one second before sending another one`, ephemeral: true });
        })
    }
}
