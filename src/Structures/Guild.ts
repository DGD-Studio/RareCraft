import { RareCraft } from "./BotType";
import { Guild as DGuild } from "discordeno/transformers";

export class RGuild {
    client: RareCraft;
    raw: DGuild;
    constructor(client: RareCraft, guild: DGuild){
        this.client = client
        this.raw = guild
    }

    get name(){
        return this.raw.name
    }
}