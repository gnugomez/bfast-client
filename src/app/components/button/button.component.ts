import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'button.app-button, app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() variant = 'primary';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() size = 'md';
  @Input() link = '';
  @Input() target = '_self';
  @Input() classes = '';

  constructor() {}

  ngOnInit(): void {}
}
