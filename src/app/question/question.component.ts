import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { generateRandomId } from '../helpers';
import { IQuestion } from '../core/models';

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
  questionCtrl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  answerCtrl = new FormControl('', [Validators.required, Validators.minLength(1)]);

  addSubQuestion() {
    this.isInputDisplay = true;
  }

  saveSubQuestion() {
    if (this.questionCtrl.invalid || this.answerCtrl.invalid) return;

    const newSubQuestion: IQuestion = {
      id: generateRandomId('subq'),
      question: this.questionCtrl.value!,
      answer: this.answerCtrl.value!,
      subQuestions: [],
      currentValue: 0,
    };

    this.data.subQuestions.push(newSubQuestion);
    this.questionCtrl.reset();
    this.answerCtrl.reset();
    this.isInputDisplay = false;
    this.saveData.emit(this.data);
  }

  saveSubQuestionData(updated: IQuestion) {
    const idx = this.data.subQuestions.findIndex((subQuestion) => subQuestion.id === updated.id);
    if (idx > -1) {
      this.data.subQuestions[idx] = updated;
      this.saveData.emit(this.data);
    }
  }

  cancelSubQuestion() {
    this.questionCtrl.reset();
    this.answerCtrl.reset();

    this.isInputDisplay = false;
  }
}
