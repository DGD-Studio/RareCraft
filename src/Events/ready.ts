import { ActivityTypes, Bot, DiscordReady, User as DUser, } from 'discordeno';
import { logger, RareCraft, RUser } from '../Structures';

export default function (
  bot: RareCraft,
  payload: ReadyData,
  _rawpayload: DiscordReady
) {
  if(!bot.user) bot.user = new RUser(bot, payload.user);

  if (payload.shardId + 1 === bot.gateway.maxShards) {
    bot.helpers.editBotStatus({
      activities: [{ name: "Minecraft Java Edition", type: ActivityTypes.Game }],
      status: "dnd"
    })
    logger.event(`Successfully connected to the gateway as ${bot.user.tag}`, "Ready");
    //load(bot)
  }
};

interface ReadyData {
  shardId: number;
  v: number;
  user: DUser;
  guilds: bigint[];
  sessionId: string;
  shard?: number[];
  applicationId: bigint;
}

const load = (c: RareCraft) => {
  c.commands.cache.forEach((cmd) => {
    c.helpers.createApplicationCommand(cmd.data, 764545184653901825n)
  })
}