import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FileService} from "../../../service/file.service";
import {Subject} from "rxjs";
import {BankAccount} from "../../../models/user/external-account.model";
import {
  VerificationFile,
  VerificationFileError,
  VerificationFileType,
  VerificationStatus
} from "../../../models/user/verification.model";
import {InputSwitchOnChangeEvent} from "primeng/inputswitch";
import {ExternalAccountService} from "../../../service/external-account.service";
import {
  BankAccountVerificationReview
} from "../../../models/api-request/user/external-account/bank-account-verification-review.model";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-user-bank-account-list',
  templateUrl: './user-bank-account-list.component.html',
  styleUrls: ['./user-bank-account-list.component.scss']
})
export class UserBankAccountListComponent implements OnInit, OnDestroy {

  protected readonly VerificationFileType = VerificationFileType;
  protected readonly VerificationStatus = VerificationStatus;

  @Input() bankAccounts: BankAccount[] = [];

  verificationFileErrors = Object.keys(VerificationFileError);

  // To review
  reviewDialog = false;
  bankAccountToReview: BankAccount | undefined;
  status: VerificationStatus | undefined;
  file: VerificationFile | undefined;
  verificationError: VerificationFileError | undefined;

  availableStatus: VerificationStatus[] = [VerificationStatus.UNVERIFIED, VerificationStatus.VERIFIED];

  pdfPreviewDialog: boolean = false;
  selectedPdfUrl: string | undefined;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    protected fileService: FileService,
    private externalAccountService: ExternalAccountService,
  ) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openReviewDialog(bankAccount: BankAccount) {
    if (bankAccount.verification.status !== VerificationStatus.PENDING)
      return;
    this.bankAccountToReview = bankAccount;
    this.file = bankAccount.verification.verificationFile ? {...bankAccount.verification.verificationFile} : undefined;
    this.reviewDialog = true;
  }

  closeReviewDialog() {
    this.bankAccountToReview = undefined;
    this.file = undefined;
    this.status = undefined;
    this.verificationError = undefined;
    this.reviewDialog = false;
  }

  openPdfDialog(fileContent: string) {
    this.selectedPdfUrl = this.fileService.getUserFileUrl(fileContent);
    this.pdfPreviewDialog = true;
  }

  closePdfDialog() {
    this.selectedPdfUrl = undefined;
    this.pdfPreviewDialog = false;
  }

  handleValidChange(event: InputSwitchOnChangeEvent) {
    if (!event.checked) this.verificationError = undefined;
  }

  updateReview() {
    if (!this.bankAccountToReview || !this.status) return;
    if (this.file && !this.file.valid && !this.verificationError) return;

    const request: BankAccountVerificationReview = {
      userId: this.bankAccountToReview.userId,
      valid: (this.status === VerificationStatus.VERIFIED),
      reviewedVerificationFile: this.file ? {
        id: this.file.id,
        valid: this.file.valid,
        error: this.verificationError,
      } : undefined
    };

    this.externalAccountService.setBankAccountVerificationReview(this.bankAccountToReview.id, request).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        const updatedBankAccount: BankAccount = response.body!;
        const index = this.bankAccounts.findIndex(item => updatedBankAccount.id === item.id);
        if (index > -1) this.bankAccounts[index] = updatedBankAccount;
        this.closeReviewDialog();
      },
      error: error => {
        console.error(error);
      }
    });

  }

}
