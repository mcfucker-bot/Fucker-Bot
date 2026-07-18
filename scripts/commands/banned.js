module.exports.config = {
	name: "banned",
	version: "1.0.0",
	permission: 2,
	credits: "NTKhang",
	prefix: true,
	description: "View ban list for users or threads",
	category: "admin",
	usages: "banned [user / thread]",
	cooldowns: 5,
};

module.exports.run = async function({ api, args, Users, event, Threads }) {
	const { threadID, messageID } = event;

	if (args[0] == "user") {
		var list = global.data.userBanned || [];
		var listuserbanned = [];
		for (var iduser of list) {
			const banned = (await Users.getData(iduser)).banned;
			if (banned == 1) listuserbanned.push({ id: iduser });
		}

		if (listuserbanned.length === 0) {
			return api.sendMessage(
				`╔══════════════════╗\n   🚫 BAN LIST   \n╚══════════════════╝\n\n✅ বর্তমানে কোনো user ban নেই।`,
				threadID, messageID
			);
		}

		var msg = `╔══════════════════╗\n   🚫 BANNED USERS   \n╚══════════════════╝\n\n`;
		for (let i = 0; i < listuserbanned.length; i++) {
			const name = (await Users.getData(listuserbanned[i].id)).name;
			msg += `${i + 1}. 👤 ${name}\n   🔖 ID : ${listuserbanned[i].id}\n\n`;
		}
		msg += `══════════════════\n💎 EMon-BHai-BOT`;
		return api.sendMessage(msg, threadID, messageID);

	} else if (args[0] == "thread") {
		var list = global.data.threadBanned || [];
		var listthreadbanned = [];
		for (var idthread of list) {
			const banned = (await Threads.getData(idthread)).banned;
			if (banned == 1) listthreadbanned.push({ id: idthread });
		}

		if (listthreadbanned.length === 0) {
			return api.sendMessage(
				`╔══════════════════╗\n   🚫 BAN LIST   \n╚══════════════════╝\n\n✅ বর্তমানে কোনো group ban নেই।`,
				threadID, messageID
			);
		}

		var msg = `╔══════════════════╗\n   🚫 BANNED THREADS   \n╚══════════════════╝\n\n`;
		for (let i = 0; i < listthreadbanned.length; i++) {
			let namethread = (await api.getThreadInfo(listthreadbanned[i].id)).threadName;
			msg += `${i + 1}. 💬 ${namethread}\n   🔖 ID : ${listthreadbanned[i].id}\n\n`;
		}
		msg += `══════════════════\n💎 EMon-BHai-BOT`;
		return api.sendMessage(msg, threadID, messageID);

	} else {
		return api.sendMessage(
			`╔══════════════════╗\n   🚫 BAN LIST HELP   \n╚══════════════════╝\n\n📌 ব্যবহার :\n▸ banned user — user ban list\n▸ banned thread — group ban list`,
			threadID, messageID
		);
	}
};
