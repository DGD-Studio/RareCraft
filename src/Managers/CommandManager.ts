import { Interaction } from 'discordeno/transformers';
import { BaseCommand, CommandContext, logger, RareCraft } from '../Structures';
import { readdirSync } from 'fs';
import path from 'path';
const resolveFolder = (folderName) => path.resolve(__dirname, '.', folderName);

export class CommandManager {
  cache = new Map<string, BaseCommand>();
  constructor(private client: RareCraft) {}

  isInteraction(interaction: Interaction) {
    if (interaction.type != 2) return;
    return this.onInteraction(interaction);
  }

  load() {
    logger.cmdM('Loading Commands');
    const commandsFolder = resolveFolder('../Commands');
    return readdirSync(commandsFolder).map((folder) => {
      readdirSync(path.join(commandsFolder, folder)).map((file) => {
        this.loadCommand(path.join(commandsFolder, folder, file));
      });
    });
  }

  async loadCommand(cpath: string) {
    delete require.cache[require.resolve(path.join(cpath))];
    const { default: pull } = await import(path.join(cpath));
    const cmd: BaseCommand = new pull(cpath);
    logger.cmdM(`Loading Command into cache ${cmd.data.name}`);
    if (this.cache.has(cmd.data.name)) this.cache.delete(cmd.data.name);
    this.cache.set(cmd.data.name, cmd);
    logger.cmdM(`Command ${cmd.data.name} Loaded`);
    return true;
  }

  async onInteraction(interaction: Interaction) {
    const cmd = this.cache.get(interaction.data.name);
    if (!cmd) return;

    const args = [];
    if(interaction.data.options) interaction.data.options.map((o) => {
      if (o.name) args.push(o.name);
      if (o.options) {
        o.options.map((o2) => {
          if (o2.value) return args.push(o2.value);
          if (o2.name) args.push(o2.name);
          if (o2.options) o2.options.map((v) => args.push(v.value));
        });
      }
    });

    const ctx = new CommandContext({
      manager: this,
      message: interaction.message,
      interaction,
      client: this.client,
      args: args,
      commandName: cmd.data.name,
    });

    cmd.execute(ctx)/*.catch((err) => {
      logger.cmd(`Command failed with error: ${err}`, cmd.data.name, 2)
      return ctx.onError(err);
    });*/
  }

  reloadCommand(commandName) {
    const cmd = this.cache.get(commandName);
    if (!cmd) return;
    logger.cmdM(`Reloading the command ${commandName}`);
    const commandPath = path.join(cmd.path);
    delete require.cache[require.resolve(commandPath)];
    this.loadCommand(commandPath);
    return logger.cmdM(`Finished Reloading ${commandName}`);
  }
}
