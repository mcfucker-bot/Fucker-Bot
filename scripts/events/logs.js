module.exports.config = {
  name: "logs",
  eventType: ["log:unsubscribe", "log:subscribe", "log:thread-name"],
  version: "1.1.0",
  credits: "Emon",
  description: "Record bot activity and notify admins",
  envConfig: {
    enable: true
  }
};

module.exports.run = async function ({ api, event, Threads }) {
  const logger = require("../../Emon/catalogs/Emonc.js");
  if (!global.configModule[this.config.name].enable) return;

  let task = "";
  const now = new Date().toLocaleString("en-BD", { timeZone: "Asia/Dhaka" });

  switch (event.logMessageType) {
    case "log:thread-name": {
      const oldName = (await Threads.getData(event.threadID)).name || "অজানা নাম";
      const newName = event.logMessageData.name || "অজানা নাম";
      task = `📝 Group নাম পরিবর্তন\n▸ আগে : "${oldName}"\n▸ এখন : "${newName}"`;
      await Threads.setData(event.threadID, { name: newName });
      break;
    }
    case "log:subscribe": {
      if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
        task = `✅ Bot নতুন group এ যোগ হয়েছে`;
      }
      break;
    }
    case "log:unsubscribe": {
      if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) {
        task = `❌ Bot কে group থেকে সরানো হয়েছে`;
      }
      break;
    }
    default:
      break;
  }

  if (!task) return;

  const report =
    `╔══════════════════╗\n   🔔 BOT NOTIFICATION   \n╚══════════════════╝\n\n${task}\n\n▸ Thread ID : ${event.threadID}\n▸ Author ID : ${event.author}\n▸ সময় : ${now}\n\n══════════════════\n💎 ${global.config.BOTNAME || "EMon-BHai-BOT"}`;

  return api.sendMessage(report, global.config.ADMINBOT[0], (error) => {
    if (error) return logger("", "");
  });
};
