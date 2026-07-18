const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "bot",
    version: "1.0.0",
    aliases: ["mim"],
    permission: 0,
    credits: "Emon",
    description: "Talk with bot",
    prefix: false,
    category: "talk",
    usages: "hi | teach ask=[q]&ans=[a] | askinfo [q] | info | textType [style]",
    cooldowns: 5,
  },

  handleReply: async function ({ api, event }) {
    try {
      const apiData = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN-OFFICIAL/Nayan/main/api.json');
      const apiUrl = apiData.data.sim;
      const kl = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN-OFFICIAL/Nayan/main/api.json');
      const apiUrl2 = kl.data.api;

      const response = await axios.get(`${apiUrl}/sim?type=ask&ask=${encodeURIComponent(event.body)}`);
      const result = response.data.data.msg;

      const textStyles = loadTextStyles();
      const userStyle = (textStyles[event.threadID] && textStyles[event.threadID].style) || 'normal';

      const fontResponse = await axios.get(`${apiUrl2}/bold?text=${encodeURIComponent(result)}&type=${userStyle}`);
      const text = fontResponse.data.data.bolded;

      api.sendMessage(text, event.threadID, (error, info) => {
        if (error) {
          console.error('Error replying to user:', error);
          return api.sendMessage('An error occurred while processing your request. Please try again later.', event.threadID, event.messageID);
        }
        global.client.handleReply.push({
          type: 'reply',
          name: 'bot',
          messageID: info.messageID,
          author: event.senderID,
          head: event.body
        });
      }, event.messageID);

    } catch (error) {
      console.error('Error in handleReply:', error);
      api.sendMessage('An error occurred while processing your request. Please try again later.', event.threadID, event.messageID);
    }
  },

  run: async function ({ api, event, args, Users }) {
    try {
      const msg = args.join(" ");
      const apiData = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN-OFFICIAL/Nayan/main/api.json');
      const apiUrl = apiData.data.sim;

      if (!msg) {
        const greetings = [
          "আহ শুনা আমার তোমার অলিতে গলিতে উম্মাহ😇😘",
          "কি গো সোনা আমাকে ডাকছ কেনো",
          "বার বার আমাকে ডাকস কেন😡",
          "আহ শোনা আমার আমাকে এতো ডাক্তাছো কেনো আসো বুকে আশো🥱",
          "হুম জান তোমার অইখানে উম্মমাহ😷😘",
          "আসসালামু আলাইকুম বলেন আপনার জন্য কি করতে পারি",
          "আমাকে এতো না ডেকে বস ইমনকে একটা গফ দে 🙄",
          "jang hanga korba",
          "jang bal falaba🙂"
        ];
        const name = await Users.getNameUser(event.senderID);
        const rand = greetings[Math.floor(Math.random() * greetings.length)];
        return api.sendMessage(
          { body: `${name}, ${rand}`, mentions: [{ tag: name, id: event.senderID }] },
          event.threadID,
          (error, info) => {
            if (error) return api.sendMessage('An error occurred. Please try again later.', event.threadID, event.messageID);
            global.client.handleReply.push({
              type: 'reply',
              name: 'bot',
              messageID: info.messageID,
              author: event.senderID,
              head: msg,
            });
          },
          event.messageID
        );
      }

      else if (msg.startsWith("textType")) {
        const selectedStyle = msg.split(" ")[1];
        const options = ['serif', 'sans', 'italic', 'italic-sans', 'medieval', 'normal'];
        if (options.includes(selectedStyle)) {
          saveTextStyle(event.threadID, selectedStyle);
          return api.sendMessage(`Text type set to "${selectedStyle}" successfully!`, event.threadID, event.messageID);
        } else {
          return api.sendMessage(`Invalid text type! Choose from: ${options.join(", ")}`, event.threadID, event.messageID);
        }
      }

      else if (msg.startsWith("delete")) {
        const deleteParams = msg.replace("delete", "").trim().split("&");
        const question = deleteParams[0].replace("ask=", "").trim();
        const answer = deleteParams[1].replace("ans=", "").trim();
        const d = await axios.get(`${apiUrl}/sim?type=delete&ask=${encodeURIComponent(question)}&ans=${encodeURIComponent(answer)}&uid=${event.senderID}`);
        const replyMessage = (d.data.msg) || (d.data.data && d.data.data.msg);
        return api.sendMessage(replyMessage, event.threadID, event.messageID);
      }

      else if (msg.startsWith("edit")) {
        const editParams = msg.replace("edit", "").trim().split("&");
        const oldQuestion = editParams[0].replace("old=", "").trim();
        const newQuestion = editParams[1].replace("new=", "").trim();
        const d = await axios.get(`${apiUrl}/sim?type=edit&old=${encodeURIComponent(oldQuestion)}&new=${encodeURIComponent(newQuestion)}&uid=${event.senderID}`);
        const replyMessage = (d.data.msg) || (d.data.data && d.data.data.msg) || "No response received.";
        return api.sendMessage(replyMessage, event.threadID, event.messageID);
      }

      else if (msg.startsWith("info")) {
        const response = await axios.get(`${apiUrl}/sim?type=info`);
        const totalAsk = response.data.data.totalKeys;
        const totalAns = response.data.data.totalResponses;
        return api.sendMessage(`Total Ask: ${totalAsk}\nTotal Answer: ${totalAns}`, event.threadID, event.messageID);
      }

      else if (msg.startsWith("teach")) {
        const teachParams = msg.replace("teach", "").trim().split("&");
        const question = teachParams[0].replace("ask=", "").trim();
        const answer = teachParams[1].replace("ans=", "").trim();
        const response = await axios.get(`${apiUrl}/sim?type=teach&ask=${encodeURIComponent(question)}&ans=${encodeURIComponent(answer)}`);
        const replyMessage = response.data.msg;
        const ask = response.data.data.ask;
        const ans = response.data.data.ans;
        if (replyMessage.includes("already")) {
          return api.sendMessage(`📝Your Data Already Added To Database\n1️⃣ASK: ${ask}\n2️⃣ANS: ${ans}`, event.threadID, event.messageID);
        }
        return api.sendMessage(`📝Your Data Added To Database Successfully\n1️⃣ASK: ${ask}\n2️⃣ANS: ${ans}`, event.threadID, event.messageID);
      }

      else if (msg.startsWith("askinfo")) {
        const question = msg.replace("askinfo", "").trim();
        if (!question) return api.sendMessage('Please provide a question.', event.threadID, event.messageID);
        const response = await axios.get(`${apiUrl}/sim?type=keyinfo&ask=${encodeURIComponent(question)}`);
        const replyData = response.data.data;
        const answers = replyData.answers;
        if (!answers || answers.length === 0) {
          return api.sendMessage(`No information available for: "${question}"`, event.threadID, event.messageID);
        }
        const replyMessage = `Info for "${question}":\n\n` +
          answers.map((answer, index) => `📌 ${index + 1}. ${answer}`).join("\n") +
          `\n\nTotal answers: ${answers.length}`;
        return api.sendMessage(replyMessage, event.threadID, event.messageID);
      }

      else if (msg.startsWith("help")) {
        const prefix = global.config.PREFIX;
        const helpMessage =
          `🌟 Bot Command List:\n\n` +
          `🤖 bot [question] — bot এর সাথে কথা বলো\n` +
          `📚 bot teach ask=[q]&ans=[a] — bot কে নতুন কিছু শেখাও\n` +
          `❌ bot delete ask=[q]&ans=[a] — data মুছে দাও\n` +
          `✏️ bot edit old=[q]&new=[q] — question edit করো\n` +
          `📊 bot info — মোট Q&A সংখ্যা দেখো\n` +
          `🔍 bot askinfo [q] — প্রশ্নের সব উত্তর দেখো\n` +
          `🎨 bot textType [style] — font style সেট করো\n` +
          `   (serif, sans, italic, italic-sans, medieval, normal)`;
        return api.sendMessage(helpMessage, event.threadID, event.messageID);
      }

      else {
        const response = await axios.get(`${apiUrl}/sim?type=ask&ask=${encodeURIComponent(msg)}`);
        const replyMessage = response.data.data.msg;

        const textStyles = loadTextStyles();
        const userStyle = (textStyles[event.threadID] && textStyles[event.threadID].style) || 'normal';

        const kl = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN-OFFICIAL/Nayan/main/api.json');
        const apiUrl2 = kl.data.api2;

        const font = await axios.get(`${apiUrl2}/bold?text=${encodeURIComponent(replyMessage)}&type=${userStyle}`);
        const styledText = font.data.data.bolded;

        api.sendMessage(styledText, event.threadID, (error, info) => {
          if (error) return api.sendMessage('An error occurred. Please try again later.', event.threadID, event.messageID);
          global.client.handleReply.push({
            type: 'reply',
            name: 'bot',
            messageID: info.messageID,
            author: event.senderID,
            head: msg,
          });
        }, event.messageID);
      }

    } catch (error) {
      console.log(error);
      api.sendMessage('An error has occurred, please try again later.', event.threadID, event.messageID);
    }
  }
};


function loadTextStyles() {
  const filePath = path.join(__dirname, 'system', 'textStyles.json');
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify({}, null, 2));
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading text styles:', error);
    return {};
  }
}

function saveTextStyle(threadID, style) {
  const styles = loadTextStyles();
  styles[threadID] = { style };
  const filePath = path.join(__dirname, 'system', 'textStyles.json');
  try {
    fs.writeFileSync(filePath, JSON.stringify(styles, null, 2));
  } catch (error) {
    console.error('Error saving text styles:', error);
  }
}
