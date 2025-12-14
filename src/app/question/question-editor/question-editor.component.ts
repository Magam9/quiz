import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { IQuestion } from '../../core/models';

@Component({
  selector: 'app-question-editor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    TextFieldModule,
  ],
  templateUrl: './question-editor.component.html',
  styleUrls: ['./question-editor.component.scss'],
})
export class QuestionEditorComponent implements OnChanges {
  @Input() question: IQuestion | null = null;
  @Input() canGoBack = false;
  @Output() save = new EventEmitter<IQuestion>();
  @Output() addFollowUp = new EventEmitter<void>();
  @Output() deleteQuestion = new EventEmitter<IQuestion>();
  @Output() backToParent = new EventEmitter<void>();

  questionCtrl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  answerCtrl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  hasChanges = false;
  isEditing = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['question'] && this.question) {
      this.questionCtrl.setValue(this.question.question);
      this.answerCtrl.setValue(this.question.answer);
      this.hasChanges = false;
      this.isEditing = false;
    } else if (!this.question) {
      this.questionCtrl.reset();
      this.answerCtrl.reset();
      this.hasChanges = false;
      this.isEditing = false;
    }
  }

  onInputChange() {
    if (this.question) {
      this.hasChanges =
        this.questionCtrl.value !== this.question.question ||
        this.answerCtrl.value !== this.question.answer;
    }
  }

  saveChanges() {
    if (this.question && this.questionCtrl.valid && this.answerCtrl.valid) {
      const updated: IQuestion = {
        ...this.question,
        question: this.questionCtrl.value!.trim(),
        answer: this.answerCtrl.value!.trim(),
      };
      this.save.emit(updated);
      this.hasChanges = false;
      this.isEditing = false;
    }
  }

  cancel() {
    if (this.question) {
      this.questionCtrl.setValue(this.question.question);
      this.answerCtrl.setValue(this.question.answer);
      this.hasChanges = false;
    }
    this.isEditing = false;
  }

  startEditing() {
    if (!this.question) {
      return;
    }
    this.questionCtrl.setValue(this.question.question);
    this.answerCtrl.setValue(this.question.answer);
    this.hasChanges = false;
    this.isEditing = true;
  }

  requestDelete() {
    if (!this.question) {
      return;
    }
    this.deleteQuestion.emit(this.question);
  }
}
