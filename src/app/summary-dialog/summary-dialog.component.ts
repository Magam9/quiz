import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ITopic } from '../topic/topic.component';
import { IQuestion } from '../question/question.component';

@Component({
  selector: 'app-summary-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './summary-dialog.component.html',
  styleUrls: ['./summary-dialog.component.scss']
})
export class SummaryDialogComponent {
  selectedTopic: ITopic | null = null;
  flatQuestions: IQuestion[] = [];
  currentIndex = 0;

  currentValueCtrl = new FormControl<number | null>(null, [
    Validators.required,
    Validators.min(0)
  ]);

  constructor(
    private dialogRef: MatDialogRef<SummaryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public topics: ITopic[]
  ) {}

  selectTopic(topic: ITopic) {
    this.selectedTopic = topic;
    this.flatQuestions = this.flattenQuestions(topic.questions);
    this.currentIndex = 0;
    this.currentValueCtrl.setValue(this.flatQuestions[0]?.currentValue ?? null);
  }

  flattenQuestions(questions: IQuestion[]): IQuestion[] {
    const result: IQuestion[] = [];
    const walk = (qs: IQuestion[]) => {
      for (const q of qs) {
        result.push(q);
        if (q.subQuestions?.length) walk(q.subQuestions);
      }
    };
    walk(questions);
    return result;
  }

  goNext() {
    const current = this.flatQuestions[this.currentIndex];
    if (this.currentValueCtrl.invalid || !current) return;

    current.currentValue = this.currentValueCtrl.value ?? 0;
    this.currentIndex++;

    if (this.currentIndex < this.flatQuestions.length) {
      this.currentValueCtrl.setValue(
        this.flatQuestions[this.currentIndex]?.currentValue ?? null
      );
    }
  }

  calculateScore(): number {
    return this.flatQuestions.reduce(
      (acc, q) => acc + (q.currentValue ?? 0),
      0
    );
  }

  close() {
    this.dialogRef.close();
  }
}
