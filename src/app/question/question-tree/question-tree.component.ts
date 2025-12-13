import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IQuestion } from '../../core/models';
import { QuestionTreeNode, flattenQuestions } from '../../helpers';

@Component({
  selector: 'app-question-tree',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, MatButtonModule],
  templateUrl: './question-tree.component.html',
  styleUrls: ['./question-tree.component.scss'],
})
export class QuestionTreeComponent {
  @Input() questions: IQuestion[] = [];
  @Input() selectedQuestionId: string | null = null;
  @Output() questionSelected = new EventEmitter<IQuestion>();

  get treeNodes(): QuestionTreeNode[] {
    return flattenQuestions(this.questions);
  }

  selectQuestion(question: IQuestion) {
    this.questionSelected.emit(question);
  }

  isSelected(questionId: string): boolean {
    return this.selectedQuestionId === questionId;
  }
}
