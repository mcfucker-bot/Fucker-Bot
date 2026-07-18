module.exports.config = {
  name: "unban",
  version: "3.0.0",
  permission: 2,
  credits: "Emon",
  prefix: true,
  description: "Unban a globally banned user (removes from DB too)",
  category: "admin",
  usages: "unban [@mention / uid]",
  cooldowns: 3,
  dependencies: {
    "fs-extra": "",
    "axios": ""
  }
};

module.exports.run = async function({ api, event, args, Users }) {
  const fs    = require("fs-extra");
  const path  = require("path");
  const axios = require("axios");
  const { threadID, messageID, mentions, senderID } = event;

  const targetID = String(Object.keys(mentions)[0] || args[0] || "");
  if (!targetID || isNaN(targetID)) {
    return api.sendMessage(
      `✅ Unban — ব্যবহার\n` +
      `• /unban @mention\n` +
      `• /unban [uid]`,
      threadID, messageID
    );
  }

  // ─── Memory তে বা DB তে banned আছে কিনা check ───
  const inMemory = global.data?.userBanned?.has(targetID);
  let dbBanned = false;
  let dbData   = {};
  try {
    const existing = await Users.getData(targetID);
    dbData   = (existing && existing.data) ? existing.data : {};
    dbBanned = !!dbData.banned;
  } catch (_) {}

  if (!inMemory && !dbBanned)
    return api.sendMessage(`⚠️  এই user banned নেই।`, threadID, messageID);

  const banInfo = global.data?.userBanned?.get(targetID) || {
    reason: dbData.reason || "—",
    bannedByName: dbData.bannedByName || "Admin"
  };

  let name = targetID;
  try {
    const info = await api.getUserInfo(targetID);
    name = info?.[targetID]?.name || targetID;
  } catch (_) {}

  const unbannerName = global.data.userName?.get(String(senderID)) || "Admin";
  const dateStr      = new Date().toLocaleString("bn-BD", { timeZone: "Asia/Dhaka" });

  // ─── 1. Memory থেকে সরাও ───
  global.data?.userBanned?.delete(targetID);

  // ─── 2. Database থেকেও সরাও ───
  try {
    const existing = await Users.getData(targetID);
    const oldData  = (existing && existing.data) ? existing.data : {};
    const { banned, reason, dateAdded, bannedBy, bannedByName, ...cleanData } = oldData;
    await Users.setData(targetID, { data: cleanData });
  } catch (e) {
    console.error("[unban.js] DB remove error:", e.message);
  }

  const body =
    `✅ Global Unban\n\n` +
    `👤 নাম : ${name}\n` +
    `🔖 UID : ${targetID}\n` +
    `📝 পুরনো কারণ : ${banInfo.reason || "—"}\n` +
    `👮 Ban করেছিল : ${banInfo.bannedByName || "Admin"}\n` +
    `✅ Unban করেছে : ${unbannerName}\n` +
    `📅 তারিখ : ${dateStr}\n\n` +
    `🎉 ${name} এখন bot use করতে পারবে!`;

  // ─── Profile pic → না পেলে unban.png ───
  const unbanImg  = path.join(__dirname, "Emon", "unban.png");
  const avatarUrl = `https://graph.facebook.com/${targetID}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
  const cachePath = path.join(__dirname, "cache", `unban_${targetID}.jpg`);

  let attachment = null;
  try {
    fs.ensureDirSync(path.dirname(cachePath));
    const buf = (await axios.get(avatarUrl, { responseType: "arraybuffer", timeout: 10000 })).data;
    if (buf.byteLength > 3000) {
      fs.writeFileSync(cachePath, Buffer.from(buf));
      attachment = fs.createReadStream(cachePath);
    } else throw new Error("blank");
  } catch (_) {
    if (fs.existsSync(unbanImg)) attachment = fs.createReadStream(unbanImg);
  }

  const sendObj = { body };
  if (attachment) sendObj.attachment = attachment;

  return api.sendMessage(sendObj, threadID, () => {
    try { fs.unlinkSync(cachePath); } catch (_) {}
  }, messageID);
};
