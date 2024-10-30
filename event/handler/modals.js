const { Client } = require("discord.js");
const fs = require("fs");

/**
 *
 * @param {Client} client
 * @param {fs} fs
 * @param {AsciiTable} ascii
 */
module.exports = async (client, fs, ascii) => {
  await client.modals.clear();

  const modalFiles = fs
    .readdirSync(`${process.cwd()}/event/modal`)
    .filter((file) => file.endsWith(".js"));

  modalFiles.forEach((files) => {
    files = files.replace(".js", "");

    const modal = require(`${process.cwd()}/event/modal/${files}`);

    if (!modal.id)
      return console.log(
        `${files || "MISSING"}`,
        `❌ FAILED`,
        "missing a id"
      );

    client.modals.set(modal.id, modal);
  });
};
