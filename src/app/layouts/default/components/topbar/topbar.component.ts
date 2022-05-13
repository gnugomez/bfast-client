import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CoreService } from 'src/app/shared/core/core.service';

@Component({
  selector: 'layout-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  @Output() openSidebar = new EventEmitter();

  constructor(public coreService: CoreService) { }

  ngOnInit(): void { }

  public toggle(): void {
    this.openSidebar.emit();
  }
}
