import { red, cyan, yellow } from 'colors';

class Logger {
  constructor(public name: string) {}

  log(msg: string, name: number = 1, func: number = 1, additional?: string) {
    const color = funcs[func];
    const colorName = funcNames[func];
    const system = additional
      ? `${systemnames[name]}${additional}`
      : systemnames[name];
    return console.log(color(`[${colorName}] [${system}] - ${msg}`));
  }

  event(msg: string, event: string, func: number = 1) {
    return this.log(msg, 5, func, event);
  }

  eventM(msg: string, func: number = 1) {
    return this.log(msg, 3, func);
  }

  cmd(msg: string, command: string, func: number = 1) {
    return this.log(msg, 6, func, command);
  }

  cmdM(msg: string, func: number = 1) {
    return this.log(msg, 2, func);
  }

  bot(msg: string, func: number = 1) {
    return this.log(msg, 1, func);
  }

  db(msg: string, func: number = 1) {
    return this.log(msg, 4, func);
  }
}

const funcs = {
  1: cyan,
  2: red,
  3: yellow,
};

const funcNames = {
  1: 'Info',
  2: 'Error',
  3: 'Warning',
};

const systemnames = {
  1: 'Bot',
  2: 'CommandManager',
  3: 'EventManager',
  4: 'Database Manager',
  5: 'Event: ',
  6: 'Command: ',
};

export const logger = new Logger('Rarecraft');
