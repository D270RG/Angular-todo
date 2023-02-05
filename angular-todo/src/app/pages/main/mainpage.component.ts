import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
	selector: 'page-main',
	templateUrl: 'mainpage.component.html',
})
export class MainpageComponent {
	public eventsSubject: Subject<void> = new Subject<void>();

	public emitEventToChild(): void {
		this.eventsSubject.next();
	}
}
