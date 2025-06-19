export interface ExamModel {
  idExam?: number;
  examCode: string;
  examName: string;
  active?: boolean;
  creationDate?: string;
  updateDate?: string;
  idUserCreate?: number;
  idUserUpdate?: number;
}
