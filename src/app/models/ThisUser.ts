export class ThisUser {
  constructor (private name: string, private uid: string, private type: LoginType) {

  }

  public getName() {
    return this.name;
  }

  public getUid() {
    return this.uid;
  }

  public getLoginType() {
    return this.type;
  }
}

export enum LoginType {
  Anon = 0,
  Google = 1
}
