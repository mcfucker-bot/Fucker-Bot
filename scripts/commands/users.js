module.exports.config = {
  name: "users",
  version: "1.0.0",
  permission: 2,
  credits: "Emon",
  prefix: true,
  description: "Search user info in database",
  category: "admin",
  usages: "users [search name/ID]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args, Users }) {
  const { threadID, messageID } = event;

  if (!args[0]) return api.sendMessage(
    `╔══════════════════╗\n   👥 USERS HELP   \n╚══════════════════╝\n\n📌 ব্যবহার : users [নাম / ID]\n📝 উদাহরণ : users Emon`,
    threadID, messageID
  );

  try {
    const query = args.join(" ").toLowerCase();
    const allUsers = [...(global.data.allUserID || [])];
    const matches = [];

    for (const uid of allUsers) {
      try {
        const userData = await Users.getData(uid);
        if (userData.name && (userData.name.toLowerCase().includes(query) || uid.includes(query))) {
          matches.push({ id: uid, name: userData.name });
          if (matches.length >= 10) break;
        }
      } catch (e) { continue; }
    }

    if (matches.length === 0) return api.sendMessage(
      `╔══════════════════╗\n   👥 USER SEARCH   \n╚══════════════════╝\n\n❌ "${args.join(" ")}" নামের কোনো user পাওয়া যায়নি।`,
      threadID, messageID
    );

    let msg = `╔══════════════════╗\n   👥 USER SEARCH   \n╚══════════════════╝\n\n🔍 "${args.join(" ")}" এর জন্য ${matches.length}টি result:\n\n`;
    matches.forEach((u, i) => {
      msg += `${i + 1}. 👤 ${u.name}\n   🔖 ID : ${u.id}\n   🔗 https://fb.com/${u.id}\n\n`;
    });
    msg += `══════════════════\n💎 EMon-BHai-BOT`;
    return api.sendMessage(msg, threadID, messageID);
  } catch (err) {
    console.error(err);
    return api.sendMessage(`❌ সমস্যা হয়েছে।`, threadID, messageID);
  }
};
