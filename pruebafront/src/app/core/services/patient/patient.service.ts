import { Injectable } from '@angular/core';
import { BaseApiService } from '../base-api.service';
import { PatientModel } from '../../Models/Patient/PatientModel';

@Injectable({
  providedIn: 'root'
})
export class PatientService extends BaseApiService {

  listPatients() {
    return this.get<{ success: boolean; data: PatientModel[] }>('ListPatients');
  }

  createPatient(patient: PatientModel) {
    return this.post<{ success: boolean; data: number }>('CreatePatient', patient);
  }

  updatePatient(patient: PatientModel) {
    return this.put<{ success: boolean; data: boolean }>('UpdatePatient', patient);
  }
}