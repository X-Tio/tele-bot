const fs = require('fs');
const path = require('path');
const logger = require('./lib/logger');

global.commandPlugins = [];
global.hookPlugins = [];

/**
 * Recursively crawl directory and return all .js file paths
 */
function getFiles(dir) {
  let results = [];
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      results = results.concat(getFiles(full));
    } else if (file.endsWith('.js')) {
      results.push(full);
    }
  });
  return results;
}


const pluginDir = path.join(__dirname, 'plugins');
getFiles(pluginDir).forEach(file => {
  const mod = require(file);

  if (mod.exec && Array.isArray(mod.cmd)) {
    commandPlugins.push(mod);
  }
  
  if (typeof mod.before === 'function') {
    hookPlugins.push(mod.before);
  }
  
});

/**
 * Load event-based plugins: modules exporting register(bot)
 */
function loadEvents(bot) {
  getFiles(pluginDir).forEach(file => {
    const mod = require(file);
    if (typeof mod.register === 'function') {
      try {
        mod.register(bot);
        logger.debug(`Registered event plugin: ${path.relative(pluginDir, file)}`);
      } catch (err) {
        logger.error(`Error registering events in ${file}`, err);
      }
    }
  });
}

function getPluginStats() {
  return {
    command: commandPlugins.length,
    hook: hookPlugins.length
  };
}

async function handleUpdate(bot, msg) {
  const text = msg.text || '';

  for (const before of hookPlugins) {
    try {
      await before(bot, msg);
    } catch (err) {
      logger.error('Error in before hook', err);
    }
  }

  if (!text.startsWith(config.prefix)) return;

  const parts = text
    .slice(config.prefix.length)
    .trim()
    .split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  for (const plugin of commandPlugins) {
    if (plugin.cmd.includes(cmd)) {
      try {
        await plugin.exec(bot, { msg, cmd, args });
        logger.command(msg);
      } catch (err) {
        logger.error('Error executing command', err);
        bot.sendMessage(msg.chat.id, '⚠️ Error executing command.');
      }
      break;
    }
  }
}

module.exports = { handleUpdate, getPluginStats, loadEvents };