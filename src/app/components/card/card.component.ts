import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() type: 'default' | 'open' | 'transparent' = 'default';
  @Input() classes = '';
  @Input() border: 'slim' | 'medium' | 'thick' = 'medium';

  constructor() { }

  ngOnInit(): void { }
}
