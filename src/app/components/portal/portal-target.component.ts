import { Attribute, Component, Input, TemplateRef } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { PortalService } from 'src/app/components/portal/portal.service';

@Component({
  selector: 'portal-target',
  templateUrl: './portal-target.component.html',
})
export class PortalTargetComponent {
  readonly templates$: Observable<TemplateRef<any>[]>;

  @Input() context: any;

  constructor(
    @Attribute('name') name: string,
    private portalService: PortalService
  ) {
    // Builds the template observable
    this.templates$ = this.portalService.pipe(
      // Filters only those instances targetting this very portal
      filter((instance) => !instance || name in instance),

      // Returns the template or null
      map((instance) => instance && instance[name])
    );
  }
}
