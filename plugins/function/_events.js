module.exports.before = async function(bot, msg) {
  const text = msg.text || '';
  if (/^help$/i.test(text)) {
    await bot.sendMessage(msg.chat.id, '📖 Butuh bantuan? Ketik /menu untuk melihat daftar perintah.');
  }
};
