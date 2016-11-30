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
export class MemesList {
    @Input type: number;
    list: number[];


    constructor() {
        this.list = [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10];
    }

    private itemClick() {
        console.log("Type: " + this.type);
    }
}

export class MemeListType {
    public static DANK: number = 1;
    public static FRESH: number = 2;
    public static RANDOM: number = 3;
}
