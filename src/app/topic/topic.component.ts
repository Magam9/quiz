import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';

import { QuestionComponent, IQuestion } from '../question/question.component';
import { GradeComponent, IGrade } from '../grade/grade.component';
import { generateRandomId } from '../helpers';

export interface ITopic {
  id: string;
  name: string;
  questions: IQuestion[];
  grades: IGrade[];
}

@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    QuestionComponent,
    GradeComponent,
    MatSelectModule,
  ],
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
})
export class TopicComponent implements OnInit, OnChanges {
  @Input() data!: ITopic;
  @Output() saveData = new EventEmitter<ITopic>();

  isInputDisplay = false;
  question = new FormControl('', [Validators.required]);
  answer = new FormControl('', [Validators.required]);

  questionForm = new FormGroup({
    question: new FormControl('', [Validators.required]),
    answer: new FormControl('', [Validators.required]),
    grade: new FormControl<number|null>(null),
  });

  ngOnInit() {
    this.loadFromStorage();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && !changes['data'].firstChange) {
      this.loadFromStorage();
    }
  }

  saveGrades(updated: ITopic['grades']) {
    this.data.grades = updated;
    this.persist();
    this.saveData.emit(this.data);
  }

  addQuestion() {
    this.isInputDisplay = true;
    this.questionForm.reset();
  }

  saveQuestion() {
    if (this.questionForm.invalid) {
      return;
    }

    const { question, answer, grade } =
      this.questionForm.value as {
        question: string;
        answer:   string;
        grade:    number;
      };

    this.data.questions.push({
      id: generateRandomId('question'),
      question,
      answer,
      grade,
      subQuestions: [],
      currentValue: 0,
    });

    this.resetQuestionForm();
    this.persist();
    this.saveData.emit(this.data);
  }

  saveQuestionData(updated: IQuestion) {
    const idx = this.data.questions.findIndex((question) => question.id === updated.id);
    if (idx > -1) {
      this.data.questions[idx] = updated;
      this.persist();
      this.saveData.emit(this.data);
    }
  }

  private resetQuestionForm() {
    this.question.reset();
    this.answer.reset();
    this.isInputDisplay = false;
  }

  private persist() {
    localStorage.setItem(
      `topic_${this.data.id}`,
      JSON.stringify(this.data)
    );
  }

  private loadFromStorage() {
    const raw = localStorage.getItem(`topic_${this.data.id}`);
    if (raw) {
      try {
        this.data = JSON.parse(raw);
      } catch {}
    }
  }
}
