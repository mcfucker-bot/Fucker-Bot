module.exports.config = {
  name: "update",
  eventType: ["log:unsubscribe"],
  version: "1.0.1",
  credits: "Emon",
  description: "Automatically delete time-join data when a user leaves"
};

const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname, "../commands/system/timejoin.json");

module.exports.run = async function ({ event }) {
  const logger = require("../../Emon/catalogs/Emonc.js");
  const { threadID, logMessageData } = event;
  const leftUID = logMessageData.leftParticipantFbId;

  try {
    const raw = fs.readFileSync(dataPath, "utf8");
    const data = JSON.parse(raw);
    data[leftUID + threadID] = "";
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    logger("updated timejoin database successfully\n", "database");
  } catch (e) {
    // file না থাকলে silent fail — normal
  }
};
