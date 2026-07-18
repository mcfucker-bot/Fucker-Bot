module.exports.config = {
  name: "bmi",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "BMI calculate করো",
  category: "utility",
  usages: "bmi [weight_kg] [height_cm]",
  cooldowns: 3
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;
  const weight = parseFloat(args[0]);
  const height = parseFloat(args[1]);

  if (!weight || !height) return api.sendMessage(
    `⚖️ BMI CALCULATOR\n━━━━━━━━━━━━━━━━━━\n📌 ব্যবহার: bmi [weight(kg)] [height(cm)]\nউদাহরণ: bmi 65 170\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );

  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);
  const bmiFixed = bmi.toFixed(1);

  let category, emoji, advice;
  if (bmi < 18.5) {
    category = "কম ওজন (Underweight)";
    emoji = "📉";
    advice = "আরও পুষ্টিকর খাবার খাও এবং ডাক্তারের পরামর্শ নাও।";
  } else if (bmi < 25) {
    category = "স্বাভাবিক (Normal)";
    emoji = "✅";
    advice = "তুমি সুস্থ! এই অভ্যাস ধরে রাখো।";
  } else if (bmi < 30) {
    category = "বেশি ওজন (Overweight)";
    emoji = "⚠️";
    advice = "ব্যায়াম বাড়াও এবং খাদ্যাভ্যাস পরিবর্তন করো।";
  } else {
    category = "স্থূল (Obese)";
    emoji = "🔴";
    advice = "ডাক্তারের সাথে পরামর্শ করো এবং জীবনধারা পরিবর্তন করো।";
  }

  return api.sendMessage(
    `⚖️ BMI RESULT ⚖️\n━━━━━━━━━━━━━━━━━━\n\n⚖️ ওজন: ${weight} kg\n📏 উচ্চতা: ${height} cm\n\n${emoji} BMI: ${bmiFixed}\n📊 Category: ${category}\n\n💡 পরামর্শ:\n${advice}\n\n━━━━━━━━━━━━━━━━━━\n📌 স্বাভাবিক: 18.5 – 24.9\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
