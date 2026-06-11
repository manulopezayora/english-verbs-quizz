import type { Question } from './Question.interface';

export interface WrongAnswer {
  question: Question;
  selectedIndex: number;
}
