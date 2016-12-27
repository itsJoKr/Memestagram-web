export class ThisUser {
  $key: string;
  name: string;
  type: LoginType;

  constructor(uid, name, type) {
    this.$key = uid;
    this.name = name;
    this.type = type;
  }

}

export enum LoginType {
  Anon = 0,
  Google = 1
}
