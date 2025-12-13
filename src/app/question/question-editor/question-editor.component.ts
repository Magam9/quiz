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
  @Output() save = new EventEmitter<IQuestion>();
  @Output() addFollowUp = new EventEmitter<void>();

  questionCtrl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  answerCtrl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  hasChanges = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['question'] && this.question) {
      this.questionCtrl.setValue(this.question.question);
      this.answerCtrl.setValue(this.question.answer);
      this.hasChanges = false;
    } else if (!this.question) {
      this.questionCtrl.reset();
      this.answerCtrl.reset();
      this.hasChanges = false;
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
    }
  }

  cancel() {
    if (this.question) {
      this.questionCtrl.setValue(this.question.question);
      this.answerCtrl.setValue(this.question.answer);
      this.hasChanges = false;
    }
  }
}
