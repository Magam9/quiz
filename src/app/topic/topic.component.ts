import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IQuestion, QuestionComponent } from '../question/question.component';
import { Nullable } from '../types';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { generateRandomId } from '../helpers';

export interface ITopic {
  id: string;
  name: string;
  questions: IQuestion[];
}

@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [QuestionComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.scss',
})
export class TopicComponent {
  @Input() data: Nullable<ITopic> = null;
  @Output() saveData = new EventEmitter<ITopic>();

  isInputDisplay = false;

  question = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
  ]);

  answer = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
  ]);

  get areQuestionsDisplayed() {
    return !!this.data?.questions.length;
  }

  addQuestion() {
    this.isInputDisplay = true;
  }

  saveQuestion() {
    if (this.question.valid && this.answer.valid) {
      this.data?.questions.push({
        id: generateRandomId('question'),
        question: this.question.getRawValue() as string,
        answer: this.answer.getRawValue() as string,
        subQuestions: [],
      });
      this.question.setValue('');
      this.answer.setValue('');
      this.isInputDisplay = false;
      this.saveData.emit(this.data as ITopic);
    }
  }

  saveQuestionData(data: IQuestion) {
    this.data?.questions.forEach(question => {
      if (question.id === data.id) {
        question = data;
      }
    });
    this.saveData.emit(this.data as ITopic);
  }
}
