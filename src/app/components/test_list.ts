/**
 * Created by JoKr on 10/27/2016.
 */
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
@Component({
    selector: 'list',
    template: `
    <div class="card" *ngFor="let item of list">
        <h2>Item no#{{item}}</h2>
    </div>`
})
export class List {
    list: number[];


    constructor(private route: ActivatedRoute) {
        this.list = [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10];
        console.log(route.snapshot.params['id']);
    }



}
