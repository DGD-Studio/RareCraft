import { Bot } from "discordeno";
import { RUser } from ".";
import { CommandManager } from "../Managers";

export interface RareCraft extends Bot {
    user: RUser;
    commands: CommandManager;
}