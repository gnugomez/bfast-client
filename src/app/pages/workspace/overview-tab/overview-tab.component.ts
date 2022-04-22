import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Workspace } from 'src/app/shared/domain/Workspace';

@Component({
  selector: 'app-overview-tab',
  templateUrl: './overview-tab.component.html',
  styleUrls: ['./overview-tab.component.scss']
})
export class OverviewTabComponent implements OnInit {
  public workspace?: BehaviorSubject<Workspace | null | undefined>

  constructor() { }

  ngOnInit(): void {
  }

}
