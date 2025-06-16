import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IDataAdapter } from '../types';
import { IQuestion, ITopic } from '../../models';

@Injectable()
export class RestDataAdapter implements IDataAdapter<ITopic, IQuestion> {
  private api = '/api/v1';

  constructor(private http: HttpClient) {}

  getTopics(): Observable<ITopic[]> {
    return this.http.get<ITopic[]>(`${this.api}/topics`);
  }

  saveTopic(topic: ITopic): Observable<void> {
    return this.http.post<void>(`${this.api}/topics`, topic);
  }

  saveQuestion(topicId: string, question: IQuestion): Observable<void> {
    return this.http.post<void>(`${this.api}/topics/${topicId}/questions`, question);
  }

  saveCurrentValue(topicId: string, questionId: string, currentValue: number): Observable<void> {
    return this.http.patch<void>(
      `${this.api}/topics/${topicId}/questions/${questionId}`,
      { currentValue }
    );
  }
}
