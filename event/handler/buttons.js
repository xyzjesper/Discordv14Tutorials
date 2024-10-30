const { Client } = require("discord.js");
const fs = require("fs");

/**
 *
 * @param {Client} client
 * @param {fs} fs
 */
module.exports = async (client, fs) => {
  await client.buttons.clear();

  const buttonFiles = fs
    .readdirSync(`${process.cwd()}/event/button`)
    .filter((file) => file.endsWith(".js"));

  buttonFiles.forEach((files) => {
    files = files.replace(".js", "");

    const button = require(`${process.cwd()}/event/button/${files}`);

    if (!button.id)
      return console.log(
        `${files || "MISSING"}`,
        `❌ FAILED`,
        "missing a id"
      );

    client.buttons.set(button.id, button);
  });
};
