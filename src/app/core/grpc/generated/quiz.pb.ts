/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import {
  GrpcMessage,
  RecursivePartial,
  ToProtobufJSONOptions
} from '@ngx-grpc/common';
import { BinaryReader, BinaryWriter, ByteSource } from 'google-protobuf';

/**
 * Message implementation for quiz.Grade
 */
export class Grade implements GrpcMessage {
  static id = 'quiz.Grade';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new Grade();
    Grade.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: Grade) {
    _instance.gradeName = _instance.gradeName || '';
    _instance.value = _instance.value || 0;
    _instance.position = _instance.position || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(_instance: Grade, _reader: BinaryReader) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.gradeName = _reader.readString();
          break;
        case 2:
          _instance.value = _reader.readInt32();
          break;
        case 3:
          _instance.position = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    Grade.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: Grade, _writer: BinaryWriter) {
    if (_instance.gradeName) {
      _writer.writeString(1, _instance.gradeName);
    }
    if (_instance.value) {
      _writer.writeInt32(2, _instance.value);
    }
    if (_instance.position) {
      _writer.writeInt32(3, _instance.position);
    }
  }

  private _gradeName: string;
  private _value: number;
  private _position: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of Grade to deeply clone from
   */
  constructor(_value?: RecursivePartial<Grade.AsObject>) {
    _value = _value || {};
    this.gradeName = _value.gradeName;
    this.value = _value.value;
    this.position = _value.position;
    Grade.refineValues(this);
  }
  get gradeName(): string {
    return this._gradeName;
  }
  set gradeName(value: string) {
    this._gradeName = value;
  }
  get value(): number {
    return this._value;
  }
  set value(value: number) {
    this._value = value;
  }
  get position(): number {
    return this._position;
  }
  set position(value: number) {
    this._position = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    Grade.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): Grade.AsObject {
    return {
      gradeName: this.gradeName,
      value: this.value,
      position: this.position
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): Grade.AsProtobufJSON {
    return {
      gradeName: this.gradeName,
      value: this.value,
      position: this.position
    };
  }
}
export module Grade {
  /**
   * Standard JavaScript object representation for Grade
   */
  export interface AsObject {
    gradeName: string;
    value: number;
    position: number;
  }

  /**
   * Protobuf JSON representation for Grade
   */
  export interface AsProtobufJSON {
    gradeName: string;
    value: number;
    position: number;
  }
}

/**
 * Message implementation for quiz.Question
 */
