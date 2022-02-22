import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface PortalInstance {
  [target: string]: TemplateRef<any>[];
}

@Injectable({
  providedIn: 'root',
})
export class PortalService extends BehaviorSubject<PortalInstance> {
  constructor() {
    super({});
  }

  public add(target: string, template: TemplateRef<any>): void {
    const instance = this.value;
    instance[target] = [...(instance[target] || []), template];
    this.next(instance);
  }

  public remove(target: string, template: TemplateRef<any>): void {
    const instance = this.value;
    instance[target] = instance[target].filter((t) => t !== template);
    this.next(instance);
  }

  public clearAll(): void {
    this.next({});
  }
}
