import { Component, OnInit } from '@angular/core';
import toggleAnimation from '../../animations/toggleAnimation';

@Component({
  selector: 'layout-notifications',
  templateUrl: './notifications.component.html',
  animations: [toggleAnimation],
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
