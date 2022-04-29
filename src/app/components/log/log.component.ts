import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {
  public openScanner: boolean = false;
  public isLoading = false;
  public havePermissions = true;
  public allowedFormats = [BarcodeFormat.QR_CODE];


  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  public toggleScanner(to?: boolean): void {
    if (to === undefined) {
      this.openScanner = !this.openScanner;
    } else {
      this.openScanner = to;
    }
  }

  public log(event: any): void {
    console.log(event);
  }

  public setStarting(event: boolean): void {
    this.isLoading = event;
    this.havePermissions = true;
    this.cdr.detectChanges()
  }

  public setPermissions(event: boolean): void {
    this.havePermissions = event;
    this.cdr.detectChanges()
  }

  public scanSuccess(event: any): void {
    console.log(event);
    this.toggleScanner(false);
  }
}
