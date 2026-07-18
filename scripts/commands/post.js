const fs   = require("fs-extra");
const path = require("path");
const axios = require("axios");

module.exports.config = {
  name: "post",
  version: "2.1.0",
  permission: 2,
  credits: "Emon",
  prefix: true,
  description: "Create a Facebook post from the bot account",
  category: "admin",
  usages: "post [text] | reply to a photo to post with image",
  cooldowns: 10
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID, type, messageReply } = event;

  if (!args[0] && !(type === "message_reply" && messageReply?.attachments?.length)) {
    return api.sendMessage(
      `╔══════════════════╗\n   📝 POST HELP   \n╚══════════════════╝\n\n` +
      `📌 ব্যবহার :\n` +
      `  ▸ post [text]\n` +
      `  ▸ ছবিতে reply দিয়ে : post [caption]\n\n` +
      `══════════════════\n` +
      `💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  }

  api.setMessageReaction("⏳", messageID, () => {}, true);

  const content = args.join(" ").trim();
  let cachePath = null;

  try {
    const msg = { body: content || "" };

    // ─── attach photo if reply ───
    if (type === "message_reply" && messageReply?.attachments?.length) {
      const attach = messageReply.attachments[0];
      if (attach?.type === "photo" && attach?.url) {
        cachePath = path.join(__dirname, "cache", `post_${event.senderID}.jpg`);
        const buf = (await axios.get(attach.url, { responseType: "arraybuffer", timeout: 20000 })).data;
        fs.writeFileSync(cachePath, Buffer.from(buf));
        msg.attachment = fs.createReadStream(cachePath);
      }
    }

    // ─── createPost ───
    await new Promise((resolve, reject) => {
      if (typeof api.createPost !== "function")
        return reject(new Error("api.createPost এই FCA version এ নেই।"));

      api.createPost(msg, (err, res) => {
        if (cachePath) { try { fs.unlinkSync(cachePath); } catch (e) {} }
        if (err) return reject(typeof err === "object" ? new Error(JSON.stringify(err)) : err);
        resolve(res);
      });
    });

    api.setMessageReaction("✅", messageID, () => {}, true);
    return api.sendMessage(
      `╔══════════════════╗\n   📝 POST CREATED   \n╚══════════════════╝\n\n` +
      `✅ Post সফলভাবে তৈরি হয়েছে!\n` +
      (content ? `📝 Content : ${content.substring(0, 80)}${content.length > 80 ? "..." : ""}\n` : "") +
      `\n══════════════════\n` +
      `💎 EMon-BHai-BOT`,
      threadID, messageID
    );

  } catch (err) {
    if (cachePath) { try { fs.unlinkSync(cachePath); } catch (e) {} }
    console.error("[post.js]", err.message || err);
    api.setMessageReaction("❌", messageID, () => {}, true);
    return api.sendMessage(
      `╔══════════════════╗\n   📝 POST FAILED   \n╚══════════════════╝\n\n` +
      `❌ Post করতে সমস্যা হয়েছে!\n` +
      `▸ ${err?.message || "Unknown error"}\n\n` +
      `══════════════════\n` +
      `💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  }
};
