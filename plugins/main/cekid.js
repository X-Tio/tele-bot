
module.exports = {
  tags: ['utility'],
  cmd: ['cekid'],
  desc: "Cek ID",
  limit: true,
  exec: async function(bot, { msg, command, args }) {
    const user = msg.from;
    const chat = msg.chat;
    const text =
      `🆔 Chat ID : ${chat.id}` +
      `\n👤 Your ID : ${user.id}` +
      `\n💬 Type    : ${chat.type}`;

    await bot.sendMessage(chat.id, text, {
      reply_markup: {
        inline_keyboard: [[
          { text: '📋 Chat ID', callback_data: `copy_chat_${chat.id}` },
          { text: '📋 User ID', callback_data: `copy_user_${user.id}` }
        ]]
      }
    });
  },


  register: (bot) => {
    bot.on('callback_query', async (query) => {
      const data = query.data || '';
      if (data.startsWith('copy_chat_') || data.startsWith('copy_user_')) {
        const id = data.split('_').pop();

        await bot.answerCallbackQuery(query.id, {
          text: `ID: ${id}`,
          show_alert: true
        });
      }
    });
  }
};
