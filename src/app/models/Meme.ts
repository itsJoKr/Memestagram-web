import {User} from "./MemeUser";
export class Meme {
  $key: string;
  title: string;
  likes: number;
  photoUrl: string;
  user: User;
}
