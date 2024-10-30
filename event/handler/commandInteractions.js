const {
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
  Events,
  PermissionFlagsBits,
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
     * @param {ChatInputCommandInteraction} interaction
     */
    async (interaction) => {
      if (interaction.guild.id !== process.env.ADMINGUILDID) return;
      try {
        if (
          interaction.isCommand() ||
          interaction.isChatInputCommand() ||
          interaction.isContextMenuCommand()
        ) {
          const redEmbed = new EmbedBuilder().setColor("FF0000");

          if (
            interaction.isChatInputCommand() ||
            interaction.isContextMenuCommand()
          ) {
            const command = client.commands.get(interaction.commandName);

            const subCommand = interaction.options.getSubcommand(false);

            const subCommandFile = client.subCommands.get(
              `${interaction.commandName}.${subCommand}`
            );
            if (!command)
              return (
                interaction.reply({
                  embeds: [
                    redEmbed.setTitle(
                      "❌ Dieser Command existiert nicht mehr."
                    ),
                  ],
                  ephemeral: true,
                }) && client.commands.delete(interaction.commandName)
              );

            try {
              if (subCommand) {
                if (!subCommandFile)
                  return interaction.reply({
                    embeds: [
                      redEmbed.setTitle("❌ The Command was not Found..."),
                    ],
                    ephemeral: true,
                  });

                return subCommandFile.execute(interaction, client);
              } else return command.execute(interaction, client);
            } catch (error) {
              console.log("❌ The Command has a Internal Error: \n" + error);

              if (interaction.deferred || interaction.replied)
                return interaction.editReply({
                  embeds: [redEmbed.setTitle(`❌ Error from Interaction.`)],
                  ephemeral: true,
                });

              return interaction.reply({
                embeds: [redEmbed.setTitle(`❌ Error from Interaction..`)],
                ephemeral: true,
              });
            }
          }
        }
      } catch (error) {
        console.log("❌ The Command has a Internal Error: \n" + error);

        if (interaction.deferred || interaction.replied)
          return interaction.editReply({
            embeds: [redEmbed.setTitle(`❌ Error from Interaction.`)],
            ephemeral: true,
          });

        return interaction.reply({
          embeds: [redEmbed.setTitle(`❌ Error from Interaction..`)],
          ephemeral: true,
        });
      }
    }
  );
};
