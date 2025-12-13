import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { generateRandomId } from '../helpers';
import { IQuestion } from '../core/models';

const QUESTION_COMPONENT_IMPORTS = [
  CommonModule,
  ReactiveFormsModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  TextFieldModule,
] as const;

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    ...QUESTION_COMPONENT_IMPORTS,
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
  editQuestionCtrl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  editAnswerCtrl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  isEditing = false;

  addSubQuestion() {
    this.isInputDisplay = true;
  }

  startEdit() {
    this.isEditing = true;
    this.isInputDisplay = false;
    this.questionCtrl.reset();
    this.answerCtrl.reset();
    this.editQuestionCtrl.setValue(this.data.question);
    this.editAnswerCtrl.setValue(this.data.answer);
  }

  saveEdit() {
    if (this.editQuestionCtrl.invalid || this.editAnswerCtrl.invalid) return;

    this.data.question = this.editQuestionCtrl.value?.trim() ?? this.data.question;
    this.data.answer = this.editAnswerCtrl.value?.trim() ?? this.data.answer;
    this.isEditing = false;
    this.saveData.emit(this.data);
  }

  cancelEdit() {
    this.isEditing = false;
    this.editQuestionCtrl.reset();
    this.editAnswerCtrl.reset();
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

// Додаємо компонент до imports для рекурсивного використання
(QuestionComponent as any).ɵcmp.imports.push(QuestionComponent);

