module.exports.config = {
  name: "banglajoke",
  version: "1.0.0",
  permission: 0,
  credits: "EMon-BHai",
  prefix: true,
  description: "বাংলা মজার কৌতুক",
  category: "fun",
  usages: "banglajoke",
  cooldowns: 5
};

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID } = event;
  const jokes = [
    { setup: "ডাক্তার: তোমার কি মাথাব্যথা আছে?", punchline: "রোগী: হ্যাঁ, তোমার bill দেখার পর থেকেই! 😂" },
    { setup: "টিচার: পৃথিবীর সবচেয়ে কঠিন কাজ কী?", punchline: "ছাত্র: সকালে মায়ের ডাকে ঘুম থেকে উঠা! 😴" },
    { setup: "বাবা: বড় হয়ে কী হতে চাস?", punchline: "ছেলে: বিয়ে করব না, শান্তিতে থাকব! 😅" },
    { setup: "বন্ধু: তোর phone কেন সবসময় silent থাকে?", punchline: "আমি: টাকা না থাকলে কেউ call করে না, তাই! 💸" },
    { setup: "মা: পড়াশোনা না করলে ভবিষ্যৎ অন্ধকার!", punchline: "ছেলে: অন্ধকারে বিদ্যুৎ বিল কম! 💡" },
    { setup: "Teacher: তুমি class এ ঘুমাচ্ছো কেন?", punchline: "Student: কারণ sir, আপনার গলার স্বর lullaby-এর মতো! 😂" },
    { setup: "Wife: তুমি কি আমাকে ভালোবাসো?", punchline: "Husband: হ্যাঁ, Google Map-এও তোমাকে খুঁজতে হয় না! 🗺️" },
    { setup: "Doctor: আপনার রোগ জটিল।", punchline: "Patient: কতদিন বাঁচব?\nDoctor: ১০\nPatient: ১০ কী? বছর? মাস?\nDoctor: ৯, ৮, ৭... 😨" },
    { setup: "ছাত্র পরীক্ষায় লিখল: 'আমি জানি না'", punchline: "Teacher: অন্তত সৎ! নম্বর দিলাম সততার জন্য — ০! 😂" },
    { setup: "Friend: তোর ব্রেইন কত বড়?", punchline: "আমি: যতটুকু ব্যবহার করি, ঠিক ততটুকু! 🧠" },
    { setup: "Interviewer: আপনার weakness কী?", punchline: "Candidate: সৎ থাকা।\nInterviewer: এটা তো weakness না!\nCandidate: আমিও তাই মনে করি না! 😎" },
    { setup: "মা: বড় হয়ে ডাক্তার হ!", punchline: "ছেলে: না মা, রোগী হব — সারাদিন শুয়ে থাকব! 😴" },
    { setup: "Wifi password মনে নেই।", punchline: "Guest: আপনাদের wifi password কী?\nHost: বিয়ে করো, জানতে পারবে! 😂" },
    { setup: "Student: Sir, আমার exam কেমন হয়েছে?", punchline: "Teacher: যতটুকু পড়েছো, ততটুকুই হয়েছে!\nStudent: আমি তো পড়িনি!\nTeacher: সেটাই বললাম! 😅" },
    { setup: "Phone এ charge নেই।", punchline: "আমি: 1% battery তে ২ ঘণ্টা ফেসবুক চালাই\nPhone: তোকে আর চার্জ পাবি না! 💀" }
  ];

  const joke = jokes[Math.floor(Math.random() * jokes.length)];
  api.setMessageReaction("😂", messageID, () => {}, true);
  return api.sendMessage(
    `😂 BANGLA JOKE 😂\n━━━━━━━━━━━━━━━━━━\n\n🎭 ${joke.setup}\n\n😄 ${joke.punchline}\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
