import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  visible: boolean = false;
  navbarEvent = new EventEmitter();
  // For hiding navbar from the page
  hide() { this.visible = false; }

  // For showing navbar from the page
  show() { this.visible = true; }
}
