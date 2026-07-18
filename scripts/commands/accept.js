module.exports.config = {
  name: "accept",
  version: "1.0.0",
  permission: 2,
  credits: "Emon",
  prefix: true,
  description: "Manage Facebook friend requests",
  category: "admin",
  usages: "accept",
  cooldowns: 5
};

module.exports.handleReply = async ({ handleReply, event, api }) => {
  const { author, listRequest } = handleReply;
  if (author != event.senderID) return;
  const args = event.body.replace(/ +/g, " ").toLowerCase().split(" ");

  const form = {
    av: api.getCurrentUserID(),
    fb_api_caller_class: "RelayModern",
    variables: {
      input: {
        source: "friends_tab",
        actor_id: api.getCurrentUserID(),
        client_mutation_id: Math.round(Math.random() * 19).toString()
      },
      scale: 3,
      refresh_num: 0
    }
  };

  const success = [], failed = [];

  if (args[0] == "add") {
    form.fb_api_req_friendly_name = "FriendingCometFriendRequestConfirmMutation";
    form.doc_id = "3147613905362928";
  } else if (args[0] == "del") {
    form.fb_api_req_friendly_name = "FriendingCometFriendRequestDeleteMutation";
    form.doc_id = "4108254489275063";
  } else return api.sendMessage(
    `❌ সঠিক option দাও: add অথবা del`,
    event.threadID, event.messageID
  );

  let targetIDs = args.slice(1);
  if (args[1] == "all") {
    targetIDs = [];
    const lengthList = listRequest.length;
    for (let i = 1; i <= lengthList; i++) targetIDs.push(i);
  }

  const newTargetIDs = [], promiseFriends = [];
  for (const stt of targetIDs) {
    const u = listRequest[parseInt(stt) - 1];
    if (!u) { failed.push(`#${stt} পাওয়া যায়নি`); continue; }
    form.variables.input.friend_requester_id = u.node.id;
    form.variables = JSON.stringify(form.variables);
    newTargetIDs.push(u);
    promiseFriends.push(api.httpPost("https://www.facebook.com/api/graphql/", form));
    form.variables = JSON.parse(form.variables);
  }

  for (let i = 0; i < newTargetIDs.length; i++) {
    try {
      const friendRequest = await promiseFriends[i];
      if (JSON.parse(friendRequest).errors) failed.push(newTargetIDs[i].node.name);
      else success.push(newTargetIDs[i].node.name);
    } catch(e) { failed.push(newTargetIDs[i].node.name); }
  }

  const action = args[0] == 'add' ? 'Accept' : 'Delete';
  return api.sendMessage(
    `╔══════════════════╗\n   👥 FRIEND REQUEST   \n╚══════════════════╝\n\n✅ ${action} সফল : ${success.length} জন\n${success.length > 0 ? success.map(n => `▸ ${n}`).join('\n') + '\n' : ''}${failed.length > 0 ? `\n❌ ব্যর্থ : ${failed.length} জন\n${failed.map(n => `▸ ${n}`).join('\n')}` : ''}\n\n══════════════════\n💎 EMon-BHai-BOT`,
    event.threadID, event.messageID
  );
};

module.exports.run = async ({ event, api }) => {
  const moment = require("moment-timezone");
  const form = {
    av: api.getCurrentUserID(),
    fb_api_req_friendly_name: "FriendingCometFriendRequestsRootQueryRelayPreloader",
    fb_api_caller_class: "RelayModern",
    doc_id: "4499164963466303",
    variables: JSON.stringify({input: {scale: 3}})
  };
  const listRequest = JSON.parse(await api.httpPost("https://www.facebook.com/api/graphql/", form)).data.viewer.friending_possibilities.edges;

  if (listRequest.length === 0) return api.sendMessage(
    `╔══════════════════╗\n   👥 FRIEND REQUEST   \n╚══════════════════╝\n\n✅ বর্তমানে কোনো pending friend request নেই।`,
    event.threadID, event.messageID
  );

  let msg = `╔══════════════════╗\n   👥 FRIEND REQUEST   \n╚══════════════════╝\n\n📋 মোট : ${listRequest.length}টি request\n\n`;
  let i = 0;
  for (const user of listRequest) {
    i++;
    msg += `${i}. 👤 ${user.node.name}\n   🔖 ID : ${user.node.id}\n   🔗 ${user.node.url.replace("www.facebook", "fb")}\n   📅 ${moment(user.time * 1009).tz("Asia/Dhaka").format("DD/MM/YYYY HH:mm")}\n\n`;
  }
  msg += `══════════════════\n📌 Reply করো : add all / del all\n   অথবা : add 1 2 3 / del 1 2`;

  return api.sendMessage(msg, event.threadID, (e, info) => {
    global.client.handleReply.push({
      name: this.config.name,
      messageID: info.messageID,
      listRequest,
      author: event.senderID
    });
  }, event.messageID);
};
