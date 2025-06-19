import { Injectable } from '@angular/core';
import { BaseApiService } from '../base-api.service';
import { ExamModel } from '../../Models/Exams/ExamsModel';

@Injectable({
  providedIn: 'root'
})
export class ExamsService extends BaseApiService {

  listExams() {
    return this.get<{ success: boolean; data: ExamModel[] }>('ListExams');
  }

  createExam(exam: ExamModel) {
    return this.post<{ success: boolean; data: number }>('CreateExam', exam);
  }

  updateExam(exam: ExamModel) {
    return this.put<{ success: boolean; data: boolean }>('UpdateExam', exam);
  }
}
