const num = 3;  // ban threshold
const timee = 10; // time window in seconds

module.exports.config = {
	name: "antispam",
	version: "1.0.0",
	permission: 0,
	credits: "Emon",
	description: "Auto-ban spammers",
	prefix: true,
	category: "system",
	usages: "none",
	cooldowns: 5,
};

module.exports.languages = { "vi": {}, "en": {} };

module.exports.run = async function({ api, event }) {
	return api.sendMessage(
		`╔══════════════════╗\n   🛡️ ANTI SPAM   \n╚══════════════════╝\n\n✅ Anti-Spam System সক্রিয়!\n\n⚙️ নিয়ম :\n▸ ${timee} সেকেন্ডে ${num} বার spam করলে ban\n▸ Ban automatically উঠে যাবে ${timee}s পরে\n\n══════════════════\n💎 EMon-BHai-BOT`,
		event.threadID, event.messageID
	);
};

module.exports.handleEvent = async function({ Users, Threads, api, event }) {
	let { senderID, messageID, threadID } = event;
	var datathread = (await Threads.getData(event.threadID)).threadInfo;

	if (!global.client.autoban) global.client.autoban = {};
	if (!global.client.autoban[senderID]) {
		global.client.autoban[senderID] = { timeStart: Date.now(), number: 0 };
	}

	const threadSetting = global.data.threadData.get(threadID) || {};
	const prefix = threadSetting.PREFIX || global.config.PREFIX;
	if (!event.body || event.body.indexOf(prefix) != 0) return;

	if ((global.client.autoban[senderID].timeStart + (timee * 1000)) <= Date.now()) {
		global.client.autoban[senderID] = { timeStart: Date.now(), number: 0 };
	} else {
		global.client.autoban[senderID].number++;
		if (global.client.autoban[senderID].number >= num) {
			var namethread = datathread.threadName;
			const moment = require("moment-timezone");
			const timeDate = moment.tz("Asia/Manila").format("DD/MM/YYYY HH:mm:ss");
			let dataUser = await Users.getData(senderID) || {};
			let data = dataUser.data || {};
			if (data && data.banned == true) return;
			data.banned = true;
			data.reason = `spam bot ${num} times/${timee}s`;
			data.dateAdded = timeDate;
			await Users.setData(senderID, { data });
			global.data.userBanned.set(senderID, { reason: data.reason, dateAdded: data.dateAdded });
			global.client.autoban[senderID] = { timeStart: Date.now(), number: 0 };

			api.sendMessage(
				`╔══════════════════╗\n   🚫 SPAM DETECTED   \n╚══════════════════╝\n\n👤 ${dataUser.name}\n🔖 UID : ${senderID}\n❌ কারণ : ${num} বার spam/${timee}s\n⏱️ ${timee} সেকেন্ড পরে ban উঠবে\n\n══════════════════\n🛡️ Anti-Spam System`,
				threadID,
				() => {
					var idad = global.config.ADMINBOT;
					for (let ad of idad) {
						api.sendMessage(
							`╔══════════════════╗\n   🚨 SPAM ALERT   \n╚══════════════════╝\n\n👤 নাম : ${dataUser.name}\n🔖 UID : ${senderID}\n💬 Group : ${namethread}\n🔖 Group ID : ${threadID}\n❌ Spam : ${num}/${timee}s\n📅 সময় : ${timeDate}`,
							ad
						);
					}
				}
			);
		}
	}
};
