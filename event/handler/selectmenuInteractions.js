const {
  AnySelectMenuInteraction,
  Client,
  EmbedBuilder,
  PermissionsBitField,
  Events,
  WebhookClient,
} = require("discord.js");

const fs = require("fs");

/**
 *
 * @param {Client} client
 * @param {fs} fs
 */
module.exports = async (client, fs) => {
  client.on(
    Events.InteractionCreate,

    /**
     *
     * @param {AnySelectMenuInteraction} interaction
     */
    async (interaction) => {
      if (interaction.guild.id !== process.env.ADMINGUILDID) return;
      try {
        if (interaction.isAnySelectMenu()) {
          const { guild, member } = interaction;

          const blacklistDB = require("../schema/blacklistDB");

          const redEmbed = new EmbedBuilder().setColor("FF0000");

          const selectmenu = client.selectmenus.get(interaction.customId);

          if (!selectmenu)
            return (
              interaction.reply({
                embeds: [
                  redEmbed.setTitle(`❌ The Select Menu is not registered.`),
                ],
                ephemeral: true,
              }) && client.selectmenus.delete(interaction.customId)
            );

          try {
            return await selectmenu.execute(interaction, client);
          } catch (error) {
            console.log(`❌ FAILED to execute the Select Menus\n${error}`);

            return interaction.reply({
              embeds: [
                redEmbed.setTitle(
                  `❌ FAILED to execute the Select Menus\n${error}`
                ),
              ],
              ephemeral: true,
            });
          }
        }
      } catch (error) {
        console.log(`❌ FAILED to execute the Select Menus\n${error}`);
      }
    }
  );
};
