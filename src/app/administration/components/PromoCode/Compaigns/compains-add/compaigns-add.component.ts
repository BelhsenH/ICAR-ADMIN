import { Component, OnInit } from '@angular/core';
import { CampaignService } from "../../../../../shared/service/compaigns/compaigns.service";
import { Campaign } from "../../../../../shared/models/compains/compaigns.model";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-campaigns-add',
  templateUrl: './compaigns-add.component.html'
})
export class CampaignsAddComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private campaignService: CampaignService) {
    this.form = this.fb.group({
      type: ['email', Validators.required],
      title: ['', Validators.required],
      content: ['', Validators.required],
      recipients: this.fb.array([this.fb.control('', Validators.required)])
    });
  }

  ngOnInit(): void {
    }

  get recipients() {
    return this.form.get('recipients') as FormArray;
  }

  addRecipient() {
    this.recipients.push(this.fb.control('', Validators.required));
  }

  removeRecipient(index: number) {
    this.recipients.removeAt(index);
  }

  submit() {
    if (this.form.invalid) return;
    const campaign: Campaign = this.form.value;
    this.campaignService.createCampaign(campaign).subscribe({
      next: (res) => {
        console.log('Campagne créée', res);
        this.form.reset({ type: 'email' });
        this.recipients.clear();
        this.addRecipient();
      },
      error: (err) => console.error(err)
    });
  }
}
