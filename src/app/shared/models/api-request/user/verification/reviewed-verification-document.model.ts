import {VerificationFileError} from "../../../user/verification.model";

export interface ReviewedVerificationDocument {
  front: ReviewedVerificationFile;
  back?: ReviewedVerificationFile | null;
}

export interface ReviewedVerificationFile {
  id: string;
  valid: boolean;
  error?: VerificationFileError;
}
