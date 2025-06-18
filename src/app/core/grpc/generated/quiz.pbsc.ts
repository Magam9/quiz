/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import { Inject, Injectable, Optional } from '@angular/core';
import {
  GrpcCallType,
  GrpcClient,
  GrpcClientFactory,
  GrpcEvent,
  GrpcMetadata
} from '@ngx-grpc/common';
import {
  GRPC_CLIENT_FACTORY,
  GrpcHandler,
  takeMessages,
  throwStatusErrors
} from '@ngx-grpc/core';
import { Observable } from 'rxjs';
import * as thisProto from './quiz.pb';
import { GRPC_TOPIC_SERVICE_CLIENT_SETTINGS } from './quiz.pbconf';
/**
 * Service client implementation for quiz.TopicService
 */
@Injectable({ providedIn: 'any' })
export class TopicServiceClient {
  private client: GrpcClient<any>;

  /**
   * Raw RPC implementation for each service client method.
   * The raw methods provide more control on the incoming data and events. E.g. they can be useful to read status `OK` metadata.
   * Attention: these methods do not throw errors when non-zero status codes are received.
   */
  $raw = {
    /**
     * Unary call: /quiz.TopicService/ListTopics
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.ListTopicsResponse>>
     */
    listTopics: (
      requestData: thisProto.ListTopicsRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.ListTopicsResponse>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/quiz.TopicService/ListTopics',
        requestData,
        requestMetadata,
        requestClass: thisProto.ListTopicsRequest,
        responseClass: thisProto.ListTopicsResponse
      });
    },
    /**
     * Unary call: /quiz.TopicService/SaveTopic
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.SaveTopicResponse>>
     */
    saveTopic: (
      requestData: thisProto.SaveTopicRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.SaveTopicResponse>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/quiz.TopicService/SaveTopic',
        requestData,
        requestMetadata,
        requestClass: thisProto.SaveTopicRequest,
        responseClass: thisProto.SaveTopicResponse
      });
    },
    /**
     * Unary call: /quiz.TopicService/SaveQuestion
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.SaveQuestionResponse>>
     */
    saveQuestion: (
      requestData: thisProto.SaveQuestionRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.SaveQuestionResponse>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/quiz.TopicService/SaveQuestion',
        requestData,
        requestMetadata,
        requestClass: thisProto.SaveQuestionRequest,
        responseClass: thisProto.SaveQuestionResponse
      });
    },
    /**
     * Unary call: /quiz.TopicService/SaveCurrentValue
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.SaveCurrentValueResponse>>
     */
    saveCurrentValue: (
      requestData: thisProto.SaveCurrentValueRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.SaveCurrentValueResponse>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/quiz.TopicService/SaveCurrentValue',
        requestData,
        requestMetadata,
        requestClass: thisProto.SaveCurrentValueRequest,
        responseClass: thisProto.SaveCurrentValueResponse
      });
    },
    /**
     * Unary call: /quiz.TopicService/cleanAll
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.EmptyResponse>>
     */
    cleanAll: (
      requestData: thisProto.EmptyRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.EmptyResponse>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/quiz.TopicService/cleanAll',
        requestData,
        requestMetadata,
        requestClass: thisProto.EmptyRequest,
        responseClass: thisProto.EmptyResponse
      });
    }
  };

  constructor(
    @Optional() @Inject(GRPC_TOPIC_SERVICE_CLIENT_SETTINGS) settings: any,
    @Inject(GRPC_CLIENT_FACTORY) clientFactory: GrpcClientFactory<any>,
    private handler: GrpcHandler
  ) {
    this.client = clientFactory.createClient('quiz.TopicService', settings);
  }

  /**
   * Unary call @/quiz.TopicService/ListTopics
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.ListTopicsResponse>
   */
  listTopics(
    requestData: thisProto.ListTopicsRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.ListTopicsResponse> {
    return this.$raw
      .listTopics(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary call @/quiz.TopicService/SaveTopic
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.SaveTopicResponse>
   */
  saveTopic(
    requestData: thisProto.SaveTopicRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.SaveTopicResponse> {
    return this.$raw
      .saveTopic(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary call @/quiz.TopicService/SaveQuestion
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.SaveQuestionResponse>
   */
  saveQuestion(
    requestData: thisProto.SaveQuestionRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.SaveQuestionResponse> {
    return this.$raw
      .saveQuestion(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary call @/quiz.TopicService/SaveCurrentValue
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.SaveCurrentValueResponse>
   */
  saveCurrentValue(
    requestData: thisProto.SaveCurrentValueRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.SaveCurrentValueResponse> {
    return this.$raw
      .saveCurrentValue(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary call @/quiz.TopicService/cleanAll
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.EmptyResponse>
   */
  cleanAll(
    requestData: thisProto.EmptyRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.EmptyResponse> {
    return this.$raw
      .cleanAll(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }
}
