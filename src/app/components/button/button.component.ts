import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() type = 'primary';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() size = 'md';
  @Input() link = '';
  @Input() target = '_self';
  @Input() routerLink = this.link ? [this.link] : null;
  @Input() classes = '';

  constructor() {}

  ngOnInit(): void {}
}
