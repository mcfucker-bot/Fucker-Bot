module.exports.config = {
	name: "4k",
	version: "2.0.0",
	permission: 0,
	credits: "Emon",
	description: "Upscale photo to HD quality using jimp",
	prefix: 'awto',
	category: "user",
	usages: "4k [reply to a photo]",
	cooldowns: 10
};

module.exports.run = async function({ api, event }) {
	const Jimp = require("jimp");
	const fs = require("fs-extra");
	const path = require("path");
	const axios = require("axios");
	const { threadID, messageID } = event;

	if (event.type !== "message_reply") return api.sendMessage(
		`╔══════════════════╗\n   🖼️ 4K UPSCALE HELP   \n╚══════════════════╝\n\n📌 কোনো ছবিতে reply দিয়ে এই command দাও।`,
		threadID, messageID
	);
	if (!event.messageReply.attachments || event.messageReply.attachments.length === 0)
		return api.sendMessage(`❌ ছবিতে reply দাও!`, threadID, messageID);
	if (event.messageReply.attachments[0].type !== "photo")
		return api.sendMessage(`❌ এটা ছবি না। ছবিতে reply দাও।`, threadID, messageID);

	api.setMessageReaction("⏳", messageID, () => {}, true);

	const imgUrl = event.messageReply.attachments[0].url;
	const cachePath = path.join(__dirname, "cache", `4k_${event.senderID}.png`);

	try {
		const res = await axios.get(imgUrl, { responseType: "arraybuffer", timeout: 20000 });
		const image = await Jimp.read(Buffer.from(res.data));

		// Upscale 2x using high-quality resize
		image.scale(2, Jimp.RESIZE_BICUBIC);
		await image.writeAsync(cachePath);

		api.setMessageReaction("✅", messageID, () => {}, true);
		return api.sendMessage({
			body: `╔══════════════════╗\n   🖼️ HD UPSCALED   \n╚══════════════════╝\n\n✅ ছবি 2x HD করা হয়েছে!\n📐 Resolution দ্বিগুণ হয়েছে।\n\n══════════════════\n💎 EMon-BHai-BOT`,
			attachment: fs.createReadStream(cachePath)
		}, threadID, () => {
			try { fs.unlinkSync(cachePath); } catch (e) {}
		});
	} catch (err) {
		api.setMessageReaction("❌", messageID, () => {}, true);
		console.error("[4k.js]", err.message);
		return api.sendMessage(`❌ ছবি upscale করতে সমস্যা হয়েছে।\n▸ ${err.message}`, threadID, messageID);
	}
};
