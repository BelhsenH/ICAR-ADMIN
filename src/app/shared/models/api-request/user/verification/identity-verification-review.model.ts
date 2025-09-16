import {ReviewedVerificationDocument, ReviewedVerificationFile} from "./reviewed-verification-document.model";

export interface IdentityVerificationReview {
  personalPhoto: ReviewedVerificationFile;
  selfieWithIdImage: ReviewedVerificationFile;
  identityDocument: ReviewedVerificationDocument;
  proofOfAddressDocument: ReviewedVerificationDocument;
}
