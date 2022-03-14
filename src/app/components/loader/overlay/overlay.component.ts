import { Component, OnInit } from '@angular/core';
import {
  Router,
  Event as RouterEvent,
  GuardsCheckStart,
  GuardsCheckEnd,
} from '@angular/router';

@Component({
  selector: 'app-loader-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
})
export class LoaderOverlayComponent implements OnInit {
  public showOverlay = true;

  constructor(private router: Router) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  ngOnInit(): void {}

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof GuardsCheckStart) {
      this.showOverlay = true;
    }
    if (event instanceof GuardsCheckEnd) {
      this.showOverlay = false;
    }
  }
}
