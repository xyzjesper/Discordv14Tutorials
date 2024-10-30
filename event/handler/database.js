const { Client } = require("discord.js");
const fs = require("fs");

/**
 *
 * @param {Client} client
 * @param {fs} fs
 * @param {AsciiTable} ascii
 */
module.exports = async (client, fs, ascii) => {
  const dataBaseFiles = fs
    .readdirSync("./event/schema")
    .filter((file) => file.endsWith(".js"));

  dataBaseFiles.forEach((files) => {
    files = files.replace(".js", "");
  });
};
