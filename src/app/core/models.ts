import { Topic } from "./grpc/generated/quiz.pb";

export interface IGrade {
  gradeName: string;
  value: number;
  position: number;
}

export interface IQuestion {
  id: string;
  question: string;
  answer: string;
  grade?: number;
  currentValue: number | null;
  subQuestions: IQuestion[];
}

export interface ITopic {
  id: string;
  name: string;
  questions: IQuestion[];
  grades: IGrade[];
}

export interface IQuiz {
  topics: ITopic[];
}
