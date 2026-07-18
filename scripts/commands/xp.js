module.exports.config = {
  name: "xp",
  version: "1.0.0",
  permission: 0,
  credits: "Emon",
  prefix: true,
  description: "Check your XP and rank",
  category: "user",
  usages: "xp  |  xp @mention",
  cooldowns: 5
};

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
  for (const r of RANKS) { if (xp >= r.min) rank = r; else break; }
  return rank;
}

function getNextRank(xp) {
  for (const r of RANKS) { if (xp < r.min) return r; }
  return null;
}

function xpBar(xp, next) {
  if (!next) return "█████████████████████ MAX";
  const total = next.min;
  const pct = Math.min(Math.floor((xp / total) * 20), 20);
  return "█".repeat(pct) + "░".repeat(20 - pct) + ` ${Math.floor((xp / total) * 100)}%`;
}

module.exports.run = async function ({ api, event, Users }) {
  const { threadID, messageID, senderID, mentions } = event;

  const targetID = Object.keys(mentions)[0] || senderID;

  let userData;
  try { userData = await Users.getData(targetID); } catch (e) {
    return api.sendMessage(`❌ User data পাওয়া যায়নি।`, threadID, messageID);
  }

  const data = userData?.data || {};
  const xp = data.xp || 0;
  const rank = getRank(xp);
  const next = getNextRank(xp);
  const bar = xpBar(xp, next);
  const nextInfo = next
    ? `▸ পরের rank : ${next.name}\n▸ দরকার : ${next.min - xp} XP`
    : `🎊 সর্বোচ্চ rank!`;

  const name = userData?.name || "বন্ধু";

  return api.sendMessage(
    `╔══════════════════╗\n   🏆 XP & RANK   \n╚══════════════════╝\n\n👤 ${name}\n\n▸ Rank : ${rank.name}\n▸ XP : ${xp.toLocaleString()}\n\n${bar}\n\n${nextInfo}\n\n══════════════════\n💎 ${global.config.BOTNAME || "EMon-BHai-BOT"}`,
    threadID, messageID
  );
};
