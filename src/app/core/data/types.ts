import { Observable } from 'rxjs';

export interface IDataAdapter<TTopic, TQuestion> {
  getTopics(): Observable<TTopic[]>;

  saveTopic(topic: TTopic): Observable<void>;

  saveQuestion(topicId: string, question: TQuestion): Observable<void>;

  saveCurrentValue(
    topicId: string,
    questionId: string,
    currentValue: number
  ): Observable<void>;
}
