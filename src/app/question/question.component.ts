import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Nullable } from '../types';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { generateRandomId } from '../helpers';

export interface IQuestion {
  id: string;
  question: string;
  answer: string;
  subQuestions: IQuestion[];
}

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent {
  @Input() data: Nullable<IQuestion> = null;
  @Output() saveData = new EventEmitter<IQuestion>();

  isInputDisplay = false;

  question = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
  ]);

  answer = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
  ]);

  addSubQuestion() {
    this.isInputDisplay = true;
  }

  saveSubQuestion() {
    if (this.question.valid && this.answer.valid) {
      this.data?.subQuestions.push({
        id: generateRandomId('question'),
        question: this.question.getRawValue() as string,
        answer: this.answer.getRawValue() as string,
        subQuestions: [],
      });
      this.question.setValue('');
      this.answer.setValue('');
      this.isInputDisplay = false;
      this.saveData.emit(this.data as IQuestion);
    }
  }

  saveSubQuestionData(data: IQuestion) {
    this.data?.subQuestions.forEach(subQuestion => {
      if (subQuestion.id === data.id) {
        subQuestion = data;
      }
    });
    this.saveData.emit(this.data as IQuestion);
  }
}
