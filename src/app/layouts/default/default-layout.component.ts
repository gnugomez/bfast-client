import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'layout-default',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {

  public constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.sidebarIsOpen = false;
      }
    });
  }

  public sidebarIsOpen = false;

  ngOnInit(): void { }

  public openSidebar(): void {
    this.sidebarIsOpen = true;
  }

  public closeSidebar(): void {
    this.sidebarIsOpen = false;
  }
}
