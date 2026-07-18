//**credits Fb id : https://m.me/EMon.BHai.FACEBOOK **//
module.exports.config = {
	name: "shoti",
	version: "1.0.0",
	permission: 0,
	credits: "Emon",
	prefix: 'awto',
	description: "Get a random short video",
	category: "user",
	usages: "shoti",
	cooldowns: 5,
	dependencies: { "request": "", "fs-extra": "", "axios": "" }
};

module.exports.run = async ({ api, event, args }) => {
	api.setMessageReaction("⏳", event.messageID, (err) => {}, true);
	api.sendTypingIndicator(event.threadID, true);

	const { messageID, threadID } = event;
	const fs = require("fs");
	const axios = require("axios");
	const request = require("request");

	api.setMessageReaction("⏳", messageID, () => {}, true);

	try {
		const response = await axios.post(`https://shoti-srv1.onrender.com/api/v1/get`, { apikey: `$shoti-1hg4gifgnlfdmeslom8` });

		let path = __dirname + `/cache/shoti.mp4`;
		const file = fs.createWriteStream(path);
		const rqs = request(encodeURI(response.data.data.url));
		rqs.pipe(file);

		file.on(`finish`, () => {
			setTimeout(function() {
				api.setMessageReaction("✅", event.messageID, (err) => {}, true);
				return api.sendMessage({
					body: `╔══════════════════╗\n   🎬 SHORT VIDEO   \n╚══════════════════╝\n\n👤 Username : @${response.data.data.user.username}\n💬 Nickname : ${response.data.data.user.nickname}\n\n══════════════════\n💎 EMon-BHai-BOT`,
					attachment: fs.createReadStream(path)
				}, threadID);
			}, 5000);
		});

		file.on(`error`, (err) => {
			api.sendMessage(`❌ ভিডিও লোড করতে সমস্যা : ${err}`, threadID, messageID);
		});
	} catch (err) {
		api.sendMessage(`❌ সমস্যা হয়েছে, আবার চেষ্টা করো।`, threadID, messageID);
	}
};
