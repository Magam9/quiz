import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { generateRandomId } from '../helpers';
import { IGrade } from '../grade/grade.component';
import { MatSelectModule } from '@angular/material/select';

export interface IQuestion {
  id: string;
  question: string;
  answer: string;
  grade?: number;
  currentValue: number | null;
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
    MatSelectModule,
  ],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  @Input() data!: IQuestion;
  @Output() saveData = new EventEmitter<IQuestion>();
  @Input() grades: IGrade[] = [];


  isInputDisplay = false;
  questionCtrl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  answerCtrl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  gradeCtrl = new FormControl<number|null>(null, [Validators.required]);
  subGradeCtrl = new FormControl<number | null>(null);

  ngOnInit() {
    if (this.data?.grade) {
      this.gradeCtrl.setValue(this.data?.grade);
    }
    this.gradeCtrl.valueChanges.subscribe((grade) => {
      if (grade != null) {
        this.data.grade = grade;
        this.saveData.emit(this.data);
      }
    });
  }

  addSubQuestion() {
    this.isInputDisplay = true;
  }

  saveSubQuestion() {
    if (this.questionCtrl.invalid || this.answerCtrl.invalid) return;

    const gradeValue = this.subGradeCtrl.value;
    const newSubQuestion: IQuestion = {
      id: generateRandomId('subq'),
      question: this.questionCtrl.value!,
      answer: this.answerCtrl.value!,
      subQuestions: [],
      currentValue: 0,
    };

    if (gradeValue != null) {
      newSubQuestion.grade = gradeValue;
    }

    this.data.subQuestions.push(newSubQuestion);
    this.questionCtrl.reset();
    this.answerCtrl.reset();
    this.subGradeCtrl.reset();
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
}
