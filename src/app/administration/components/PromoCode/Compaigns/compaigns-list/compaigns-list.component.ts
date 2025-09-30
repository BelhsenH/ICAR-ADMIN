import { Component, OnInit } from '@angular/core';
import {Campaign} from "../../../../../shared/models/compains/compaigns.model";
import {CampaignService} from "../../../../../shared/service/compaigns/compaigns.service";

@Component({
  selector: 'app-campaigns-list',
  templateUrl: './compaigns-list.component.html'
})
export class CampaignsListComponent implements OnInit {
  campaigns: Campaign[] = [];
  loading = false;

  constructor(private campaignService: CampaignService) {}

  ngOnInit(): void {
    this.loadCampaigns();
  }

  loadCampaigns() {
    this.loading = true;
    this.campaignService.getCampaigns().subscribe({
      next: (res) => {
        this.campaigns = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  sendCampaign(campaign: Campaign) {
    this.campaignService.sendCampaign(campaign._id!).subscribe({
      next: (res) => {
        console.log('Campagne envoyée', res);
        this.loadCampaigns();
      },
      error: (err) => console.error(err)
    });
  }

  deleteCampaign(campaign: Campaign) {
    this.campaignService.deleteCampaign(campaign._id!).subscribe({
      next: () => this.loadCampaigns(),
      error: (err) => console.error(err)
    });
  }
}
