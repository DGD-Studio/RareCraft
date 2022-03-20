import { ActivityTypes, Bot, DiscordReady, User as DUser, } from 'discordeno';
import { RareCraft, User } from '../Structures';

export default function (
  bot: RareCraft,
  payload: ReadyData,
  _rawpayload: DiscordReady
) {
  bot.user = new User(bot, payload.user);

  if (payload.shardId + 1 === bot.gateway.maxShards) {
    bot.helpers.editBotStatus({
      activities: [{ name: "Minecraft Java Edition", type: ActivityTypes.Game }],
      status: "dnd"
    })
    console.log(`Successfully connected to the gateway as ${bot.user.tag}`);
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