export class Question implements GrpcMessage {
  static id = 'quiz.Question';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new Question();
    Question.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: Question) {
    _instance.id = _instance.id || '';
    _instance.question = _instance.question || '';
    _instance.answer = _instance.answer || '';
    _instance.currentValue = _instance.currentValue || 0;
    _instance.grade = _instance.grade || 0;
    _instance.subQuestions = _instance.subQuestions || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: Question,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readString();
          break;
        case 2:
          _instance.question = _reader.readString();
          break;
        case 3:
          _instance.answer = _reader.readString();
          break;
        case 4:
          _instance.currentValue = _reader.readInt32();
          break;
        case 5:
          _instance.grade = _reader.readInt32();
          break;
        case 6:
          const messageInitializer6 = new Question();
          _reader.readMessage(
            messageInitializer6,
            Question.deserializeBinaryFromReader
          );
          (_instance.subQuestions = _instance.subQuestions || []).push(
            messageInitializer6
          );
          break;
        default:
          _reader.skipField();
      }
    }

    Question.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: Question, _writer: BinaryWriter) {
    if (_instance.id) {
      _writer.writeString(1, _instance.id);
    }
    if (_instance.question) {
      _writer.writeString(2, _instance.question);
    }
    if (_instance.answer) {
      _writer.writeString(3, _instance.answer);
    }
    if (_instance.currentValue) {
      _writer.writeInt32(4, _instance.currentValue);
    }
    if (_instance.grade) {
      _writer.writeInt32(5, _instance.grade);
    }
    if (_instance.subQuestions && _instance.subQuestions.length) {
      _writer.writeRepeatedMessage(
        6,
        _instance.subQuestions as any,
        Question.serializeBinaryToWriter
      );
    }
  }

  private _id: string;
  private _question: string;
  private _answer: string;
  private _currentValue: number;
  private _grade: number;
  private _subQuestions?: Question[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of Question to deeply clone from
   */
  constructor(_value?: RecursivePartial<Question.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    this.question = _value.question;
    this.answer = _value.answer;
    this.currentValue = _value.currentValue;
    this.grade = _value.grade;
    this.subQuestions = (_value.subQuestions || []).map(m => new Question(m));
    Question.refineValues(this);
  }
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  get question(): string {
    return this._question;
  }
  set question(value: string) {
    this._question = value;
  }
  get answer(): string {
    return this._answer;
  }
  set answer(value: string) {
    this._answer = value;
  }
  get currentValue(): number {
    return this._currentValue;
  }
  set currentValue(value: number) {
    this._currentValue = value;
  }
  get grade(): number {
    return this._grade;
  }
  set grade(value: number) {
    this._grade = value;
  }
  get subQuestions(): Question[] | undefined {
    return this._subQuestions;
  }
  set subQuestions(value: Question[] | undefined) {
    this._subQuestions = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    Question.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): Question.AsObject {
    return {
      id: this.id,
      question: this.question,
      answer: this.answer,
      currentValue: this.currentValue,
      grade: this.grade,
      subQuestions: (this.subQuestions || []).map(m => m.toObject())
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): Question.AsProtobufJSON {
    return {
      id: this.id,
      question: this.question,
      answer: this.answer,
      currentValue: this.currentValue,
      grade: this.grade,
      subQuestions: (this.subQuestions || []).map(m =>
        m.toProtobufJSON(options)
      )
    };
  }
}
export module Question {
  /**
   * Standard JavaScript object representation for Question
   */
  export interface AsObject {
    id: string;
    question: string;
    answer: string;
    currentValue: number;
    grade: number;
    subQuestions?: Question.AsObject[];
  }

  /**
   * Protobuf JSON representation for Question
   */
  export interface AsProtobufJSON {
    id: string;
    question: string;
    answer: string;
    currentValue: number;
    grade: number;
    subQuestions: Question.AsProtobufJSON[] | null;
  }
}

/**
 * Message implementation for quiz.Topic
 */
export class Topic implements GrpcMessage {
  static id = 'quiz.Topic';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new Topic();
    Topic.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: Topic) {
    _instance.id = _instance.id || '';
    _instance.name = _instance.name || '';
    _instance.grades = _instance.grades || [];
    _instance.questions = _instance.questions || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(_instance: Topic, _reader: BinaryReader) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readString();
          break;
        case 2:
          _instance.name = _reader.readString();
          break;
        case 3:
          const messageInitializer3 = new Grade();
          _reader.readMessage(
            messageInitializer3,
            Grade.deserializeBinaryFromReader
          );
          (_instance.grades = _instance.grades || []).push(messageInitializer3);
          break;
        case 4:
          const messageInitializer4 = new Question();
          _reader.readMessage(
            messageInitializer4,
            Question.deserializeBinaryFromReader
          );
          (_instance.questions = _instance.questions || []).push(
            messageInitializer4
          );
          break;
        default:
          _reader.skipField();
      }
    }

    Topic.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: Topic, _writer: BinaryWriter) {
    if (_instance.id) {
      _writer.writeString(1, _instance.id);
    }
    if (_instance.name) {
      _writer.writeString(2, _instance.name);
    }
    if (_instance.grades && _instance.grades.length) {
      _writer.writeRepeatedMessage(
        3,
        _instance.grades as any,
        Grade.serializeBinaryToWriter
      );
    }
    if (_instance.questions && _instance.questions.length) {
      _writer.writeRepeatedMessage(
        4,
        _instance.questions as any,
        Question.serializeBinaryToWriter
      );
    }
  }

  private _id: string;
  private _name: string;
  private _grades?: Grade[];
  private _questions?: Question[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of Topic to deeply clone from
   */
  constructor(_value?: RecursivePartial<Topic.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    this.name = _value.name;
    this.grades = (_value.grades || []).map(m => new Grade(m));
    this.questions = (_value.questions || []).map(m => new Question(m));
    Topic.refineValues(this);
  }
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get grades(): Grade[] | undefined {
    return this._grades;
  }
  set grades(value: Grade[] | undefined) {
    this._grades = value;
  }
  get questions(): Question[] | undefined {
    return this._questions;
  }
  set questions(value: Question[] | undefined) {
    this._questions = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    Topic.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): Topic.AsObject {
    return {
      id: this.id,
      name: this.name,
      grades: (this.grades || []).map(m => m.toObject()),
      questions: (this.questions || []).map(m => m.toObject())
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): Topic.AsProtobufJSON {
    return {
      id: this.id,
      name: this.name,
      grades: (this.grades || []).map(m => m.toProtobufJSON(options)),
      questions: (this.questions || []).map(m => m.toProtobufJSON(options))
    };
  }
}
export module Topic {
  /**
   * Standard JavaScript object representation for Topic
   */
  export interface AsObject {
    id: string;
    name: string;
    grades?: Grade.AsObject[];
    questions?: Question.AsObject[];
  }

  /**
   * Protobuf JSON representation for Topic
   */
  export interface AsProtobufJSON {
    id: string;
    name: string;
    grades: Grade.AsProtobufJSON[] | null;
    questions: Question.AsProtobufJSON[] | null;
  }
}

/**
 * Message implementation for quiz.ListTopicsRequest
 */
export class ListTopicsRequest implements GrpcMessage {
  static id = 'quiz.ListTopicsRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new ListTopicsRequest();
    ListTopicsRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: ListTopicsRequest) {}

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: ListTopicsRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        default:
          _reader.skipField();
      }
    }

    ListTopicsRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: ListTopicsRequest,
    _writer: BinaryWriter
  ) {}

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of ListTopicsRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<ListTopicsRequest.AsObject>) {
    _value = _value || {};
    ListTopicsRequest.refineValues(this);
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    ListTopicsRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): ListTopicsRequest.AsObject {
    return {};
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): ListTopicsRequest.AsProtobufJSON {
    return {};
  }
}
export module ListTopicsRequest {
  /**
   * Standard JavaScript object representation for ListTopicsRequest
   */
  export interface AsObject {}

