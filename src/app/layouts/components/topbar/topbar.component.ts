import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'layout-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  @Output() openSidebar = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public toggle(): void {
    this.openSidebar.emit();
  }
}
