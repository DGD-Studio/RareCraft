import { User as DUser } from 'discordeno';
import { RareCraft } from './index';

export class User {
  private client: RareCraft;
  private data: DUser;
  constructor(client, user: DUser) {
    this.client = client;
    this.data = user;
  }

  get avatar(){
      return this.data.avatar
  }

  get id(){
      return this.data.id
  }

  get discriminator(){
      return this.data.discriminator
  }

  get tag() {
    return `${this.data.username}#${this.data.discriminator}`;
  }

  get toggles() {
      return this.data.toggles
  }

  get username() {
      return this.data.username
  }
}
