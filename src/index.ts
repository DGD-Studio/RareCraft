import { Client, GatewayIntentBits, ActivityType } from "discord.js"
import { token } from "../config.json"
import { loadEvents } from "./Managers/EventShit"

const client = new Client({
  intents: [GatewayIntentBits.GuildMembers, GatewayIntentBits.Guilds],
  presence: {
    activities: [
      {
        name: "Minecraft v4.2.0",
        type: ActivityType.Playing,
      }
    ],
    status: "dnd"
  }
})
loadEvents(client)

client.login(token)