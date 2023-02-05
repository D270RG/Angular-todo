import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'navbar',
	templateUrl: 'navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
	@Output() public onComponentAdditionRequested: EventEmitter<Event> =
		new EventEmitter();
}
