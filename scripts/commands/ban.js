module.exports.config = {
  name: "ban",
  version: "4.0.0",
  permission: 2,
  credits: "Emon",
  prefix: true,
  description: "Globally ban a user from using the bot (persists across restarts)",
  category: "admin",
  usages: "ban [@mention / uid] [reason]",
  cooldowns: 3,
  dependencies: {
    "fs-extra": "",
    "axios": ""
  }
};

// ─── Ban execute helper (run & handleReply দুজনেই ব্যবহার করে) ───
async function executeBan({ api, Users, threadID, messageID, targetID, name, reason, senderID, bannedByName }) {
  const fs    = require("fs-extra");
  const path  = require("path");
  const axios = require("axios");

  const dateStr = new Date().toLocaleString("bn-BD", { timeZone: "Asia/Dhaka" });
  const banData = { reason, date: dateStr, bannedByName, bannedBy: senderID };

  if (!global.data.userBanned) global.data.userBanned = new Map();
  global.data.userBanned.set(targetID, banData);

  try {
    const existing = await Users.getData(targetID);
    const oldData  = (existing && existing.data) ? existing.data : {};
    await Users.setData(targetID, {
      data: {
        ...oldData,
        banned: true,
        reason,
        dateAdded: dateStr,
        bannedBy: senderID,
        bannedByName
      }
    });
  } catch (e) {
    console.error("[ban.js] DB save error:", e.message);
  }

  const body =
    `🚫 Global Ban\n\n` +
    `👤 নাম : ${name}\n` +
    `🔖 UID : ${targetID}\n` +
    `📝 কারণ : ${reason}\n` +
    `👮 করেছে : ${bannedByName}\n` +
    `📅 তারিখ : ${dateStr}\n\n` +
    `⚡ সকল group এ banned — restart এও টিকবে`;

  const banImg    = path.join(__dirname, "Emon", "ban.png");
  const avatarUrl = `https://graph.facebook.com/${targetID}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
  const cachePath = path.join(__dirname, "cache", `ban_${targetID}.jpg`);

  let attachment = null;
  try {
    fs.ensureDirSync(path.dirname(cachePath));
    const buf = (await axios.get(avatarUrl, { responseType: "arraybuffer", timeout: 10000 })).data;
    if (buf.byteLength > 3000) {
      fs.writeFileSync(cachePath, Buffer.from(buf));
      attachment = fs.createReadStream(cachePath);
    } else throw new Error("blank");
  } catch (_) {
    if (fs.existsSync(banImg)) attachment = fs.createReadStream(banImg);
  }

  const sendObj = { body };
  if (attachment) sendObj.attachment = attachment;

  return api.sendMessage(sendObj, threadID, () => {
    try { require("fs-extra").unlinkSync(cachePath); } catch (_) {}
  }, messageID);
}

// ─── Reply handler: কারণ reply এলে ban complete করে ───
module.exports.handleReply = async function({ api, event, handleReply, Users }) {
  const { threadID, messageID, senderID, body } = event;
  const { author, targetID, name, bannedByName } = handleReply;

  // শুধু যে admin ban করতে চেয়েছিল সে reply করতে পারবে
  if (String(senderID) !== String(author)) return;

  // এখনো banned কিনা double-check
  if (global.data.userBanned?.has(targetID))
    return api.sendMessage(`⚠️ এই user ইতিমধ্যে globally banned আছে।`, threadID, messageID);

  const reason = (body || "").trim() || "কোনো কারণ দেওয়া হয়নি";

  // handleReply list থেকে সরাও
  const idx = global.client.handleReply.findIndex(r => r.messageID === handleReply.messageID);
  if (idx !== -1) global.client.handleReply.splice(idx, 1);

  return executeBan({ api, Users, threadID, messageID, targetID, name, reason, senderID: author, bannedByName });
};

// ─── Main run ───
module.exports.run = async function({ api, event, args, Users }) {
  const { threadID, messageID, mentions, senderID } = event;

  // ─── Target ID ───
  const targetID = String(Object.keys(mentions)[0] || args[0] || "");
  if (!targetID || isNaN(targetID)) {
    return api.sendMessage(
      `🚫 Ban — ব্যবহার\n` +
      `• /ban @mention [কারণ]\n` +
      `• /ban [uid] [কারণ]\n\n` +
      `⚡ সব group এ globally কাজ করে`,
      threadID, messageID
    );
  }

  // ─── Admin/Operator কে ban করা যাবে না ───
  const adminList = global.config?.ADMINBOT || [];
  const opList    = global.config?.OPERATOR  || [];
  if ([...adminList, ...opList].map(String).includes(targetID))
    return api.sendMessage(`❌ Bot admin কে ban করা যাবে না।`, threadID, messageID);

  if (targetID === String(senderID))
    return api.sendMessage(`❌ নিজেকে ban করতে পারবে না।`, threadID, messageID);

  if (global.data.userBanned?.has(targetID))
    return api.sendMessage(`⚠️ এই user ইতিমধ্যে globally banned আছে।`, threadID, messageID);

  // ─── User নাম ───
  let name = targetID;
  try {
    const info = await api.getUserInfo(targetID);
    name = info?.[targetID]?.name || targetID;
  } catch (_) {}

  const bannedByName = global.data.userName?.get(String(senderID)) || "Admin";

  // ─── Reason inline আছে কিনা চেক ───
  let reasonStart = 1; // UID দিলে args[0]=UID, slice(1)=reason
  if (Object.keys(mentions).length > 0) {
    const mentionText = Object.values(mentions)[0] || "";
    reasonStart = mentionText.trim().split(/ +/).length;
  }
  const inlineReason = args.slice(reasonStart).join(" ").trim();

  // ─── Reason inline থাকলে সরাসরি ban, না থাকলে reply চাও ───
  if (inlineReason) {
    return executeBan({ api, Users, threadID, messageID, targetID, name, reason: inlineReason, senderID, bannedByName });
  }

  // Reason নেই — reply system দিয়ে চাও
  return api.sendMessage(
    `📝 ${name} কে ban করার কারণ লিখুন\n\nএই message এ reply করুন →`,
    threadID,
    (err, info) => {
      if (err || !info) return;
      global.client.handleReply.push({
        name: "ban",
        messageID: info.messageID,
        author: senderID,
        targetID,
        name,
        bannedByName
      });
    },
    messageID
  );
};
