const { Client } = require("discord.js");
const fs = require("fs");

/**
 *
 * @param {Client} client
 * @param {fs} fs
 * @param {AsciiTable} ascii
 */
module.exports = async (client, fs, ascii) => {
  const createEventFiles = fs
    .readdirSync("./event/createEvent")
    .filter((file) => file.endsWith(".js"));

  createEventFiles.forEach((files) => {
    files = files.replace(".js", "");

    const event = require(`../../event/createEvent/${files}`);
    const exec = (...args) => event.execute(...args, client);

    if (!event.name)
      return console.log(
        `${files}`,
        `❌ FAILED`,
        "missing a name"
      );

    if (!event.once) client.on(event.name, exec);

    client.once(event.name, exec);
  });
};
