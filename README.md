
<h1 align="center">
  🤖 Telegram Bot - Tixo Framework
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Build-TelegramBot-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Status-Development-yellow?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Author-Tio-orange?style=for-the-badge" />
</p>

---

## 📦 Tentang Project

TelegramBot ini dibangun menggunakan `node-telegram-bot-api` dan mendukung sistem modular plugin berbasis kategori (`tags`), dengan fitur utama seperti:

- 📁 Auto load command & hook plugins dari folder `plugins`
- 🧠 Dukungan `before()` hook (tanpa prefix)
- 📊 Logger dengan timestamp
- 🧩 Plugin bisa ditaruh di subfolder (misal `ai/openai.js`)
- 🛠 Menu `/menu` otomatis dari plugin aktif
- 🧾 Rate limit & sistem prefix
- 💬 Sistem perintah Telegram yang fleksibel

---

## 🚀 Struktur Folder

TelegramBot/
├── index.js             # Entry point utama
├── handler.js           # Loader plugin & command handler
├── config.js            # Konfigurasi global
├── lib/
│   └── logger.js        # Logger aktivitas bot
├── plugins/
│   ├── main/menu.js     # Plugin menu otomatis
│   └── ai/openai.js     # Contoh plugin AI
└── package.json         # Info dependensi & script

---

## 📥 Instalasi

```bash
git clone https://github.com/namamu/TelegramBot
cd TelegramBot
npm install
````

Lalu isi `config.js`:

```js
module.exports = {
  prefix: '/',
  telegramToken: 'YOUR_BOT_TOKEN',
  ownerId: 123456789, // ID Telegram kamu
  rateLimitDefault: 5
};
```

---

## ✅ Menjalankan Bot

```bash
npm start
```

---

## 📜 Contoh Perintah

* `/menu` — Menampilkan daftar semua perintah
* `/cekid` — Menampilkan Chat ID & User ID
* `/ask` — (Contoh) Kirim pertanyaan ke AI

---

## ✍️ Author

* 👤 **Tio**
* 📱 Chat via WhatsApp: [wa.me/6282285357346](https://wa.me/6282285357346)
* 📬 Telegram: [@username](https://t.me/yourusername)

---

> 🔐 Script ini bersifat open-source untuk pembelajaran. Gunakan dengan bijak.
