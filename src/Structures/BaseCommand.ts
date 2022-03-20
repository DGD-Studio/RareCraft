import { RInteraction, RareCraft } from '.';
import { User, Channel, Guild, Member } from 'discordeno';

export class BaseCommand {
  interaction: RInteraction;
  user: User;
  channel: Channel;
  member: Member;
  guild: Guild;
  client: RareCraft;

  constructor(data) {
    //this.message = data.message && new RMessage(data.client, data.message);
    this.interaction =
      data.interaction && new RInteraction(data.client, data.interaction);
    this.user = this.interaction.user;
    this.guild = this.interaction.guild;
    this.member = this.interaction.member;
    this.channel = this.interaction.channel;
    this.client = data.client;
    //this.settings = data.settings ?? {};
  }

  
}
