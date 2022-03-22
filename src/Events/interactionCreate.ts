import { RareCraft } from '../Structures';
import { Interaction } from "discordeno"

export default function (bot: RareCraft, int: Interaction) {
    return bot.commands.isInteraction(int);
}