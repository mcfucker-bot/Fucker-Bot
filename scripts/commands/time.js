module.exports.config = {
	name: "time",
	version: "1.0.3",
	permission: 0,
	credits: "EMon-BHai",
	prefix: 'awto',
	description: "Show current date and time",
	category: "user",
	cooldowns: 5,
	dependencies: { axios: "" }
};

module.exports.run = async function({ api, event, args, Users }) {
	const moment = require("moment-timezone");
	const time = moment.tz("Asia/Dhaka").format("hh:mm:ss A");
	const date = moment.tz("Asia/Dhaka").format("DD MMMM YYYY, dddd");
	let data = await api.getUserInfo(event.senderID);
	let name = (data && data[event.senderID]) ? data[event.senderID].name : "বন্ধু";

	return api.sendMessage(
		`╔══════════════════╗\n   🕐 DATE & TIME   \n╚══════════════════╝\n\n👋 হ্যালো, ${name}!\n\n🕐 সময় : ${time}\n📅 তারিখ : ${date}\n🌍 টাইমজোন : Asia/Dhaka\n\n══════════════════\n💎 EMon-BHai-BOT`,
		event.threadID, event.messageID
	);
};
