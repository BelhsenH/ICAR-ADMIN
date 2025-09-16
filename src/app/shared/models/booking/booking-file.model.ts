export interface BookingFile {
  id: string;
  name: string;
  type: BookingFileType;
}

export enum BookingFileType {
  IMAGE = 'IMAGE',
  PDF = 'PDF'
}