  /**
   * Protobuf JSON representation for ListTopicsRequest
   */
  export interface AsProtobufJSON {}
}

/**
 * Message implementation for quiz.ListTopicsResponse
 */
export class ListTopicsResponse implements GrpcMessage {
  static id = 'quiz.ListTopicsResponse';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new ListTopicsResponse();
    ListTopicsResponse.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: ListTopicsResponse) {
    _instance.topics = _instance.topics || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: ListTopicsResponse,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new Topic();
          _reader.readMessage(
            messageInitializer1,
            Topic.deserializeBinaryFromReader
          );
          (_instance.topics = _instance.topics || []).push(messageInitializer1);
          break;
        default:
          _reader.skipField();
      }
    }

    ListTopicsResponse.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: ListTopicsResponse,
    _writer: BinaryWriter
  ) {
    if (_instance.topics && _instance.topics.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.topics as any,
        Topic.serializeBinaryToWriter
      );
    }
  }

  private _topics?: Topic[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of ListTopicsResponse to deeply clone from
   */
  constructor(_value?: RecursivePartial<ListTopicsResponse.AsObject>) {
    _value = _value || {};
    this.topics = (_value.topics || []).map(m => new Topic(m));
    ListTopicsResponse.refineValues(this);
  }
  get topics(): Topic[] | undefined {
    return this._topics;
  }
  set topics(value: Topic[] | undefined) {
    this._topics = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    ListTopicsResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): ListTopicsResponse.AsObject {
    return {
      topics: (this.topics || []).map(m => m.toObject())
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): ListTopicsResponse.AsProtobufJSON {
    return {
      topics: (this.topics || []).map(m => m.toProtobufJSON(options))
    };
  }
}
export module ListTopicsResponse {
  /**
   * Standard JavaScript object representation for ListTopicsResponse
   */
  export interface AsObject {
    topics?: Topic.AsObject[];
  }

  /**
   * Protobuf JSON representation for ListTopicsResponse
   */
  export interface AsProtobufJSON {
    topics: Topic.AsProtobufJSON[] | null;
  }
}

/**
 * Message implementation for quiz.SaveTopicRequest
 */
export class SaveTopicRequest implements GrpcMessage {
  static id = 'quiz.SaveTopicRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new SaveTopicRequest();
    SaveTopicRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: SaveTopicRequest) {
    _instance.topic = _instance.topic || undefined;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: SaveTopicRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.topic = new Topic();
          _reader.readMessage(
            _instance.topic,
            Topic.deserializeBinaryFromReader
          );
          break;
        default:
          _reader.skipField();
      }
    }

    SaveTopicRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: SaveTopicRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.topic) {
      _writer.writeMessage(
        1,
        _instance.topic as any,
        Topic.serializeBinaryToWriter
      );
    }
  }

  private _topic?: Topic;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SaveTopicRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<SaveTopicRequest.AsObject>) {
    _value = _value || {};
    this.topic = _value.topic ? new Topic(_value.topic) : undefined;
    SaveTopicRequest.refineValues(this);
  }
  get topic(): Topic | undefined {
    return this._topic;
  }
  set topic(value: Topic | undefined) {
    this._topic = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    SaveTopicRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): SaveTopicRequest.AsObject {
    return {
      topic: this.topic ? this.topic.toObject() : undefined
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): SaveTopicRequest.AsProtobufJSON {
    return {
      topic: this.topic ? this.topic.toProtobufJSON(options) : null
    };
  }
}
export module SaveTopicRequest {
  /**
   * Standard JavaScript object representation for SaveTopicRequest
   */
  export interface AsObject {
    topic?: Topic.AsObject;
  }

