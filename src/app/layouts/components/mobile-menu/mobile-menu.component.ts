import { Component, OnInit } from '@angular/core';
import items from './menuItems';

@Component({
  selector: 'layout-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
})
export class MobileMenuComponent implements OnInit {
  menuItems = items;

  constructor() {}

  ngOnInit(): void {}
}
