import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { IDataAdapter } from '../types';

import { TopicServiceClient } from '../../grpc/generated/quiz.pbsc';
import {
  ListTopicsRequest,
  SaveTopicRequest,
  SaveQuestionRequest,
  SaveCurrentValueRequest,
  Topic,
  Question,
  Grade,
  EmptyRequest,
} from '../../grpc/generated/quiz.pb';

import { ITopic, IQuestion, IGrade } from '../../models';

@Injectable()
export class GrpcDataAdapter implements IDataAdapter<ITopic, IQuestion> {
  constructor(private readonly client: TopicServiceClient) {
    this.client
  }

  getTopics(): Observable<ITopic[]> {
    return this.client
      .listTopics(new ListTopicsRequest())
      .pipe(map(res => res.topics?.map(this.fromProtoTopic) ?? []));
  }

  saveTopic(topic: ITopic): Observable<void> {
    const proto = this.toProtoTopic(topic);
    return this.client
      .saveTopic(new SaveTopicRequest({ topic: proto }))
      .pipe(map(() => void 0));
  }

  saveQuestion(topicId: string, question: IQuestion): Observable<void> {
    const proto = this.toProtoQuestion(question);
    return this.client
      .saveQuestion(new SaveQuestionRequest({ topicId, question: proto }))
      .pipe(map(() => void 0));
  }

  saveCurrentValue(
    topicId: string,
    questionId: string,
    currentValue: number
  ): Observable<void> {
    return this.client
      .saveCurrentValue(
        new SaveCurrentValueRequest({ topicId, questionId, currentValue })
      )
      .pipe(map(() => void 0));
  }

  cleanAll(): Observable<void> {
    return this.client.cleanAll({} as EmptyRequest).pipe(map(() => void 0));
  }

  private toProtoTopic = (topic: ITopic): Topic =>
    new Topic({
      id: topic.id,
      name: topic.name,
      grades: topic.grades.map(this.toProtoGrade),
      questions: topic.questions.map(this.toProtoQuestion),
    });

  private toProtoGrade = (g: IGrade): Grade =>
    new Grade({
      gradeName: g.gradeName,
      value: g.value,
      position: g.position,
    });

  private toProtoQuestion = (question: IQuestion): Question =>
    new Question({
      id: question.id,
      question: question.question,
      answer: question.answer,
      currentValue: question.currentValue ?? 0,
      grade: question.grade ?? 0,
      subQuestions: question.subQuestions?.map(this.toProtoQuestion) ?? [],
    });

  private fromProtoTopic = (topic: Topic): ITopic => ({
    id: topic.id,
    name: topic.name,
    grades: topic.grades?.map(this.fromProtoGrade) ?? [],
    questions: topic.questions?.map(this.fromProtoQuestion) ?? [],
  });

  private fromProtoGrade = (g: Grade): IGrade => ({
    gradeName: g.gradeName,
    value: g.value,
    position: g.position,
  });

  private fromProtoQuestion = (question: Question): IQuestion => ({
    id: question.id,
    question: question.question,
    answer: question.answer,
    currentValue: question.currentValue,
    grade: question.grade,
    subQuestions: question.subQuestions?.map(this.fromProtoQuestion) ?? [],
  });
}
