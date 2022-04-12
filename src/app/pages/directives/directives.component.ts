import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-directives',
  templateUrl: './directives.component.html',
  styleUrls: ['./directives.component.scss']
})
export class DirectivesComponent implements OnInit {

  textInput: string;

  constructor(public navBarService: NavbarService) {
    navBarService.show();
    this.textInput = '';
  }

  ngOnInit(): void {
  }

}
