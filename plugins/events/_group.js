module.exports.register = (bot) => {
  bot.on('new_chat_members', (msg) => {
    msg.new_chat_members.forEach(user => {
      bot.sendMessage(msg.chat.id, `Selamat datang, ${user.first_name}! 👋`);
    });
  });
};