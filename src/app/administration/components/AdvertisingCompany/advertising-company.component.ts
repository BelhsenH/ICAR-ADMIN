import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Table} from "primeng/table";
import {Campaign} from "../../../shared/models/compains/compaigns.model";
import {AllUser} from "../../../shared/models/compains/all-user.model";
import {CampaignService} from "../../../shared/service/compaigns/compaigns.service";
import {AllUserResponse} from "../../../shared/service/compaigns/all-users-response";
import {AllUserService} from "../../../shared/service/compaigns/all-users.service";
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-advertising-company',
  templateUrl: './advertising-company.component.html',
  styleUrls: ['./advertising-company.component.scss'],
  providers: [MessageService]
})
export class AdvertisingCompanyComponent implements OnInit {
  campaigns: Campaign[] = [];
  campaignDialog = false;
  form: FormGroup;
  users!: AllUserResponse;
  cols: any[] = [];
  editingCampaign: Campaign | null = null; // 🔹 stocke la campagne en modification

  constructor(
    private campaignService: CampaignService,
    private fb: FormBuilder,
    private userService: AllUserService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      type: ['email', Validators.required],
      title: ['', Validators.required],
      content: ['', Validators.required],
      userType: ['icar'],
      recipients: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadCampaigns();
    this.userService.getUsers().subscribe(res => {
      this.users = res;
      this.filterUsers();
    });

    this.form.get('userType')?.valueChanges.subscribe(() => this.filterUsers());
    this.form.get('type')?.valueChanges.subscribe(() => this.filterUsers());
  }

  get recipients() {
    return this.form.get('recipients') as FormArray;
  }

  private filterUsers() {
    const type = this.form.get('type')?.value;      // email ou sms
    const userType = this.form.get('userType')?.value;
    let selected: AllUser[] = [];

    switch (userType) {
      case 'icar':
        selected = this.users.icars || [];
        break;
      case 'ipiece':
        selected = this.users.ipieces || [];
        break;
      case 'irepair':
        selected = this.users.irepairs || [];
        break;
    }

    this.recipients.clear();

    if (type === 'sms') {
      // on récupère les numéros de téléphone
      selected.forEach(u => {
        if (u.phoneNumber) this.recipients.push(this.fb.control(u.phoneNumber));
      });
    } else {
      // on récupère les emails
      selected.forEach(u => {
        if (u.email) this.recipients.push(this.fb.control(u.email));
      });
    }
  }


  loadCampaigns() {
    this.campaignService.getCampaigns().subscribe({
      next: (res) => this.campaigns = res,
      error: (err) => console.error(err)
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  openNew() {
    this.form.reset({type: 'email', userType: 'icar'});
    this.recipients.clear();
    this.filterUsers();
    this.campaignDialog = true;
    this.editingCampaign = null;
  }

  editCampaign(campaign: Campaign) {
    this.form.patchValue({
      type: campaign.type,
      title: campaign.title,
      content: campaign.content
    });

    this.recipients.clear();
    campaign.recipients.forEach(r => this.recipients.push(this.fb.control(r)));

    this.editingCampaign = campaign; // 🔹 mode édition
    this.campaignDialog = true;
  }

  hideDialog() {
    this.campaignDialog = false;
    this.editingCampaign = null;
  }

  submit() {
    if (this.form.invalid) return;

    const campaign: Campaign = {
      ...this.form.value,
      recipients: this.recipients.value // ⚡ important !
    };

    if (this.editingCampaign) {
      this.campaignService.updateCampaign(this.editingCampaign._id!, campaign).subscribe({
        next: (res) => {
          const index = this.campaigns.findIndex(c => c._id === this.editingCampaign!._id);
          this.campaigns[index] = res;
          this.campaignDialog = false;
          this.editingCampaign = null;
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'La campagne a été modifiée avec succès !'
          });
        },
        error: (err) => {
          console.error(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Impossible de modifier la campagne.'
          });
        }
      });
    } else {
      this.campaignService.createCampaign(campaign).subscribe({
        next: (res) => {
          this.campaigns.push(res);
          this.campaignDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'La campagne a été créée avec succès !'
          });
        },
        error: (err) => {
          console.error(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Impossible de créer la campagne.'
          });
        }
      });
    }
  }


  sendCampaign(c: Campaign) {
    const type = this.campaignDialog ? this.form.get('type')?.value : c.type;
    const recipients = this.campaignDialog ? this.recipients.value : c.recipients;

    if (!recipients || recipients.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Avertissement',
        detail: 'Aucun destinataire sélectionné !'
      });
      return;
    }

    const observable = type === 'email' ?
      this.campaignService.sendEmailCampaign(c._id!) :
      this.campaignService.sendSMSCampaign(c._id!);

    observable.subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: `La campagne ${type.toUpperCase()} a été envoyée avec succès !`
        });
        this.loadCampaigns();
      },
      error: (err) => {
        console.error(`Erreur envoi ${type} =>`, err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: `Impossible d'envoyer la campagne ${type.toUpperCase()}.`
        });
      }
    });
  }


  deleteCampaign(c: Campaign) {
    this.campaignService.deleteCampaign(c._id!).subscribe({
      next: () => {
        this.campaigns = this.campaigns.filter(x => x._id !== c._id);
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'La campagne a été supprimée avec succès !'
        });
      },
      error: (err) => {
        console.error(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de supprimer la campagne.'
        });
      }
    });

  }
}

