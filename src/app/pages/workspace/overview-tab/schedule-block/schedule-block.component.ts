import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Workspace } from 'src/app/shared/domain/Workspace';

@Component({
  selector: 'workspace-schedule-block',
  templateUrl: './schedule-block.component.html',
  styleUrls: ['./schedule-block.component.scss']
})
export class ScheduleBlockComponent implements OnInit {
  @Input() workspace?: BehaviorSubject<Workspace | null | undefined>

  constructor() { }

  ngOnInit(): void {
  }

}

