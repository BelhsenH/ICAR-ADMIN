import {AuditingEntity} from "../shared/auditing-entity.model";

export enum TYPE_PIECE_USER {
  BOUTIQUE = 'boutique',
  SOCIETE = 'societe'
}

// Interface pour les géolocalisations si ce n'est pas encore défini
export interface GeoLocation {
  lat: number;
  lng: number;
}

export interface IPieceUsers extends AuditingEntity {
  _id: string;
  type: TYPE_PIECE_USER | string;
  nomBoutiqueSociete: string;
  nomGerant: string;
  adresse: string;
  geolocation: GeoLocation;
  zoneGeoCouverte: string;
  phoneNumber: string;
  email: string;
  typesPieces: Array<'neuf' | 'occasion'>;
  marqueSpecialise?: string[];  // singulier
  modeleSpecialise?: string[];
  raisonSociale?: string | File;        // string ou fichier
  verified?: boolean;
  "createdAt": Date
  "updatedAt": Date
}
