require('./config');
const TelegramBot = require('node-telegram-bot-api');
const { handleUpdate, loadEvents, getPluginStats } = require('./handler');
const logger = require('./lib/logger');

const bot = new TelegramBot(config.telegramToken, { polling: true });

bot.on('polling_error', (err) => {
  logger.error('Polling error', err);
});

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled rejection', reason);
});

loadEvents(bot);

(async () => {
  try {
    const owner = Number(config.ownerId);       // pastikan Number
    const stats = getPluginStats();
    await bot.sendMessage(owner,
      `🤖 Bot Connected\n\n📦 Plugins loaded:\n` +
      `> Command: ${stats.command}\n` +
      `> Hooks: ${stats.hook}`
    );
  } catch (err) {
    logger.error('Failed to send startup message to owner', err);
  }
})();

bot.on('message', msg => handleUpdate(bot, msg));