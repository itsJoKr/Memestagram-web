/**
 * Created by jokr on 04.11.16..
 */
import { Component, Input } from '@angular/core';
@Component({
    selector: 'list',
    template: `
    <div class="card" *ngFor="let item of list">
        <h2 (click)="">Item no#{{item}}</h2>
    </div>`
})
export class FreshMemes {
    @Input type: number;
    list: number[];


    constructor() {
        this.list = [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10];
    }

    private itemClick() {
        console.log("Type: " + this.type);
    }
}/**
 * Created by jokr on 04.11.16..
 */
