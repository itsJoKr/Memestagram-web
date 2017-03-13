import {Component, Input} from "@angular/core";
import {Comment} from "../models/Comment";


@Component({
  selector: 'comment-card',
  styleUrls: ['../../assets/css/meme.css'],
  template: `
  <div class="comment">{{comment.content}}</div>
  <div class="poster">{{comment.poster}}</div>
  `
})
export class CommentCard {
  @Input() comment: Comment;

  constructor () { }

}
