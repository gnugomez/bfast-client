import { Component, OnInit } from '@angular/core';
import items from './menuItems';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  menuItems = items;

  constructor() {}

  ngOnInit(): void {}
}
