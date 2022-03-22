import fs from "fs"
import path from "path"
import { logger } from "../Structures";

const resolveFolder = (folderName) => path.resolve(__dirname, ".", folderName);

export class EventManager {
    _events: any;
    constructor(){
        this._events = {};
    }

    load() {
      logger.eventM("Loading Events")
        const eventsFolder = resolveFolder("../Events");
        fs.readdirSync(eventsFolder).map(async (file) => {
          if (!file.endsWith(".js")) return;
    
          const fileName = path.join(eventsFolder, file);
          const event = require(fileName);
          const eventName = file.split(".")[0];
          logger.eventM(`Loading Event ${eventName}`)

          this._events[`${eventName}`] = event.default;
        });
        logger.eventM(`Finshed Loading Events | Total of ${Object.keys(this._events).length} Events loaded`)
        return this._events;
      }
}