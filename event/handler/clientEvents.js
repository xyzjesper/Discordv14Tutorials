const { Client } = require("discord.js");
const fs = require("fs");

/**
 *
 * @param {Client} client
 * @param {fs} fs
 */
module.exports = async (client, fs) => {
	const clientEventFiles = fs
		.readdirSync(`${process.cwd()}/event/client`)
		.filter((file) => file.endsWith(".js"));

	clientEventFiles.forEach((files) => {
		files = files.replace(".js", "");

		const event = require(`${process.cwd()}/event/client/${files}`);
		const exec = (...args) => event.execute(...args, client);

		if (!event.name)
			return console.log(
				`${files || "MISSING"}`,
				`❌ FAILED`,
				"missing a name"
			);

		if (!event.once) return client.on(event.name, exec);

		client.once(event.name, exec);
	});
};