module.exports.config = {
  name: "config",
  version: "1.0.0",
  permission: 2,
  credits: "Emon",
  prefix: true,
  description: "Manage bot profile, avatar, bio, and FB settings",
  category: "admin",
  usages: "config [bio/nick/avatar/block/unblock/...]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;
  const action = (args[0] || "").toLowerCase();

  if (!action) return api.sendMessage(
    `╔══════════════════╗\n   ⚙️ CONFIG HELP   \n╚══════════════════╝\n\n📌 ব্যবহার :\n▸ config bio [text] — Bio পরিবর্তন\n▸ config nick [text] — Nickname পরিবর্তন\n▸ config avatar — Avatar পরিবর্তন (reply)\n▸ config block [uid] — Block করো\n▸ config unblock [uid] — Unblock করো\n\n══════════════════\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );

  const content = args.slice(1).join(" ");

  try {
    if (action === "bio") {
      if (!content) return api.sendMessage(`❌ Bio লিখতে ভুলে গেছো।`, threadID, messageID);
      await api.changeBio(content);
      return api.sendMessage(
        `╔══════════════════╗\n   ⚙️ BIO UPDATED   \n╚══════════════════╝\n\n✅ Bio আপডেট হয়েছে!\n📝 "${content}"\n\n══════════════════\n💎 EMon-BHai-BOT`,
        threadID, messageID
      );
    }

    if (action === "nick") {
      if (!content) return api.sendMessage(`❌ Nickname লিখতে ভুলে গেছো।`, threadID, messageID);
      await api.changeNickname(content, threadID, api.getCurrentUserID());
      return api.sendMessage(
        `╔══════════════════╗\n   ⚙️ NICK UPDATED   \n╚══════════════════╝\n\n✅ Nickname আপডেট হয়েছে!\n📝 "${content}"\n\n══════════════════\n💎 EMon-BHai-BOT`,
        threadID, messageID
      );
    }

    if (action === "avatar") {
      if (event.type !== "message_reply" || !event.messageReply.attachments || event.messageReply.attachments[0].type !== "photo")
        return api.sendMessage(`❌ ছবিতে reply দিয়ে config avatar command দাও।`, threadID, messageID);
      const axios = require("axios");
      const imgRes = await axios.get(event.messageReply.attachments[0].url, { responseType: "arraybuffer" });
      await api.changeAvatar(Buffer.from(imgRes.data));
      return api.sendMessage(
        `╔══════════════════╗\n   ⚙️ AVATAR UPDATED   \n╚══════════════════╝\n\n✅ Avatar আপডেট হয়েছে!\n\n══════════════════\n💎 EMon-BHai-BOT`,
        threadID, messageID
      );
    }

    if (action === "block" && args[1]) {
      await api.changeBlockedStatus(args[1], true);
      return api.sendMessage(`✅ UID ${args[1]} কে block করা হয়েছে।`, threadID, messageID);
    }

    if (action === "unblock" && args[1]) {
      await api.changeBlockedStatus(args[1], false);
      return api.sendMessage(`✅ UID ${args[1]} কে unblock করা হয়েছে।`, threadID, messageID);
    }

    return api.sendMessage(`❌ অজানা config option: ${action}`, threadID, messageID);
  } catch (err) {
    console.error(err);
    return api.sendMessage(`❌ সমস্যা হয়েছে : ${err.message}`, threadID, messageID);
  }
};
