import {Component, OnInit, OnDestroy} from '@angular/core';
import {MenuItem} from "primeng/api";
import {Table} from "primeng/table";
import {Subject} from "rxjs";
import {PromoCode} from "../../../shared/models/promo-code/promo-code.model";
import {PromoCodeService} from "../../../shared/service/promo-code/promo-code.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-icar-users',
  templateUrl: './promo-code.component.html',
  styleUrls: ['./promo-code.component.scss'],
  providers: [MessageService]
})
export class PromoCodeComponent implements OnInit, OnDestroy {
  promoCodes: Partial<PromoCode>[] = [];
  promoCode!: Partial<PromoCode>;
  promo: Partial<PromoCode> = {};
  selectedCodes?: Partial<PromoCode>[] = [];
  promoDialog: boolean = false;
  items!: MenuItem[];
  submitted: boolean = false;
  cols: any[] = [];
  showInactive: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();
  promoForm: FormGroup;

  constructor(
    private promoService: PromoCodeService, private fb: FormBuilder , private messageService: MessageService
) {
    this.promoForm = this.fb.group({
      code: ['', Validators.required],
      assignedTo: [''],
      minAmount: [0, Validators.min(0)],
      maxUses: [1, Validators.min(1)],
      startDate: [''],
      endDate: [''],
      active: [true]
    });
  }

  ngOnInit(): void {
    this.loadCodes();
  }

  onGlobalFilter(table: Table, event: Event) {
    console.log((event.target as HTMLInputElement).value);
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  loadCodes() {
    this.promoService.getAll().subscribe(codes => this.promoCodes = codes);
  }

  toggleActive(code: PromoCode) {
    this.promoService.toggleActive(code._id!).subscribe(updated => {
      code.active = updated.active;
    });
  }

  createCode() {
    if (this.promoForm.invalid) return;

    const formValue = this.promoForm.value;

    if (this.promo && this.promo._id) {
      // 🔄 Mise à jour
      this.promoService.update(this.promo._id, formValue).subscribe({
        next: updated => {
          const index = this.promoCodes.findIndex(c => c._id === updated._id);
          if (index !== -1) this.promoCodes[index] = updated;
          this.promoDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Le code promo a été modifié avec succès !'
          });
        },
        error: err => {
          console.error(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Impossible de modifier le code promo.'
          });
        }
      });
    } else {
      // 🆕 Création
      this.promoService.create(formValue).subscribe({
        next: newCode => {
          this.promoCodes.push(newCode);
          this.promoForm.reset({ active: true, minAmount: 0, maxUses: 1 });
          this.promoDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Le code promo a été créé avec succès !'
          });
        },
        error: err => {
          console.error(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Impossible de créer le code promo.'
          });
        }
      });
    }
  }
  deleteCode(code: PromoCode) {
    this.promoService.delete(code._id!).subscribe({
      next: () => {
        this.promoCodes = this.promoCodes.filter(c => c._id !== code._id);
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Le code promo a été supprimé avec succès !'
        });
      },
      error: err => {
        console.error(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de supprimer le code promo.'
        });
      }
    });
  }


  editCode(code: PromoCode) {
    this.promoForm.patchValue({
      code: code.code,
      assignedTo: code.assignedTo,
      startDate: this.formatDate(code.startDate),
      endDate: this.formatDate(code.endDate),
      active: code.active
    });

    this.promo = code; // garder la référence pour savoir si on fait update
    this.promoDialog = true;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openNew() {
    this.promoForm.reset({
      code: '',
      assignedTo: '',
      minAmount: 0,
      maxUses: 1,
      startDate: '',
      endDate: '',
      active: true
    });
    this.promoDialog = true;
  }

  hideDialog() {
    this.promoDialog = false;
  }
  private formatDate(date: any): string | null {
    if (!date) return null;
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // retourne '2025-09-26'
  }
}
