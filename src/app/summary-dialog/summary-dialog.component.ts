import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { IQuestion, ITopic } from '../core/models';

interface EvaluationNode {
  question: IQuestion;
  depth: number;
  parentId: string | null;
}

@Component({
  selector: 'app-summary-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './summary-dialog.component.html',
  styleUrls: ['./summary-dialog.component.scss']
})
export class SummaryDialogComponent {
  selectedTopic: ITopic | null = null;
  evaluationNodes: EvaluationNode[] = [];
  currentIndex = 0;
  showSummary = false;
  readonly maxQuestionValue = 100;

  currentValueCtrl = new FormControl<number | null>(null, [
    Validators.required,
    Validators.min(0),
    Validators.max(this.maxQuestionValue),
  ]);

  constructor(
    private dialogRef: MatDialogRef<SummaryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public topics: ITopic[]
  ) {}

  get availableTopics(): ITopic[] {
    return (this.topics || []).filter((topic) => topic.questions?.length);
  }

  selectTopic(topic: ITopic) {
    if (!topic.questions?.length) {
      return;
    }
    this.selectedTopic = topic;
    this.evaluationNodes = this.flattenQuestions(topic.questions);
    this.currentIndex = 0;
    this.showSummary = false;
    this.setValidatorsForCurrentQuestion();
  }

  backToPicker() {
    this.selectedTopic = null;
    this.evaluationNodes = [];
    this.currentIndex = 0;
    this.showSummary = false;
    this.currentValueCtrl.reset();
  }

  flattenQuestions(
    questions: IQuestion[],
    depth = 0,
    parentId: string | null = null
  ): EvaluationNode[] {
    const result: EvaluationNode[] = [];

    for (const question of questions) {
      question.currentValue = null;
      result.push({ question, depth, parentId });

      if (question.subQuestions?.length) {
        result.push(
          ...this.flattenQuestions(question.subQuestions, depth + 1, question.id)
        );
      }
    }

    return result;
  }

  get currentQuestion(): IQuestion | null {
    return this.evaluationNodes[this.currentIndex]?.question ?? null;
  }

  get answeredCount(): number {
    return this.evaluationNodes.filter(
      (node) => node.question.currentValue !== null
    ).length;
  }

  selectQuestionNode(node: EvaluationNode) {
    const targetIndex = this.evaluationNodes.findIndex(
      (item) => item.question.id === node.question.id
    );
    if (targetIndex === -1) return;

    this.persistCurrentValue();
    this.currentIndex = targetIndex;
    this.showSummary = false;
    this.setValidatorsForCurrentQuestion();
  }

  goNext() {
    const current = this.currentQuestion;
    if (this.currentValueCtrl.invalid || !current) {
      return;
    }

    current.currentValue = this.currentValueCtrl.value ?? 0;
    if (this.currentIndex < this.evaluationNodes.length - 1) {
      this.currentIndex++;
      this.setValidatorsForCurrentQuestion();
    } else {
      this.finishInterview();
    }
  }

  setValidatorsForCurrentQuestion() {
    const current = this.currentQuestion;
    if (!current) {
      return;
    }

    const validators = [
      Validators.required,
      Validators.min(0),
      Validators.max(this.maxQuestionValue),
    ];

    this.currentValueCtrl.setValidators(validators);
    this.currentValueCtrl.updateValueAndValidity();

    this.currentValueCtrl.reset(current.currentValue ?? null, {
      emitEvent: false,
    });
  }

  persistCurrentValue() {
    const current = this.currentQuestion;
    if (!current) {
      return;
    }

    if (this.currentValueCtrl.valid && this.currentValueCtrl.value !== null) {
      current.currentValue = this.currentValueCtrl.value;
    }
  }

  finishInterview() {
    this.persistCurrentValue();
    this.showSummary = true;
  }

  calculateScore(): number {
    const answeredNodes = this.evaluationNodes.filter(
      (node) => node.question.currentValue !== null
    );

    if (!answeredNodes.length) {
      return 0;
    }

    const totalAchieved = answeredNodes.reduce(
      (acc, node) => acc + (node.question.currentValue ?? 0),
      0
    );
    const totalPossible = answeredNodes.length * this.maxQuestionValue;
    const percent = (totalAchieved / totalPossible) * 100;

    return Math.round(percent);
  }

  close() {
    this.currentValueCtrl.reset();
    this.dialogRef.close();
  }
}
