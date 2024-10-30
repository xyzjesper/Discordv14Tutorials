const { Client } = require("discord.js");
const fs = require("fs");

/**
 *
 * @param {Client} client
 * @param {fs} fs
 * @param {AsciiTable} ascii
 */
module.exports = async (client, fs, ascii) => {
  await client.selectmenus.clear();

  const selectmenuFiles = fs
    .readdirSync(`${process.cwd()}/event/selectmenu`)
    .filter((file) => file.endsWith(".js"));

  selectmenuFiles.forEach((files) => {
    files = files.replace(".js", "");

    const selectmenu = require(`${process.cwd()}/event/selectmenu/${files}`);

    if (!selectmenu.id)
      return console.log(
        `${files || "MISSING"}`,
        `❌ FAILED`,
        "missing a id"
      );

    client.selectmenus.set(selectmenu.id, selectmenu);
  });
};
