export interface Question {
  id: number;
  infinitive: string;
  translation: string;
  type: string;
  form: 'past-simple' | 'past-participle';
  difficulty: string;
  options: string[];
  correctAnswer: number;
}
