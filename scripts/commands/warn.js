module.exports.config = {
  name: "warn",
  version: "1.0.0",
  permission: 1,
  credits: "Emon",
  prefix: true,
  description: "Warn a member (3 warns = kick)",
  category: "admin",
  usages: "warn [@mention/uid] [reason]",
  cooldowns: 3
};

module.exports.run = async function ({ api, event, args, Users }) {
  const { threadID, messageID, mentions } = event;

  const targetID = Object.keys(mentions)[0] || args[0];
  if (!targetID) return api.sendMessage(`❌ Mention করো অথবা UID দাও।`, threadID, messageID);

  const reason = Object.keys(mentions).length > 0
    ? args.slice(1).join(" ")
    : args.slice(1).join(" ");

  if (!global.temp) global.temp = {};
  const warnKey = `warn_${targetID}_${threadID}`;
  const warns = (global.temp[warnKey] || 0) + 1;
  global.temp[warnKey] = warns;

  let name;
  try {
    const ud = await Users.getData(targetID);
    name = ud?.name || "Member";
  } catch (e) { name = "Member"; }

  if (warns >= 3) {
    global.temp[warnKey] = 0;
    try {
      await api.removeUserFromGroup(targetID, threadID);
      return api.sendMessage(
        `╔══════════════════╗\n   ⚠️ KICKED!   \n╚══════════════════╝\n\n❌ ${name} কে kick করা হয়েছে!\n⚠️ কারণ : ৩টি warning জমেছে\n\n══════════════════\n💎 ${global.config.BOTNAME || "EMon-BHai-BOT"}`,
        threadID, messageID
      );
    } catch (e) {
      return api.sendMessage(`⚠️ ${name} এর ৩টি warning হয়েছে কিন্তু kick করতে পারিনি (Bot admin নয়)।`, threadID, messageID);
    }
  }

  return api.sendMessage(
    `╔══════════════════╗\n   ⚠️ WARNING   \n╚══════════════════╝\n\n👤 ${name}\n⚠️ Warning : ${warns}/3\n${reason ? `📝 কারণ : ${reason}` : ""}\n\n▸ ৩টি warning এ kick করা হবে\n\n══════════════════\n💎 ${global.config.BOTNAME || "EMon-BHai-BOT"}`,
    threadID, messageID
  );
};
