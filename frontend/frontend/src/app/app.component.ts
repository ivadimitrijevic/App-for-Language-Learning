import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';

import { Store } from '@ngrx/store';

import { SideBarComponent } from './side-bar/side-bar/side-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SideBarComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Learning Languages';
  showMenu: boolean = true;

  constructor(private router: Router, private store: Store) {
    this.router.events.subscribe(() => {
      this.showMenu = !['/login', '/register'].includes(this.router.url);
    });
  }
}
