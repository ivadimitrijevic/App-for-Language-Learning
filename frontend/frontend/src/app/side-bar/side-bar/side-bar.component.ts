import { Component } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    RouterLinkActive,
    NgClass
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  /**
   * Logged in user
   */
  public selectedPage = localStorage.getItem('selectedPage');
  /**
   * Logged in user
   */
  public currentUser = JSON.parse(localStorage.getItem('currentUser'));
  /**
   * Sidebar component constructor
   * @param { Router } router
   */
  constructor(
    private router: Router,
  ) {
    if (!this.selectedPage) {
      localStorage.setItem('selectedPage', '/home');
    }
  }

  /**
   * Method for navigating
   * @param { string } path
   */
  public navigate(path: string) {
    localStorage.setItem('selectedPage', path);
    this.selectedPage = path;
    this.router.navigate([path]);
  }

  /**
   * Method for logging out
   */
  public logout() {
    localStorage.removeItem('selectedPage');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
