import { createBot, startBot } from 'discordeno';
import config from '../config.json';
import { CommandManager, EventManager } from './Managers';
import { RareCraft, logger } from './Structures';

logger.bot(`Starting Bot`);
const events = new EventManager();
const bot = createBot({
  botId: BigInt(
    Buffer.from(config.token, 'base64')
      .toString('ascii')
      .toString()
      .split('_')[0]
      .slice(0, 18)
  ),
  token: config.token,
  events: events.load(),
  intents: ['Guilds'],
});

const rare = bot as RareCraft;
rare.commands = new CommandManager(rare);
rare.commands.load();

startBot(bot);
