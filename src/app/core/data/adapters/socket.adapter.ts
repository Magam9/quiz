import { Injectable } from '@angular/core';
import { Observable, fromEvent, of } from 'rxjs';
import { io, Socket } from 'socket.io-client';

import { IQuestion, ITopic } from '../../models';
import { IDataAdapter } from '../types';


@Injectable()
export class SocketDataAdapter implements IDataAdapter<ITopic, IQuestion> {
  private socket: Socket;

  constructor() {
    this.socket = io({
      transports: ['websocket'],
    });
  }

  getTopics(): Observable<ITopic[]> {
    this.socket.emit('topics:list');
    return fromEvent<ITopic[]>(this.socket, 'topics:list:resp');
  }

  saveTopic(topic: ITopic): Observable<void> {
    this.socket.emit('topics:save', topic);
    return of(void 0);
  }

  deleteTopic(topicId: string): Observable<void> {
    this.socket.emit('topics:delete', { topicId });
    return of(void 0);
  }

  saveQuestion(topicId: string, question: IQuestion): Observable<void> {
    this.socket.emit('questions:save', {
      topicId,
      question,
    });
    return of(void 0);
  }

  saveCurrentValue(topicId: string, questionId: string, currentValue: number): Observable<void> {
    this.socket.emit('questions:value', {
      topicId,
      questionId,
      currentValue,
    });
    return of(void 0);
  }

  cleanAll(): Observable<void> {
    this.socket.emit('topics:delete-all');
    return of(void 0);
  }
}
