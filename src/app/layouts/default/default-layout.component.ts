import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'layout-default',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarIsOpen = false;

  ngOnInit(): void {}

  public openSidebar(): void {
    this.sidebarIsOpen = true;
  }

  public closeSidebar(): void {
    this.sidebarIsOpen = false;
  }
}
