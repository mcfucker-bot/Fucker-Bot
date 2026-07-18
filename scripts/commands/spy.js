const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const request = require("request");

module.exports.config = {
  name: "spy",
  version: "5.1.0",
  permission: 0,
  credits: "EMon-BHai",
  prefix: "awto",
  description: "Get Facebook user information - Full Display",
  category: "info",
  usages: "spy [uid / @mention / reply]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, senderID, messageID } = event;
  const cachePath = path.join(__dirname, "cache");
  if (!fs.existsSync(cachePath)) fs.mkdirSync(cachePath, { recursive: true });

  let uid = senderID;
  if (event.type === "message_reply") uid = event.messageReply.senderID;
  else if (Object.keys(event.mentions).length > 0) uid = Object.keys(event.mentions)[0];
  else if (args[0] && /^\d{10,}$/.test(args[0])) uid = args[0];

  api.setMessageReaction("⏳", messageID, () => {}, true);

  try {
    const userInfo = await api.getUserInfo(uid);
    const info = userInfo[uid];
    if (!info) return api.sendMessage("❌ User not found!", threadID, messageID);

    const name = info.name || "Unknown";
    const firstName = info.firstName || name.split(" ")[0];
    const friend = info.isFriend ? "Yes ✅" : "No ❌";
    const profileUrl = info.profileUrl || `https://facebook.com/${uid}`;
    const username = info.vanity ? `@${info.vanity}` : "Not Set";

    let gender = "Hidden 🔒", isVerified = "No ❌", birthday = "Hidden 🔒", hometown = "Hidden 🔒", 
        location = "Hidden 🔒", relationship = "Hidden 🔒", followers = "Hidden 🔒", 
        work = "Hidden 🔒", education = "Hidden 🔒", bio = "Hidden 🔒", 
        about = "Hidden 🔒", quotes = "Hidden 🔒", website = "Hidden 🔒", languages = "Hidden 🔒";

    try {
      const token = "6628568379|c1e620fa708a1d5696fb991c1bde5662";
      const fields = "gender,is_verified,birthday,hometown,location,relationship_status,subscribers,work,education,bio,about,quotes,website,languages";
      const res = await axios.get(`https://graph.facebook.com/${uid}?fields=${fields}&access_token=${token}`);

      if (res.data.gender === "male") gender = "Male ♂️";
      else if (res.data.gender === "female") gender = "Female ♀️";

      if (res.data.is_verified) isVerified = "Yes ✅";
      if (res.data.birthday) birthday = res.data.birthday;
      if (res.data.hometown?.name) hometown = res.data.hometown.name;
      if (res.data.location?.name) location = res.data.location.name;
      if (res.data.relationship_status) relationship = res.data.relationship_status;
      if (res.data.subscribers?.summary?.total_count) followers = res.data.subscribers.summary.total_count.toLocaleString();

      if (res.data.work?.[0]) work = `${res.data.work[0].position?.name || ""} at ${res.data.work[0].employer?.name || ""}`.trim() || "Hidden 🔒";
      if (res.data.education?.[0]) education = res.data.education[0].school?.name || "Hidden 🔒";
      
      bio = res.data.bio?.substring(0, 60) + (res.data.bio?.length > 60 ? "..." : "") || "Hidden 🔒";
      about = res.data.about?.substring(0, 60) + (res.data.about?.length > 60 ? "..." : "") || "Hidden 🔒";
      quotes = res.data.quotes?.substring(0, 60) + (res.data.quotes?.length > 60 ? "..." : "") || "Hidden 🔒";
      website = res.data.website || "Hidden 🔒";
      if (res.data.languages) languages = res.data.languages.slice(0, 3).map(l => l.name).join(", ");
    } catch (e) {}

    const body = `╭─⊰ EMon-BHai-BOT ⊱─╮\n` +
                 `│ 👤 USER INFORMATION\n│\n` +
                 `│ 🆔 UID: ${uid}\n` +
                 `│ 📛 Name: ${name}\n` +
                 `│ ⚧ Gender: ${gender}\n` +
                 `│ ✓ Verified: ${isVerified}\n` +
                 `│ 🤝 Friend: ${friend}\n` +
                 `│ 👥 Followers: ${followers}\n│\n` +
                 `│ 🎂 Birthday: ${birthday}\n` +
                 `│ 🏠 Hometown: ${hometown}\n` +
                 `│ 💼 Work: ${work}\n` +
                 `│ 📝 Bio: ${bio}\n` +
                 `│ 🔗 Profile: ${profileUrl}\n` +
                 `╰──────────────────────╯`;

    const imgPath = path.join(cachePath, `${uid}.png`);
    const picUrl = `https://graph.facebook.com/${uid}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;

    request(encodeURI(picUrl)).pipe(fs.createWriteStream(imgPath)).on("close", () => {
      api.sendMessage({ body, attachment: fs.createReadStream(imgPath) }, threadID, () => fs.unlinkSync(imgPath), messageID);
      api.setMessageReaction("✅", messageID, () => {}, true);
    });

  } catch (err) {
    api.setMessageReaction("❌", messageID, () => {}, true);
    return api.sendMessage("❌ User not found!", threadID, messageID);
  }
};
