<div align="center">

<img src="Emon/catalogs/website/logo.png" alt="EMon-BHai Bot" width="280"/>

# ⚡ EMon-BHai-BOT

**Facebook Messenger Bot — Smart • Fast • Reliable**

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Platform](https://img.shields.io/badge/Platform-Facebook%20Messenger-1877F2?style=for-the-badge&logo=messenger&logoColor=white)](https://messenger.com)
[![Language](https://img.shields.io/badge/Language-Bangla%20%7C%20English-FF6B35?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/License-Private-red?style=for-the-badge)](#)

> 🤖 একটি শক্তিশালী Facebook Messenger Bot যা group ও inbox এ কাজ করে।  
> বাংলা ও ইংরেজি উভয় ভাষায় সম্পূর্ণ সাপোর্ট।

---

</div>

## 📦 Features

<table>
<tr>
<td width="50%">

**🛡️ Group Protection**
- Anti-Link — ক্ষতিকর লিংক block
- Anti-Spam — flood detection + kick
- Anti-Swear — গালিগালাজ detection
- GC Protect — group name/photo সুরক্ষা
- Lockdown — admin-only mode

</td>
<td width="50%">

**🎵 Media & Entertainment**
- YouTube video download
- YouTube audio (MP3) download
- Random mix video API
- Shoti, anime, wallpaper
- Auto emoji reactions

</td>
</tr>
<tr>
<td>

**⚙️ Admin Tools**
- Ban / Unban system
- Group management (kick, mute, warn)
- Broadcast notifications
- XP & Rank system
- Auto-message scheduler

</td>
<td>

**🎮 Fun Commands**
- AI chat, jokes, hadith
- Hack simulator, quote generator
- Emoji trigger responses
- Murgi gali commands 😈
- Games & interactive replies

</td>
</tr>
</table>

---

## 🚀 Quick Setup

### ১. Dependencies install করো
```bash
npm install
```

### ২. Session file নাও
`Emonstate.json` বের করতে browser extension ব্যবহার করো।  
বিস্তারিত → [`Emon.md`](Emon.md)

### ৩. Config সেট করো
`Emon/configs/Emon.json` ফাইলে:
```json
{
  "BOTNAME": "EMon-BHai-BOT",
  "PREFIX": ".",
  "ADMINBOT": ["তোমার Facebook UID"]
}
```

### ৪. Bot চালু করো
```bash
npm start
```

---

## 📁 Project Structure

```
EMon-BHai-Bot/
│
├── 📂 Emon/
│   ├── catalogs/        ← Bot entry point & loader
│   ├── configs/         ← Bot configuration (Emon.json)
│   ├── system/          ← Core handlers & database
│   └── assets/          ← Bot assets (images)
│
├── 📂 scripts/
│   ├── commands/        ← All bot commands (129+)
│   └── events/          ← Event listeners (13+)
│
├── 📂 datasqlite/       ← SQLite database (auto-created)
├── Emonstate.json       ← Facebook session (তুমি দেবে)
└── Emon.js              ← Custom automation
```

---

## 🧩 Commands (129+)

<details>
<summary><b>📋 সব command দেখো (click করো)</b></summary>

### 🎵 Media
| Command | Description |
|---------|-------------|
| `video` | YouTube video search & download |
| `song` | YouTube audio (MP3) download |
| `random` | Random mix video |
| `rndm` | Name দিয়ে video খোঁজো |
| `rndmadd` | Mix API তে video যোগ করো |
| `shoti` | Random cute image |
| `anime` | Anime image |
| `wallpaper` | Wallpaper download |
| `imgur` | Image upload |

### 🤖 AI & Info
| Command | Description |
|---------|-------------|
| `ai` | AI chat |
| `wiki` | Wikipedia search |
| `weather` | আবহাওয়া |
| `translate` | ভাষা অনুবাদ |
| `dictionary` | শব্দের অর্থ |
| `lyrics` | গানের lyrics |
| `hadis` | হাদিস |

### 🛡️ Admin
| Command | Description |
|---------|-------------|
| `ban` / `unban` | User ban/unban |
| `kick` | Group থেকে বের করো |
| `warn` | Warning দাও |
| `mute` | Message lock |
| `admin` | Admin দাও |
| `approve` | Group approval |
| `toggle` | Feature চালু/বন্ধ |
| `sendnoti` | Broadcast message |

### 🎮 Fun
| Command | Description |
|---------|-------------|
| `joke` | মজার jokes |
| `8ball` | Magic 8 ball |
| `hack` | Fake hack effect |
| `quotes` | Motivational quotes |
| `flip` | মুদ্রা উল্টানো |
| `murgi` ~ `murgi6` | গালি commands 😈 |

### ⚙️ Utility
| Command | Description |
|---------|-------------|
| `help` | Command list |
| `ping` | Bot response time |
| `uptime` | Bot চালু থাকার সময় |
| `prefix` | Prefix দেখো |
| `calc` | Calculator |
| `qr` | QR code তৈরি |
| `remind` | Reminder set |
| `xp` | XP ও rank দেখো |

</details>

---

## 📡 Events (13+)

| Event | Description |
|-------|-------------|
| `join` | Welcome image সহ নতুন member |
| `leave` | Goodbye image সহ বিদায় |
| `antilink` | ক্ষতিকর link auto-delete |
| `antispam` | Flood detection & kick |
| `antiswear` | গালি detection & warn |
| `autoreact` | Keyword-based auto reaction |
| `gcprotect` | Group সুরক্ষা |
| `rankup` | XP system & rank notification |
| `unsend` | Unsent message detect |
| `namechange` | Group name/photo change notify |

---

## 💬 Emoji Triggers (No Prefix)

কিছু emoji message পাঠালে bot automatically respond করে:

| Emoji | Response |
|-------|----------|
| 😒 | ভালোবাসার কথা 🥀 |
| 😭 | সান্ত্বনার কথা 🌈 |
| ❤️ | ভালোবাসার message 💕 |
| 😘 | আদরের reply 🥰 |
| 😈 | শয়তান mode 🔥 |
| 🥺 | কিউট reply 🫠 |
| 💀 | Funny dead reply 😂 |

---

## 👨‍💻 Developer

<div align="center">

<img src="Emon/catalogs/website/logo.png" alt="Emon" width="150" style="border-radius: 50%"/>

**EMon-BHai**  
*Facebook Messenger Bot Developer*

[![Facebook](https://img.shields.io/badge/Facebook-EMon--BHai-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](#)

</div>

---

<div align="center">

**⭐ ভালো লাগলে star দিতে ভুলো না!**

*Made with ❤️ by EMon-BHai*

</div>
