import { RareCraft, RChannel, RGuild } from '.';
import { Interaction as DInteraction, InteractionResponse } from 'discordeno';

export class RInteraction {
  channel: RChannel;
  client: RareCraft;
  deferred = false;
  ephemeral = false;
  guild: RGuild;
  raw: DInteraction;
  replied = false;
  constructor(client: RareCraft, interaction: DInteraction) {
    this.client = client;
    this.raw = interaction;

    this.guild = new RGuild(client, { id: this.guildId });
    this.channel = new RChannel(client, { id: this.channelId }, this.guild);
  }

  get channelId() {
    return this.raw.channelId;
  }

  get guildId() {
    return this.raw.guildId;
  }

  get id(){
      return this.raw.id
  }

  get member(){
    return this.raw.member
  }

  get messageId(){
      return this.raw.message.id
  }

  get token(){
      return this.raw.token
  }

  get type() {
    return this.raw.type;
  }

  get user(){
    return this.raw.user
  }

  isCommand() {
    return this.type === Constants.INTERACTION_TYPES.APPLICATION_COMMAND;
  }

  isChatInputCommand() {
    return this.type === Constants.INTERACTION_TYPES.CHAT_INPUT;
  }
  isContextMenuCommand() {
    return this.isCommand();
  }
  isAutoComplete() {
    return this.type === Constants.INTERACTION_TYPES.APPLICATION_COMMAND_AUTOCOMPLETE;
  }
  isMessageComponent() {
    return this.type === Constants.INTERACTION_TYPES.MESSAGE_COMPONENT;
  }
  isSelectMenu() {
    return this.type === Constants.INTERACTION_TYPES.MESSAGE_COMPONENT;
  }
  isButton() {
    return this.type === Constants.INTERACTION_TYPES.MESSAGE_COMPONENT;
  }

  async deferReply(options: InteractionResponse, ephemeral: boolean = false) {
    if (this.deferred || this.replied) throw new Error("Interaction has been already replied");
    const Payload = { data: {}, type: Constants.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE };
    options.type = 5;
    this.ephemeral = ephemeral 
    this.deferred = true;
    return this.client.helpers.sendInteractionResponse(this.id, this.token, options);
  }

  async deferUpdate(options = {}) {
    if (this.deferred || this.replied) throw new Error("Interaction has been already replied");
    this.deferred = true;
    const Payload = { data: options, type: Constants.DEFERRED_UPDATE_MESSAGE };
    return this.client.helpers.sendInteractionResponse(this.id, this.token, Payload);
  }

  async reply(options: any, ephemeral: boolean = false) {
    if (this.deferred || this.replied) return this.followUp(options);
    this.ephemeral = ephemeral;
    if (this.ephemeral && options.data && !options.data?.flags) options.data.flags = 64
    this.replied = true;
    const Payload = { data: options.data ?? options, type: Constants.CHANNEL_MESSAGE_WITH_SOURCE };
    return this.client.helpers.sendInteractionResponse(this.id, this.token, Payload);
  }

  async popupModal(options = {}) {
    if (this.deferred || this.replied) throw new Error("Interaction has been already replied");
    const Payload = { data: options, type: Constants.MODAL };
    this.replied = true;
    return this.client.helpers.sendInteractionResponse(this.id, this.token, Payload);
  }

  async editReply(options = {}) {
    if (!this.deferred && !this.replied) throw new Error("Interaction has not been replied");
    this.replied = true;
    // @ts-ignore
    const messageId = this.messageId ? this.messageId : options.messageId;
    return this.client.helpers.editInteractionResponse(this.token, options);
  }

  async deleteReply(options = {}) {
    if (this.ephemeral) throw new Error("Ephemeral messages cannot be deleted");
    //@ts-ignore
    const messageId = this.messageId ? this.messageId : options.messageId;
    return this.client.helpers.deleteInteractionResponse(this.token, messageId);
  }

  async followUp(options = {}) {
    if (!this.replied || !this.deferred) throw new Error("Interaction has not been replied");
    const Payload = { data: options, type: Constants.CHANNEL_MESSAGE_WITH_SOURCE };
    return this.client.helpers.sendInteractionResponse(this.id, this.token, Payload);
  }

  async update(options = {}) {
    if (this.deferred || this.replied) throw new Error("Interaction has been already replied");
    const Payload = { data: options, type: Constants.UPDATE_MESSAGE };
    this.replied = true;
    return this.client.helpers.sendInteractionResponse(this.id, this.token, Payload);
  }
}

interface Options extends Omit<InteractionResponse, "type"> {
    ephemeral?: boolean;
}

const Constants = {
  DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE: 5,
  CHANNEL_MESSAGE_WITH_SOURCE: 4,
  DEFERRED_UPDATE_MESSAGE: 6,
  UPDATE_MESSAGE: 7,
  APPLICATION_COMMAND_AUTOCOMPLETE_RESULT: 8,
  MODAL: 9,
  FLAGS: { EPHEMERAL: 64 },
  INTERACTION_TYPES: {
    CHAT_INPUT: 1,
    APPLICATION_COMMAND: 2,
    CONTEXT_MENU: 2,
    MESSAGE_COMPONENT: 3,
    APPLICATION_COMMAND_AUTOCOMPLETE: 4,
  },
};
