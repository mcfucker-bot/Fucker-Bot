module.exports.config = {
  name: "join",
  eventType: ["log:subscribe"],
  version: "2.0.0",
  credits: "Emon",
  description: "Welcome new members with profile pic, notify when bot is added to a group",
  dependencies: {
    "fs-extra": "",
    "axios": ""
  }
};

module.exports.run = async function ({ api, event, Threads }) {
  const fs   = require("fs-extra");
  const path = require("path");
  const axios = require("axios");
  const { threadID } = event;

  const data = (await Threads.getData(event.threadID)).data || {};
  const checkban = data.banOut || [];
  if (checkban.includes(threadID)) return;

  // ═══════════════════════════════════════════
  //   Bot নিজে group এ add হলে → join.png সহ
  // ═══════════════════════════════════════════
  if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
    const joinImg = path.join(__dirname, "Emon", "join.png");
    const body =
      `╔═══════════════════════╗\n` +
      `   🤖  BOT CONNECTED  🤖   \n` +
      `╚═══════════════════════╝\n\n` +
      `✅  সংযুক্ত হওয়া সম্পন্ন!\n\n` +
      `┌─────────────────────\n` +
      `│ 🤖  Bot    : ${global.config.BOTNAME || "EMon-BHai-BOT"}\n` +
      `│ 🔑  Prefix : ${global.config.PREFIX}\n` +
      `│ 👥  Users  : ${global.data.allUserID.length} জন\n` +
      `│ 🌐  Groups : ${global.data.allThreadID.length} টি\n` +
      `└─────────────────────\n\n` +
      `📌  ${global.config.PREFIX}help  →  Command list\n` +
      `🧠  ${global.config.BOTNAME || "EMon-BHai"} (প্রশ্ন)  →  AI\n\n` +
      `══════════════════════\n` +
      `💎  ${global.config.BOTNAME || "EMon-BHai-BOT"} ব্যবহার করার জন্য ধন্যবাদ!`;

    if (fs.existsSync(joinImg)) {
      return api.sendMessage({ body, attachment: fs.createReadStream(joinImg) }, threadID);
    }
    return api.sendMessage({ body }, threadID);
  }

  // ═══════════════════════════════════════════
  //   নতুন member join → profile pic দিয়ে welcome
  // ═══════════════════════════════════════════
  try {
    let { threadName, participantIDs } = await api.getThreadInfo(threadID);
    const threadData = global.data.threadData.get(parseInt(threadID)) || {};

    var mentions = [], nameArray = [], memLength = [], i = 0;

    for (const idx in event.logMessageData.addedParticipants) {
      const p = event.logMessageData.addedParticipants[idx];
      const userName = p.fullName;
      nameArray.push(userName);
      mentions.push({ tag: userName, id: p.userFbId });
      memLength.push(participantIDs.length - i++);
    }
    memLength.sort((a, b) => a - b);

    let bodyMsg;
    if (typeof threadData.customJoin === "undefined") {
      bodyMsg =
        `╔═══════════════════════╗\n` +
        `   🎉  WELCOME!  🎉   \n` +
        `╚═══════════════════════╝\n\n` +
        `👋  স্বাগতম, {name}!\n\n` +
        `┌─────────────────────\n` +
        `│ 🌐  Group  : ${threadName}\n` +
        `│ 👥  Member : {soThanhVien} জন\n` +
        `└─────────────────────\n\n` +
        `📌  ${global.config.PREFIX}help লিখে সব commands দেখো!\n` +
        `🧠  AI প্রশ্ন করতে bot এর নাম লিখো\n\n` +
        `══════════════════════\n` +
        `💎  ${global.config.BOTNAME || "EMon-BHai-BOT"}`;
    } else {
      bodyMsg = threadData.customJoin;
    }

    bodyMsg = bodyMsg
      .replace(/\{name}/g, nameArray.join(", "))
      .replace(/\{type}/g, memLength.length > 1 ? "friends" : "you")
      .replace(/\{soThanhVien}/g, memLength.join(", "))
      .replace(/\{threadName}/g, threadName);

    // ─── Profile pic আনার চেষ্টা ───
    const targetID = String(event.logMessageData.addedParticipants[0]?.userFbId || "");
    const avatarUrl = `https://graph.facebook.com/${targetID}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
    const cachePath = path.join(__dirname, "..", "commands", "cache", `welcome_${targetID}.jpg`);
    const fallbackImg = path.join(__dirname, "Emon", "welcome.png");

    let attachment = null;
    try {
      if (targetID) {
        const buf = (await axios.get(avatarUrl, { responseType: "arraybuffer", timeout: 10000 })).data;
        // ফাইল size চেক — Facebook default/blank avatar ~ < 3KB
        if (buf.byteLength > 3000) {
          fs.ensureDirSync(path.dirname(cachePath));
          fs.writeFileSync(cachePath, Buffer.from(buf));
          attachment = fs.createReadStream(cachePath);
        } else {
          throw new Error("blank avatar");
        }
      }
    } catch (_) {
      if (fs.existsSync(fallbackImg)) {
        attachment = fs.createReadStream(fallbackImg);
      }
    }

    const sendObj = { body: bodyMsg, mentions };
    if (attachment) sendObj.attachment = attachment;

    return api.sendMessage(sendObj, threadID, () => {
      try { if (targetID) fs.unlinkSync(cachePath); } catch (e) {}
    });

  } catch (e) {
    return console.log("[join.js]", e);
  }
};
