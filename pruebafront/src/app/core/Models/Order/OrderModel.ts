export interface OrderModel {
  idOrder?: number;
  orderNumber?: string; 
  dateCare: string; 
  idPatient: number;
  idUserCreate?: number;
  idUserUpdate?: number;
  idStatus?: number;
  active?: boolean;
  creationDate?: string;
  updateDate?: string;
  exams: number[];
}

export interface SaveOrderModel {
  dateCare: string;      
  idPatient: number;     
  exams: number[];   
}
