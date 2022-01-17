import { Component, OnInit } from '@angular/core';
import items from './workSpaces';

@Component({
  selector: 'app-work-spaces',
  templateUrl: './work-spaces.component.html',
  styleUrls: ['./work-spaces.component.scss'],
})
export class WorkSpacesComponent implements OnInit {
  workspaces = items;

  constructor() {}

  ngOnInit(): void {}
}
