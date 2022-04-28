import { Client } from "discord.js";

export default function (client: Client) {
    client.on("ready", () => {
        console.log("Bot Online")
    })
}