module.exports.config = {
  name: "unsend",
  eventType: ["message_unsend"],
  version: "1.0.0",
  credits: "Emon",
  description: "Detect and log unsent messages, optionally notify the group",
  envConfig: {
    enable: true,
    notify: false  // true করলে group এ জানাবে কেউ message delete করলে
  }
};

// সাময়িকভাবে message cache করে রাখার জায়গা
// (bot framework সাধারণত original message দেয় না unsend event এ)
module.exports.run = async function ({ api, event, Users }) {
  if (!global.configModule[this.config.name]?.enable) return;
  const { threadID, senderID, messageID } = event;

  // Bot নিজের unsend ignore করো
  if (senderID === api.getCurrentUserID()) return;

  if (!global.configModule[this.config.name]?.notify) return;

  try {
    const name = global.data.userName.get(senderID)
      || (await Users.getNameUser(senderID).catch(() => "কেউ"));

    return api.sendMessage(
      `╔══════════════════╗\n   🗑️ MSG DELETED   \n╚══════════════════╝\n\n👀 ${name} একটি message delete করেছে!\n\n══════════════════\n💎 ${global.config.BOTNAME || "EMon-BHai-BOT"}`,
      threadID
    );
  } catch (e) { /* silent */ }
};
