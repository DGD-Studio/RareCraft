import { Client } from "discord.js"
import fs from "fs"
import path from "path"

const resolveFolder = (folderName) => path.resolve(__dirname, ".", folderName);

export function loadEvents(client: Client){
    const folder = resolveFolder("../Events")
    fs.readdirSync(folder).map(async (file) => {
        if(!file.endsWith(".js")) return
        const fileName = path.join(folder, file);
        const { default: pull } = await import(fileName);
        pull(client);
    })
    return client
}