import { RInteraction, RareCraft, RMessage } from '.';
import { User, Channel, Guild, Member } from 'discordeno';

export class CommandContext {
  interaction: RInteraction;
  user: User;
  channel: Channel;
  member: Member;
  guild: Guild;
  client: RareCraft;
  message: RMessage;
  replied = false

  constructor(data) {
    this.message = data.message && new RMessage(data.client, data.message);
    this.interaction =
      data.interaction && new RInteraction(data.client, data.interaction);
    if(this.interaction.user) this.user = this.interaction.user;
    this.guild = this.interaction.guild;
    this.member = this.interaction.member;
    this.channel = this.interaction.channel;
    this.client = data.client;
    //this.settings = data.settings ?? {};
  }

  async reply(content, ephemeral: boolean = false) {
    // When just a string is passed, we assume it's the content -> transform to correct formatted payload
    if (typeof content === "string") content = { content };
    if (this.interaction) {
      if (this.replied) return this.followUp(content);
      const reply = await this.interaction.reply(content, ephemeral);
      console.log(reply)
      //Assign properties to the response
      const response = new RMessage(this.client, reply);

      this.replied = true;
      return response;
    }
    if (this.message) {
      if (this.replied) return this.followUp(content);

      const msg = await this.message.channel.send(content);

      //Assign properties to the response
      const response = new RMessage(this.client, msg);
      this.replied = true;
      return response;
    }
  }

  async followUp(content) {
    if (this.interaction) {
      const reply = await this.interaction.followUp(content);
      const response = new RMessage(this.client, reply);
      return response;
    }
    if (this.message) {
      const msg = await this.message.channel.send(content);
      const response = new RMessage(this.client, msg);
      return response;
    }
  }

  onError(error) {
    return this.reply({ content: `A unknown Error happend: \n> ${error}` });
  }
}
