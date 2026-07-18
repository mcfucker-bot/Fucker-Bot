const axios = require('axios');

module.exports.config = {
	name: "quotes",
	version: "1.0.0",
	permission: 0,
	credits: "Emon",
	description: "Get a random inspirational quote",
	prefix: false,
	category: "without prefix",
	usages: "quotes",
	cooldowns: 5,
};

module.exports.run = async function({ api, event }) {
	try {
		const response = await axios.get('https://api.quotable.io/random');
		const quote = response.data;
		api.sendMessage(
			`╔══════════════════╗\n   💬 DAILY QUOTE   \n╚══════════════════╝\n\n❝ ${quote.content} ❞\n\n══════════════════\n✍️ — ${quote.author}`,
			event.threadID, event.messageID
		);
	} catch (error) {
		console.error(error);
		api.sendMessage(`❌ Quote আনতে সমস্যা হয়েছে। আবার চেষ্টা করো।`, event.threadID, event.messageID);
	}
};
