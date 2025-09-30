export interface Campaign {
  _id?: string;
  type: 'email' | 'sms';
  title: string;
  content: string;
  recipients: string[];
  status?: 'draft' | 'sent';
  results?: {
    success: number;
    failed: number;
    opened?: number;
    clicked?: number;
  };
  createdAt?: string;
  updatedAt?: string;
}
