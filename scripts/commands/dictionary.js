module.exports.config = {
	name: "dictionary",
	version: "1.0.0",
	permission: 0,
	credits: "DungUwU",
	description: "Look up word definitions",
	prefix: false,
	category: "study",
	usages: "[word]",
	cooldowns: 5
};

module.exports.run = function({ api, event, args }) {
	const { threadID, messageID } = event;

	if (!args[0]) return api.sendMessage(
		`╔══════════════════╗\n   📖 DICTIONARY HELP   \n╚══════════════════╝\n\n📌 ব্যবহার : dictionary [word]\n📝 উদাহরণ : dictionary beautiful`,
		threadID, messageID
	);

	require('axios').get(encodeURI(`https://api.dictionaryapi.dev/api/v2/entries/en/${args.join(" ").trim().toLowerCase()}`)).then(res => {
		let data = res.data[0];
		let meanings = data.meanings;
		let phonetics = data.phonetics;

		let phonText = '';
		phonetics.forEach(item => { if (item.text) phonText += `/${item.text}/  `; });

		let meaningText = '';
		meanings.forEach(item => {
			let example = item.definitions[0].example
				? `\n   📝 উদাহরণ : "${item.definitions[0].example[0].toUpperCase() + item.definitions[0].example.slice(1)}"`
				: '';
			meaningText += `\n▸ ${item.partOfSpeech.toUpperCase()}\n   ${item.definitions[0].definition[0].toUpperCase() + item.definitions[0].definition.slice(1)}${example}\n`;
		});

		return api.sendMessage(
			`╔══════════════════╗\n   📖 DICTIONARY   \n╚══════════════════╝\n\n🔤 শব্দ : ${data.word.toUpperCase()}\n🔊 উচ্চারণ : ${phonText || 'N/A'}\n\n══════════════════\n${meaningText}\n══════════════════\n💎 EMon-BHai-BOT`,
			threadID, messageID
		);
	}).catch(err => {
		if (err.response && err.response.status === 404) {
			return api.sendMessage(`❌ "${args.join(" ")}" শব্দটির সংজ্ঞা পাওয়া যায়নি।`, threadID, messageID);
		}
		return api.sendMessage(`❌ সমস্যা হয়েছে, আবার চেষ্টা করো।`, threadID, messageID);
	});
};
