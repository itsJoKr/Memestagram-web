export class ThisUser {
  $key: string;
  username: string;
  type: LoginType;


  constructor(uid, name, type) {
    this.$key = uid;
    this.username = name;
    this.type = type;
  }

}

export enum LoginType {
  Anon = 0,
  Google = 1
}
