import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { IDataAdapter } from '../types';
import { IQuestion, ITopic } from '../../models';

export const STORAGE_KEY = 'quizbuilder_topics';

@Injectable()
export class LocalStorageDataAdapter implements IDataAdapter<ITopic, IQuestion> {

  getTopics(): Observable<ITopic[]> {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return of([]);
    try {
      const parsed = JSON.parse(raw) as ITopic[];
      return of(parsed);
    } catch {
      return throwError(() => new Error('Invalid localStorage format'));
    }
  }

  saveTopic(topic: ITopic): Observable<void> {
    const topics = this.readAll();
    const index = topics.findIndex(t => t.id === topic.id);

    if (index >= 0) {
      topics[index] = topic;
    } else {
      topics.push(topic);
    }

    this.writeAll(topics);
    return of(void 0);
  }

  deleteTopic(topicId: string): Observable<void> {
    const topics = this.readAll().filter(t => t.id !== topicId);
    this.writeAll(topics);
    return of(void 0);
  }

  saveQuestion(topicId: string, question: IQuestion): Observable<void> {
    const topics = this.readAll();
    const topic = topics.find(t => t.id === topicId);
    if (!topic) return throwError(() => new Error('Topic not found'));

    const update = (questions: IQuestion[]) => {
      const idx = questions.findIndex(q => q.id === question.id);
      if (idx >= 0) {
        questions[idx] = question;
      } else {
        questions.push(question);
      }
    };

    update(topic.questions);
    this.writeAll(topics);
    return of(void 0);
  }

  saveCurrentValue(topicId: string, questionId: string, currentValue: number): Observable<void> {
    const topics = this.readAll();
    const topic = topics.find(t => t.id === topicId);
    if (!topic) return throwError(() => new Error('Topic not found'));

    const updateCurrent = (qs: IQuestion[]): boolean => {
      for (const q of qs) {
        if (q.id === questionId) {
          q.currentValue = currentValue;
          return true;
        }
        if (q.subQuestions && updateCurrent(q.subQuestions)) return true;
      }
      return false;
    };

    if (!updateCurrent(topic.questions)) {
      return throwError(() => new Error('Question not found'));
    }

    this.writeAll(topics);
    return of(void 0);
  }

  cleanAll(): Observable<void> {
    localStorage.removeItem('quizbuilder_topics');
    return of(void 0);
  }

  private readAll(): ITopic[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    try {
      return raw ? (JSON.parse(raw) as ITopic[]) : [];
    } catch {
      return [];
    }
  }

  private writeAll(topics: ITopic[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(topics));
  }
}
