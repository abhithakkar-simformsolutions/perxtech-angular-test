import { Component } from '@angular/core';

// Service Import
import { NavbarService } from './services/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'perxtech-angular-test';

  constructor(public navBarService: NavbarService) {}
}
