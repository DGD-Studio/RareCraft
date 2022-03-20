import { Interaction } from 'discordeno/transformers';
import { RareCraft } from '../Structures';
import { readdirSync } from 'fs';
import path from 'path';
const resolveFolder = (folderName) => path.resolve(__dirname, '.', folderName);

export class CommandManager {
  private cache = new Map();
  constructor(client: RareCraft) {}

  isInteraction(interaction: Interaction) {
    if (interaction.type != 2) return;
    return this.onInteraction(interaction);
  }

  load() {
    const commandsFolder = resolveFolder('../Commands');
    readdirSync(commandsFolder).map((folder) => {
      readdirSync(path.join(commandsFolder, folder)).map((file) => {
        this.loadCommand(path.join(commandsFolder, folder, file));
      });
    });
  }

  async loadCommand(cpath: string) {
    delete require.cache[require.resolve(path.join(cpath))];
    const { default: pull } = await import(path.join(cpath));
    const cmd = new pull();
    if (this.cache.has(cmd.name)) this.cache.delete(cmd.name);
    return this.cache.set(cmd.name, cmd);
  }

  async onInteraction(interaction: Interaction) {
    const cmd = this.cache.get(interaction.data.name);
    if (!cmd) return;

    const args = [];
    interaction.data.options.map((o) => {
      if (o.name) args.push(o.name);
      if (o.options) {
        o.options.map((o2) => {
          if (o2.value) return args.push(o2.value);
          if (o2.name) args.push(o2.name);
          if (o2.options) o2.options.map((v) => args.push(v.value));
        });
      }
    });

    
  }

  reloadCommand(commandName) {
    const cmd = this.cache.get(commandName);
    if (!cmd) return;
    const commandPath = path.join(cmd.path);
    delete require.cache[require.resolve(commandPath)];
    return this.loadCommand(commandPath);
  }
}
