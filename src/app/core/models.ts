export interface IQuestion {
  id: string;
  question: string;
  answer: string;
  currentValue: number | null;
  subQuestions: IQuestion[];
}

export interface ITopic {
  id: string;
  name: string;
  questions: IQuestion[];
}

export interface IQuiz {
  topics: ITopic[];
}
