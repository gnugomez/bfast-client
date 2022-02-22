import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { PortalService } from 'src/app/shared/services/portal.service';

@Directive({
  selector: 'ng-template[portal]',
})
export class PortalDirective implements OnInit, OnDestroy {
  constructor(
    private portalService: PortalService,
    private template: TemplateRef<any>
  ) {}

  @Input('portal') target?: string;

  ngOnInit(): void {
    // Teleports the template to the new target portal
    this.target && this.portalService.add(this.target, this.template);
  }

  ngOnDestroy(): void {
    // Clears the portal on destroy whenever the target is defined
    this.target && this.portalService.remove(this.target, this.template);
  }
}