  /**
   * Protobuf JSON representation for SaveTopicRequest
   */
  export interface AsProtobufJSON {
    topic: Topic.AsProtobufJSON | null;
  }
}

/**
 * Message implementation for quiz.SaveTopicResponse
 */
export class SaveTopicResponse implements GrpcMessage {
  static id = 'quiz.SaveTopicResponse';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new SaveTopicResponse();
    SaveTopicResponse.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: SaveTopicResponse) {}

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: SaveTopicResponse,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        default:
          _reader.skipField();
      }
    }

    SaveTopicResponse.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: SaveTopicResponse,
    _writer: BinaryWriter
  ) {}

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SaveTopicResponse to deeply clone from
   */
  constructor(_value?: RecursivePartial<SaveTopicResponse.AsObject>) {
    _value = _value || {};
    SaveTopicResponse.refineValues(this);
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    SaveTopicResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): SaveTopicResponse.AsObject {
    return {};
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): SaveTopicResponse.AsProtobufJSON {
    return {};
  }
}
export module SaveTopicResponse {
  /**
   * Standard JavaScript object representation for SaveTopicResponse
   */
  export interface AsObject {}

  /**
   * Protobuf JSON representation for SaveTopicResponse
   */
  export interface AsProtobufJSON {}
}

/**
 * Message implementation for quiz.SaveQuestionRequest
 */
export class SaveQuestionRequest implements GrpcMessage {
  static id = 'quiz.SaveQuestionRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new SaveQuestionRequest();
    SaveQuestionRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: SaveQuestionRequest) {
    _instance.topicId = _instance.topicId || '';
    _instance.question = _instance.question || undefined;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: SaveQuestionRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.topicId = _reader.readString();
          break;
        case 2:
          _instance.question = new Question();
          _reader.readMessage(
            _instance.question,
            Question.deserializeBinaryFromReader
          );
          break;
        default:
          _reader.skipField();
      }
    }

    SaveQuestionRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: SaveQuestionRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.topicId) {
      _writer.writeString(1, _instance.topicId);
    }
    if (_instance.question) {
      _writer.writeMessage(
        2,
        _instance.question as any,
        Question.serializeBinaryToWriter
      );
    }
  }

  private _topicId: string;
  private _question?: Question;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SaveQuestionRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<SaveQuestionRequest.AsObject>) {
    _value = _value || {};
    this.topicId = _value.topicId;
    this.question = _value.question ? new Question(_value.question) : undefined;
    SaveQuestionRequest.refineValues(this);
  }
  get topicId(): string {
    return this._topicId;
  }
  set topicId(value: string) {
    this._topicId = value;
  }
  get question(): Question | undefined {
    return this._question;
  }
  set question(value: Question | undefined) {
    this._question = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    SaveQuestionRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): SaveQuestionRequest.AsObject {
    return {
      topicId: this.topicId,
      question: this.question ? this.question.toObject() : undefined
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): SaveQuestionRequest.AsProtobufJSON {
    return {
      topicId: this.topicId,
      question: this.question ? this.question.toProtobufJSON(options) : null
    };
  }
}
export module SaveQuestionRequest {
  /**
   * Standard JavaScript object representation for SaveQuestionRequest
   */
  export interface AsObject {
    topicId: string;
    question?: Question.AsObject;
  }

  /**
   * Protobuf JSON representation for SaveQuestionRequest
   */
  export interface AsProtobufJSON {
    topicId: string;
    question: Question.AsProtobufJSON | null;
  }
}

/**
 * Message implementation for quiz.SaveQuestionResponse
 */
