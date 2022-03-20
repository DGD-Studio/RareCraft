import fs from "fs"
import path from "path"

const resolveFolder = (folderName) => path.resolve(__dirname, ".", folderName);

export class EventManager {
    _events: any;
    constructor(){
        this._events = {};
    }

    load() {
        const eventsFolder = resolveFolder("../Events");
        fs.readdirSync(eventsFolder).map(async (file) => {
          if (!file.endsWith(".js")) return;
    
          const fileName = path.join(eventsFolder, file);
          const event = require(fileName);
          const eventName = file.split(".")[0];
          
          this._events[`${eventName}`] = event.default;
        });
    
        return this._events;
      }
}