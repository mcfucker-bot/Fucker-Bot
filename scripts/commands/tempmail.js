module.exports.config = {
  name: "tempmail",
  version: "1.0.0",
  permission: 0,
  credits: "Emon",
  prefix: 'awto',
  description: "Generate temporary email & check inbox",
  category: "user",
  usages: "tempmail  |  tempmail check [email]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const axios = require("axios");
  const { threadID, messageID } = event;

  if (!args[0]) {
    // generate temp mail
    try {
      api.setMessageReaction("⏳", messageID, () => {}, true);
      const res = await axios.get(`https://api.guerrillamail.com/ajax.php?f=get_email_address`);
      return api.sendMessage(
        `╔══════════════════╗\n   📧 TEMP MAIL   \n╚══════════════════╝\n\n✅ Temporary Email তৈরি হয়েছে!\n\n📧 Email : ${res.data.email_addr}\n\n══════════════════\n📌 Inbox চেক করতে :\ntempmail check ${res.data.email_addr}\n══════════════════\n💎 EMon-BHai-BOT`,
        threadID, messageID
      );
    } catch (err) {
      return api.sendMessage(`❌ Temp email তৈরি করতে সমস্যা হয়েছে।`, threadID, messageID);
    }
  }

  if (args[0] === "check" && args[1]) {
    try {
      api.setMessageReaction("⏳", messageID, () => {}, true);
      const email = args[1];
      const seq = await axios.get(`https://api.guerrillamail.com/ajax.php?f=set_email_user&email_user=${email.split("@")[0]}`);
      const res = await axios.get(`https://api.guerrillamail.com/ajax.php?f=get_email_list&offset=0`);
      const mails = res.data.list;

      if (!mails || mails.length === 0) return api.sendMessage(
        `╔══════════════════╗\n   📧 INBOX   \n╚══════════════════╝\n\n📬 ${email}\n\n❌ কোনো email নেই।`,
        threadID, messageID
      );

      let msg = `╔══════════════════╗\n   📧 INBOX   \n╚══════════════════╝\n\n📬 ${email}\n📩 মোট : ${mails.length}টি\n\n`;
      mails.forEach((m, i) => {
        msg += `${i + 1}. 📨 From : ${m.mail_from}\n   📌 Subject : ${m.mail_subject}\n   📅 ${m.mail_date}\n\n`;
      });
      msg += `══════════════════\n💎 EMon-BHai-BOT`;
      return api.sendMessage(msg, threadID, messageID);
    } catch (err) {
      return api.sendMessage(`❌ Inbox চেক করতে সমস্যা হয়েছে।`, threadID, messageID);
    }
  }

  return api.sendMessage(
    `╔══════════════════╗\n   📧 TEMPMAIL HELP   \n╚══════════════════╝\n\n📌 ব্যবহার :\n▸ tempmail — নতুন email তৈরি\n▸ tempmail check [email] — inbox দেখো`,
    threadID, messageID
  );
};