export class SaveQuestionResponse implements GrpcMessage {
  static id = 'quiz.SaveQuestionResponse';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new SaveQuestionResponse();
    SaveQuestionResponse.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: SaveQuestionResponse) {}

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: SaveQuestionResponse,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        default:
          _reader.skipField();
      }
    }

    SaveQuestionResponse.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: SaveQuestionResponse,
    _writer: BinaryWriter
  ) {}

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SaveQuestionResponse to deeply clone from
   */
  constructor(_value?: RecursivePartial<SaveQuestionResponse.AsObject>) {
    _value = _value || {};
    SaveQuestionResponse.refineValues(this);
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    SaveQuestionResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): SaveQuestionResponse.AsObject {
    return {};
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): SaveQuestionResponse.AsProtobufJSON {
    return {};
  }
}
export module SaveQuestionResponse {
  /**
   * Standard JavaScript object representation for SaveQuestionResponse
   */
  export interface AsObject {}

  /**
   * Protobuf JSON representation for SaveQuestionResponse
   */
  export interface AsProtobufJSON {}
}

/**
 * Message implementation for quiz.SaveCurrentValueRequest
 */
export class SaveCurrentValueRequest implements GrpcMessage {
  static id = 'quiz.SaveCurrentValueRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new SaveCurrentValueRequest();
    SaveCurrentValueRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: SaveCurrentValueRequest) {
    _instance.topicId = _instance.topicId || '';
    _instance.questionId = _instance.questionId || '';
    _instance.currentValue = _instance.currentValue || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: SaveCurrentValueRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.topicId = _reader.readString();
          break;
        case 2:
          _instance.questionId = _reader.readString();
          break;
        case 3:
          _instance.currentValue = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    SaveCurrentValueRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: SaveCurrentValueRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.topicId) {
      _writer.writeString(1, _instance.topicId);
    }
    if (_instance.questionId) {
      _writer.writeString(2, _instance.questionId);
    }
    if (_instance.currentValue) {
      _writer.writeInt32(3, _instance.currentValue);
    }
  }

  private _topicId: string;
  private _questionId: string;
  private _currentValue: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SaveCurrentValueRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<SaveCurrentValueRequest.AsObject>) {
    _value = _value || {};
    this.topicId = _value.topicId;
    this.questionId = _value.questionId;
    this.currentValue = _value.currentValue;
    SaveCurrentValueRequest.refineValues(this);
  }
  get topicId(): string {
    return this._topicId;
  }
  set topicId(value: string) {
    this._topicId = value;
  }
  get questionId(): string {
    return this._questionId;
  }
  set questionId(value: string) {
    this._questionId = value;
  }
  get currentValue(): number {
    return this._currentValue;
  }
  set currentValue(value: number) {
    this._currentValue = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    SaveCurrentValueRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): SaveCurrentValueRequest.AsObject {
    return {
      topicId: this.topicId,
      questionId: this.questionId,
      currentValue: this.currentValue
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): SaveCurrentValueRequest.AsProtobufJSON {
    return {
      topicId: this.topicId,
      questionId: this.questionId,
      currentValue: this.currentValue
    };
  }
}
export module SaveCurrentValueRequest {
  /**
   * Standard JavaScript object representation for SaveCurrentValueRequest
   */
  export interface AsObject {
    topicId: string;
    questionId: string;
    currentValue: number;
  }

  /**
   * Protobuf JSON representation for SaveCurrentValueRequest
   */
  export interface AsProtobufJSON {
    topicId: string;
    questionId: string;
    currentValue: number;
  }
}

/**
 * Message implementation for quiz.SaveCurrentValueResponse
 */
export class SaveCurrentValueResponse implements GrpcMessage {
  static id = 'quiz.SaveCurrentValueResponse';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new SaveCurrentValueResponse();
    SaveCurrentValueResponse.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: SaveCurrentValueResponse) {}

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: SaveCurrentValueResponse,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        default:
          _reader.skipField();
      }
    }

    SaveCurrentValueResponse.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: SaveCurrentValueResponse,
    _writer: BinaryWriter
  ) {}

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SaveCurrentValueResponse to deeply clone from
   */
  constructor(_value?: RecursivePartial<SaveCurrentValueResponse.AsObject>) {
    _value = _value || {};
    SaveCurrentValueResponse.refineValues(this);
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    SaveCurrentValueResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): SaveCurrentValueResponse.AsObject {
    return {};
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): SaveCurrentValueResponse.AsProtobufJSON {
    return {};
  }
}
export module SaveCurrentValueResponse {
  /**
   * Standard JavaScript object representation for SaveCurrentValueResponse
   */
  export interface AsObject {}

  /**
   * Protobuf JSON representation for SaveCurrentValueResponse
   */
  export interface AsProtobufJSON {}
}
