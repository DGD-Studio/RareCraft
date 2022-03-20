import { Bot } from "discordeno";
import { User } from ".";

export interface RareCraft extends Bot {
    user: User;
}