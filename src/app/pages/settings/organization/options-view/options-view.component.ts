import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Organization } from 'src/app/shared/domain/Organization';
import { OrganizationService } from 'src/app/shared/services/organization.service';

@Component({
  selector: 'app-options-view',
  templateUrl: './options-view.component.html',
  styleUrls: ['./options-view.component.scss']
})
export class OptionsViewComponent implements OnInit {
  public activeOrganization?: Organization;
  public privileged = false;
  public generalForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    website: new FormControl(''),
  });

  constructor(private organizationService: OrganizationService) {
    this.organizationService.getActiveOrganization().subscribe((organization) => {
      this.activeOrganization = organization;

      this.privileged = organization?.privileged ? true : false;

      this.generalForm.enable();

      this.generalForm.patchValue({
        name: organization?.name,
        website: organization?.website,
      })

      if (!this.privileged) {
        this.generalForm.disable();
      } else {
        this.generalForm.enable();
      }
    });
  }

  ngOnInit(): void {
  }

}
