import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'page-main',
    templateUrl: 'mainpage.component.html',
    styleUrls: ['mainpage.component.scss']
})

export class MainpageComponent implements OnInit {
    todo$: Observable<number>;

    constructor() { }

    ngOnInit() { }
}