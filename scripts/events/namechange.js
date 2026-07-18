module.exports.config = {
  name: "namechange",
  eventType: ["log:thread-name", "log:thread-image"],
  version: "1.0.0",
  credits: "Emon",
  description: "Notify when group name or photo changes"
};

module.exports.run = async function ({ api, event, Threads, Users }) {
  const { threadID, author, logMessageType } = event;

  const authorName = global.data.userName.get(author)
    || (await Users.getNameUser(author).catch(() => "কেউ"));

  if (logMessageType === "log:thread-name") {
    const oldName = (await Threads.getData(threadID)).name || "পুরনো নাম";
    const newName = event.logMessageData.name || "নতুন নাম";
    await Threads.setData(threadID, { name: newName });

    return api.sendMessage(
      `╔══════════════════╗\n   ✏️ GROUP NAME   \n╚══════════════════╝\n\n✅ Group নাম পরিবর্তন হয়েছে!\n\n▸ আগে : ${oldName}\n▸ এখন : ${newName}\n▸ করেছে : ${authorName}\n\n══════════════════\n💎 ${global.config.BOTNAME || "EMon-BHai-BOT"}`,
      threadID
    );
  }

  if (logMessageType === "log:thread-image") {
    return api.sendMessage(
      `╔══════════════════╗\n   🖼️ GROUP PHOTO   \n╚══════════════════╝\n\n✅ Group ছবি পরিবর্তন হয়েছে!\n\n▸ করেছে : ${authorName}\n\n══════════════════\n💎 ${global.config.BOTNAME || "EMon-BHai-BOT"}`,
      threadID
    );
  }
};
