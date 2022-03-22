import { CreateMessage } from 'discordeno/*';
import { Message } from 'discordeno/transformers';
import { RareCraft, RGuild, RChannel, RUser } from '.';

export class RMessage {
  guild: RGuild;
  channel: RChannel;
  author: RUser;
  raw: Message;
  constructor(private client: RareCraft, message: Message) {
    console.log(message)
    this.raw = message;
    this.guild = new RGuild(client, { id: this.guildId });
    this.channel = new RChannel(client, { id: this.channelId }, this.guild.raw);
    //this.member = new RMember(client, message.member, { guild: this.guild });
    this.author = new RUser(client, {
      id: this.authorId,
      username: this.raw.tag?.split('#')[0],
      discriminator: Number(this.raw.tag?.split('#')[1]),
    });
  }

  get id() {
    return this.raw.id;
  }

  get guildId() {
    return this.raw.guildId;
  }

  get channelId() {
    return this.raw.channelId;
  }

  get authorId() {
    return this.raw.authorId;
  }

  async edit(options) {
    return this.client.helpers.editMessage(this.channel.id, this.id, options);
  }

  async reply(options: CreateMessage = {}) {
    if (!options.messageReference) {
      options.messageReference = {
        messageId: this.id,
        channelId: this.channel.id,
        guildId: this.guildId,
        failIfNotExists: false,
      };
    }
    return this.client.helpers.sendMessage(this.channel.id, options);
  }

  async delete(options: { reason?: string; delayMilliseconds?: number }) {
    return this.client.helpers.deleteMessage(
      this.channel.id,
      this.id,
      options.reason,
      options.delayMilliseconds
    );
  }

  async react(emoji) {
    return this.client.helpers.addReaction(this.channel.id, this.id, emoji);
  }

  async pin() {
    return this.client.helpers.pinMessage(this.channel.id, this.id);
  }

  async unpin() {
    return this.client.helpers.unpinMessage(this.channel.id, this.id);
  }
}
