import { RareCraft } from './BotType';
import {
  Channel as DChannel,
  CreateGuildChannel,
  Guild as DGuild,
} from 'discordeno';
import { RGuild } from '.';

export class RChannel {
  client: RareCraft;
  raw: DChannel;
  guild?: DGuild;
  constructor(client: RareCraft, channel: DChannel, guild?: DGuild) {
    this.client = client;
    if (guild) this.guild = guild;
    else if (channel.guildId)
      this.guild = new RGuild(client, { id: channel.guildId });
    this.raw = channel  

    this.client = client;
  }

  async create(options: CreateGuildChannel, reason) {
    return this.client.helpers.createChannel(this.guildId, options, reason);
  }

  async edit(options = {}, reason) {
    return this.client.helpers.editChannel(this.id, options, reason);
  }

  async delete(reason) {
    return this.client.helpers.deleteChannel(this.id, reason);
  }

  get id() {
      return this.raw.id
  }

  get guildId(){
      return this.raw.guildId
  }

  async send(options = {}) {
    return this.client.helpers.sendMessage(this.id, options);
  }
}
