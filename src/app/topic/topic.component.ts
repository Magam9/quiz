import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { QuestionComponent, IQuestion } from '../question/question.component';
import { generateRandomId } from '../helpers';

export interface ITopic {
  id: string;
  name: string;
  questions: IQuestion[];
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
    QuestionComponent,
    MatDividerModule,
  ],
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
})
export class TopicComponent {
  @Input() data!: ITopic;
  @Output() saveData = new EventEmitter<ITopic>();

  isInputDisplay = false;
  question = new FormControl('', [Validators.required, Validators.minLength(1)]);
  answer = new FormControl('', [Validators.required, Validators.minLength(1)]);

  addQuestion() {
    this.isInputDisplay = true;
  }

  saveQuestion() {
    if (this.question.valid && this.answer.valid) {
      this.data.questions.push({
        id: generateRandomId('question'),
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

  saveQuestionData(updated: IQuestion) {
    const idx = this.data.questions.findIndex((q) => q.id === updated.id);
    if (idx > -1) {
      this.data.questions[idx] = updated;
      this.saveData.emit(this.data);
    }
  }
}
