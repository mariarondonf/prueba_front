export interface PatientModel {
  idPatient?: number;  
  idIdentificationType: number;
  identificationNumber: string;
  name: string;
  lastName: string;
  birthDate: string;
  active?: boolean;
  creationDate?: string;
  updateDate?: string;
  idUserCreate?: number;
  idUserUpdate?: number;
}
