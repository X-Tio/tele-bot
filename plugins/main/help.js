module.exports = {
  tags: ['main'],
  cmd: ['menu'],
  desc: 'Menampilkan list perintah berdasarkan kategori',
  limit: true,
  exec: async function(bot, { msg }) {
    const tagGroups = {};

    for (const plugin of global.commandPlugins) {
      for (const tag of plugin.tags || ['other']) {
        if (!tagGroups[tag]) tagGroups[tag] = [];
        const aliases = plugin.cmd.map(c => `/${c}`).join(', ');
        const desc = plugin.desc || '—';
        tagGroups[tag].push(`${aliases} — ${desc}`);
      }
    }
    const lines = ['🤖 *Daftar Menu:*'];
    for (const tag in tagGroups) {
      lines.push(`\n📂 *${tag.toUpperCase()}*`);
      lines.push(...tagGroups[tag].map(cmd => `  ${cmd}`));
    }

    await bot.sendMessage(msg.chat.id, lines.join('\n'), { parse_mode: 'Markdown' });
  }
};
