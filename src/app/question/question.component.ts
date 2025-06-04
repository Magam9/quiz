import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent {
  @Input() data!: IQuestion;
  @Output() saveData = new EventEmitter<IQuestion>();

  isInputDisplay = false;
  question = new FormControl('', [Validators.required, Validators.minLength(1)]);
  answer = new FormControl('', [Validators.required, Validators.minLength(1)]);

  addSubQuestion() {
    this.isInputDisplay = true;
  }

  saveSubQuestion() {
    if (this.question.valid && this.answer.valid) {
      this.data.subQuestions.push({
        id: generateRandomId('subq'),
        question: this.question.value as string,
        answer: this.answer.value as string,
        subQuestions: [],
      });
      this.question.reset();
      this.answer.reset();
      this.isInputDisplay = false;
      this.saveData.emit(this.data);
    }
  }

  saveSubQuestionData(updated: IQuestion) {
    const idx = this.data.subQuestions.findIndex((s) => s.id === updated.id);
    if (idx > -1) {
      this.data.subQuestions[idx] = updated;
      this.saveData.emit(this.data);
    }
  }
}
