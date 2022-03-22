import { BaseCommand, CommandContext } from "../../Structures";

export default class extends BaseCommand {
    constructor(path: string){
        super({
            name: "ping",
            description:"Pong!"
        }, path)
    }
    execute(ctx: CommandContext): Promise<any> {
        const ping = Date.now() - Number(ctx.interaction.id / 4194304n + 1420070400000n)
        return ctx.reply(`Pong! ${ping}ms`)
    }
}