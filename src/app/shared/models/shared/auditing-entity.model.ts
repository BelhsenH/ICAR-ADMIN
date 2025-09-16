export interface AuditingEntity {
  createdBy: string;
  createdDate: number;
  lastModifiedBy?: string;
  lastModifiedDate?: number;
  deleted: boolean;
  deletedBy?: string;
  deletedDate?: number;
}
