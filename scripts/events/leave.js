module.exports.config = {
  name: "leave",
  eventType: ["log:unsubscribe"],
  version: "2.0.0",
  credits: "Emon",
  description: "Goodbye message with profile pic when a member leaves or is removed",
  dependencies: {
    "fs-extra": "",
    "axios": ""
  }
};

module.exports.run = async function ({ api, event, Users, Threads }) {
  if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;

  const fs   = require("fs-extra");
  const path = require("path");
  const axios = require("axios");

  const { threadID } = event;
  const data = global.data.threadData.get(parseInt(threadID)) || (await Threads.getData(threadID)).data || {};
  const leftID = String(event.logMessageData.leftParticipantFbId);
  const name = global.data.userName.get(leftID) || await Users.getNameUser(leftID).catch(() => "Someone");

  const wasKicked = event.author !== leftID;
  const typeMsg   = wasKicked ? "👢  Kick করা হয়েছে" : "🚶  নিজে চলে গেছে";
  const emoji     = wasKicked ? "😤" : "😢";

  let bodyMsg;
  if (typeof data.customLeave === "undefined") {
    bodyMsg =
      `╔═══════════════════════╗\n` +
      `   👋  GOODBYE!  ${emoji}   \n` +
      `╚═══════════════════════╝\n\n` +
      `{name} group ছেড়ে গেছে!\n\n` +
      `┌─────────────────────\n` +
      `│ 📛  নাম   : {name}\n` +
      `│ 📋  কারণ : {type}\n` +
      `└─────────────────────\n\n` +
      `══════════════════════\n` +
      `💎  ${global.config.BOTNAME || "EMon-BHai-BOT"}`;
  } else {
    bodyMsg = data.customLeave;
  }

  bodyMsg = bodyMsg
    .replace(/\{name}/g, name)
    .replace(/\{type}/g, typeMsg);

  // ─── Profile pic আনার চেষ্টা ───
  const avatarUrl = `https://graph.facebook.com/${leftID}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
  const cachePath = path.join(__dirname, "..", "commands", "cache", `goodbye_${leftID}.jpg`);
  const fallbackImg = path.join(__dirname, "Emon", "goodbye.png");

  let attachment = null;
  try {
    const buf = (await axios.get(avatarUrl, { responseType: "arraybuffer", timeout: 10000 })).data;
    if (buf.byteLength > 3000) {
      fs.ensureDirSync(path.dirname(cachePath));
      fs.writeFileSync(cachePath, Buffer.from(buf));
      attachment = fs.createReadStream(cachePath);
    } else {
      throw new Error("blank avatar");
    }
  } catch (_) {
    if (fs.existsSync(fallbackImg)) {
      attachment = fs.createReadStream(fallbackImg);
    }
  }

  const sendObj = { body: bodyMsg };
  if (attachment) sendObj.attachment = attachment;

  return api.sendMessage(sendObj, threadID, () => {
    try { fs.unlinkSync(cachePath); } catch (e) {}
  });
};
