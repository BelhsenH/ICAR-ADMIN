import {ReviewedVerificationFile} from "../verification/reviewed-verification-document.model";

export interface BankAccountVerificationReview {
  userId: string;
  valid: boolean;
  reviewedVerificationFile?: ReviewedVerificationFile;
}
