module.exports.config = {
	name: "reminder",
	version: "0.0.1",
	permission: 0,
	credits: "Emon",
	prefix: true,
	description: "Set a reminder notification",
	category: "system",
	usages: "[seconds] [message]",
	cooldowns: 5
};

module.exports.run = async function({ api, event, args, Users }) {
	const time = args[0];
	const text = args.join(" ").replace(time, "").trim();

	if (isNaN(time)) return api.sendMessage(
		`╔══════════════════╗\n   ⏰ REMINDER HELP   \n╚══════════════════╝\n\n📌 ব্যবহার :\n▸ reminder [সময়] [মেসেজ]\n\n📝 উদাহরণ :\n▸ reminder 60 নামাজের সময় হয়েছে\n\n⏱️ সময় হিসাব :\n▸ 59 = 59 সেকেন্ড\n▸ 3600 = 1 ঘন্টা`,
		event.threadID, event.messageID
	);

	const display = time > 59 ? `${Math.round(time / 60)} মিনিট` : `${time} সেকেন্ড`;
	api.sendMessage(
		`╔══════════════════╗\n   ⏰ REMINDER SET   \n╚══════════════════╝\n\n✅ রিমাইন্ডার সেট হয়েছে!\n⏱️ ${display} পরে মনে করিয়ে দেবো।`,
		event.threadID, event.messageID
	);

	await new Promise(resolve => setTimeout(resolve, time * 1000));
	var threadInfoData = await api.getThreadInfo(event.threadID);
	var nickname = (threadInfoData.nicknames && threadInfoData.nicknames[event.senderID]) ? threadInfoData.nicknames[event.senderID] : null;
	var value = nickname || (await Users.getInfo(event.senderID)).name || "বন্ধু";

	return api.sendMessage({
		body: `╔══════════════════╗\n   🔔 REMINDER!   \n╚══════════════════╝\n\n${value}, ${text ? `\n📌 মনে করিয়ে দিচ্ছি :\n❝ ${text} ❞` : `তুমি আমাকে কিছু মনে করিয়ে দিতে বলেছিলে! 😊`}`,
		mentions: [{ tag: value, id: event.senderID }]
	}, event.threadID, event.messageID);
};
