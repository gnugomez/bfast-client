import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoreService } from 'src/app/shared/core/core.service';

@Component({
  selector: 'layout-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() isOpen = false;
  @Output() closeSidebar = new EventEmitter();

  constructor(public coreService: CoreService) { }

  ngOnInit(): void { }

  public clickOutsideClose(event: MouseEvent): void {
    const closestOpenSidebarButton = (event.target as HTMLInputElement).closest(
      '.sidebar-toggler'
    );

    if (!closestOpenSidebarButton) {
      this.closeSidebar.emit();
    }
  }

  public close() {
    this.closeSidebar.emit();
  }
}
