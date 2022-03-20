import { createBot, startBot } from "discordeno"
import config from "../config.json"
import { EventManager } from "./Managers"

const events = new EventManager()
const bot = createBot({
    botId: BigInt(Buffer.from(config.token, "base64").toString("ascii").toString().split("_")[0].slice(0, 18)),
    token: config.token,
    events: events.load(),
    intents: ["Guilds"]
})

startBot(bot)