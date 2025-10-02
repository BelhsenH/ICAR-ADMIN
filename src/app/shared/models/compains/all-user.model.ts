export interface AllUser {
  email: string;
  phoneNumber?: string;   // nouveau champ
  name?: string;    // facultatif
  type: 'icar' | 'ipiece' | 'irepair';
}
