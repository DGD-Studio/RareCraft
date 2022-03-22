import { CreateApplicationCommand } from 'discordeno/*';
import { CommandContext } from './CommandContext';
import { logger } from './Logger';

export class BaseCommand {
  public path: string;
  constructor(public data: CreateApplicationCommand, path: string) {
    this.path = path;
  }

  async execute(_ctx: CommandContext) {
    logger.cmd(
      'No execute function found for this command.',
      this.data.name,
      3
    );
  }
}
