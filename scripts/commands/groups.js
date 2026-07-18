module.exports.config = {
  name: "group",
  version: "1.0.0",
  permission: 2,
  credits: "Emon",
  prefix: true,
  description: "Ban, unban or search groups in database",
  category: "admin",
  usages: "group [ban/unban/search] [threadID]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args, Threads }) {
  const { threadID, messageID } = event;

  if (!args[0]) return api.sendMessage(
    `╔══════════════════╗\n   🔧 GROUP HELP   \n╚══════════════════╝\n\n📌 ব্যবহার :\n▸ group ban [ID] — group ban\n▸ group unban [ID] — group unban\n▸ group search [name] — search`,
    threadID, messageID
  );

  const action = args[0].toLowerCase();
  const target = args[1];

  if (action === "ban" && target) {
    try {
      await Threads.setData(target, { banned: 1 });
      if (!global.data.threadBanned.has(target)) global.data.threadBanned.set(target, {});
      return api.sendMessage(
        `╔══════════════════╗\n   🚫 GROUP BANNED   \n╚══════════════════╝\n\n✅ Group ban করা হয়েছে!\n🔖 ID : ${target}\n\n══════════════════\n💎 EMon-BHai-BOT`,
        threadID, messageID
      );
    } catch (err) { return api.sendMessage(`❌ Ban করতে সমস্যা হয়েছে।`, threadID, messageID); }
  }

  if (action === "unban" && target) {
    try {
      await Threads.setData(target, { banned: 0 });
      global.data.threadBanned.delete(target);
      return api.sendMessage(
        `╔══════════════════╗\n   ✅ GROUP UNBANNED   \n╚══════════════════╝\n\n✅ Group unban করা হয়েছে!\n🔖 ID : ${target}\n\n══════════════════\n💎 EMon-BHai-BOT`,
        threadID, messageID
      );
    } catch (err) { return api.sendMessage(`❌ Unban করতে সমস্যা হয়েছে।`, threadID, messageID); }
  }

  if (action === "search" && target) {
    const allThreads = [...(global.data.allThreadID || [])];
    const matches = [];
    for (const tid of allThreads) {
      try {
        const info = await api.getThreadInfo(tid);
        if (info.threadName && info.threadName.toLowerCase().includes(target.toLowerCase())) {
          matches.push({ id: tid, name: info.threadName, count: info.participantIDs.length });
          if (matches.length >= 5) break;
        }
      } catch (e) { continue; }
    }
    if (matches.length === 0) return api.sendMessage(`❌ "${target}" নামের কোনো group পাওয়া যায়নি।`, threadID, messageID);
    let msg = `╔══════════════════╗\n   🔍 GROUP SEARCH   \n╚══════════════════╝\n\n${matches.map((g, i) => `${i+1}. 💬 ${g.name}\n   🔖 ${g.id}\n   👥 ${g.count} সদস্য`).join('\n\n')}\n\n══════════════════\n💎 EMon-BHai-BOT`;
    return api.sendMessage(msg, threadID, messageID);
  }

  return api.sendMessage(`❌ সঠিক option দাও: ban | unban | search`, threadID, messageID);
};
