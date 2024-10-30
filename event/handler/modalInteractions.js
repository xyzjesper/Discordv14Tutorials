const {
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
  PermissionsBitField,
  InteractionType,
  Events,
  WebhookClient,
} = require("discord.js");
const fs = require("fs");

/**
 *
 * @param {Client} client
 * @param {fs} fs
 * @param {AsciiTable} ascii
 */
module.exports = async (client, fs, ascii) => {
  client.on(
    Events.InteractionCreate,

    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async (interaction) => {
      if (interaction.guild.id !== process.env.ADMINGUILDID) return;
      try {
        if (!interaction.isModalSubmit()) return;
        const { guild, member } = interaction;

        const redEmbed = new EmbedBuilder().setColor("FF0000");

        if (interaction.type !== InteractionType.ModalSubmit) return;

        const modal = client.modals.get(interaction.customId);

        if (!modal)
          return (
            interaction.reply({
              embeds: [
                redEmbed.setTitle(
                  `❌ The Model with the ID \`${interaction.customId}\` was not found.`
                ),
              ],
              ephemeral: true,
            }) && client.modals.delete(interaction.customId)
          );

        try {
          return await modal.execute(interaction, client);
        } catch (error) {
          console.log(`❌ Error from Modal Interaction \n${error}`);

          return interaction.reply({
            embeds: [redEmbed.setTitle(`❌ Error from Interaction.`)],
            ephemeral: true,
          });
        }
      } catch (error) {
        console.log(`❌ Error from Modal Interaction \n${error}`);
      }
    }
  );
};
