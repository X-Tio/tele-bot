const chalk = require('chalk');

/**
 * Simple logger with timestamp and levels
 */
function timestamp() {
  return new Date().toISOString();
}

const logger = {
  info: (msg, ...args) => {
    console.log(chalk.blue(`[INFO ${timestamp()}]`), msg, ...args);
  },
  warn: (msg, ...args) => {
    console.warn(chalk.yellow(`[WARN ${timestamp()}]`), msg, ...args);
  },
  error: (msg, ...args) => {
    console.error(chalk.red(`[ERROR ${timestamp()}]`), msg, ...args);
  },
  debug: (msg, ...args) => {
    console.log(chalk.green(`[DEBUG ${timestamp()}]`), msg, ...args);
  },
  command: (msg) => {
    const lines = [
      `🆔 ID     : ${msg.message_id}`,
      `👤 From  : ${msg.from.id}${msg.from.username ? ` (${msg.from.username})` : ''}`,
      `💬 Chat  : ${msg.chat.id}${msg.chat.username ? ` (${msg.chat.username})` : ''}`,
      `📍 Type  : ${msg.chat.type}`
    ];

    lines.forEach(line => console.log(chalk.green(line)));
    console.log(chalk.white(`📝 Text   : ${msg.text}\n`));
  }
};

module.exports = logger;