const { Client } = require("discord.js");
const fs = require("fs");
/**
 *
 * @param {Client} client
 * @param {fs} fs
 * @param {AsciiTable} ascii
 */
module.exports = async (client, fs, ascii) => {
  await client.commands.clear();
  await client.subCommands.clear();

  const commandFiles = fs
    .readdirSync(`${process.cwd()}/command`)
    .filter((file) => file.endsWith(".js"));

  const subCommandFiles = fs
    .readdirSync(`${process.cwd()}/command/subCommand`)
    .filter((file) => file.endsWith(".js"));

  commandFiles.forEach((files) => {
    files = files.replace(".js", "");

    const command = require(`${process.cwd()}/command/${files}`);

    if (!command.data.name)
      return console.log(
        `${files || "MISSING"}`,
        `❌ FAILED`,
        "missing a name"
      );

    if (!command.context && !command.data.description)
      return console.log(
        `${command.data.name}`,
        `❌ FAILED`,
        "missing a description"
      );

    client.commands.set(command.data.name, command);
  });

  subCommandFiles.forEach((files) => {
    files = files.replace(".js", "");

    const command = require(`${process.cwd()}/command/subCommand/${files}`);

    if (!command.subCommand)
      return console.log(
        `${files || "MISSING"}`,
        `❌ FAILED`,
        "missing a subCommand"
      );

    client.subCommands.set(command.subCommand, command);
  });
};
