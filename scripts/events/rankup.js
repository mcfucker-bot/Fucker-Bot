module.exports.config = {
  name: "rankup",
  eventType: ["message"],
  version: "1.0.0",
  credits: "Emon",
  description: "XP system — earn points for chatting, rank up with styled notification",
  envConfig: {
    enable: true
  }
};

// Rank সংজ্ঞা
const RANKS = [
  { name: "🌱 Newcomer",  min: 0    },
  { name: "🌿 Member",    min: 100  },
  { name: "🍀 Regular",   min: 300  },
  { name: "⭐ Active",    min: 700  },
  { name: "🌟 Veteran",   min: 1500 },
  { name: "💎 Elite",     min: 3000 },
  { name: "👑 Legend",    min: 6000 }
];

function getRank(xp) {
  let rank = RANKS[0];
  for (const r of RANKS) {
    if (xp >= r.min) rank = r;
    else break;
  }
  return rank;
}

function getNextRank(xp) {
  for (const r of RANKS) {
    if (xp < r.min) return r;
  }
  return null;
}

// XP per message: random 2–6
function randomXP() {
  return Math.floor(Math.random() * 5) + 2;
}

module.exports.run = async function ({ api, event, Users }) {
  if (!global.configModule[this.config.name]?.enable) return;
  const { threadID, senderID, type } = event;
  if (type !== "message") return;

  // Bot এর message XP দেবে না
  if (senderID === api.getCurrentUserID()) return;

  let userData;
  try { userData = await Users.getData(senderID); } catch (e) { return; }
  if (!userData) return;

  const data = userData.data || {};
  const oldXP = data.xp || 0;
  const earned = randomXP();
  const newXP = oldXP + earned;

  const oldRank = getRank(oldXP);
  const newRank = getRank(newXP);

  data.xp = newXP;
  try { await Users.setData(senderID, { data }); } catch (e) { /* silent */ }

  // Rank up হলে notify করো
  if (newRank.name !== oldRank.name) {
    const name = userData.name || "বন্ধু";
    const nextRank = getNextRank(newXP);
    const nextInfo = nextRank ? `\n▸ পরের rank : ${nextRank.name} (${nextRank.min - newXP} XP বাকি)` : "\n🎊 সর্বোচ্চ rank অর্জন!";

    return api.sendMessage(
      `╔══════════════════╗\n   🏆 RANK UP!   \n╚══════════════════╝\n\n🎉 অভিনন্দন, ${name}!\n\n▸ আগের rank : ${oldRank.name}\n▸ নতুন rank : ${newRank.name}\n▸ মোট XP : ${newXP.toLocaleString()}${nextInfo}\n\n══════════════════\n💎 ${global.config.BOTNAME || "EMon-BHai-BOT"}`,
      threadID
    );
  }
};
