import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'button[app-button], app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() variant = 'primary';
  @Input() loading = false;
  @Input() disabled = false;
  @Input() size = 'md';
  @Input() link = '';
  @Input() target = '_self';
  @Input() classes = '';
  @Input() type = 'button';

  constructor() { }

  ngOnInit(): void { }
}
