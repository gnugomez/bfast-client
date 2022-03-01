import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template:
    '<router-outlet></router-outlet><app-loader-overlay></app-loader-overlay>',
})
export class AppComponent {
  title = 'bfast-client';
}
