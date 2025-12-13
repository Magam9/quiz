import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
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
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { QuestionTreeComponent } from '../question/question-tree/question-tree.component';
import { QuestionEditorComponent } from '../question/question-editor/question-editor.component';
import { FollowupsGridComponent } from '../question/followups-grid/followups-grid.component';
import { generateRandomId, findQuestionById, updateQuestionInTree, addFollowUpToQuestion, getTotalFollowUps, removeQuestionFromTree } from '../helpers';
import { IQuestion, ITopic } from '../core/models';
import { DATA_ADAPTER, provideDataAdapter } from '../core/data/data-adapter-injector';

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
    TextFieldModule,
    MatGridListModule,
    QuestionTreeComponent,
    QuestionEditorComponent,
    FollowupsGridComponent,
  ],
  providers: [
    provideDataAdapter(),
  ],
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
})
export class TopicComponent implements OnInit {
  @Input() data!: ITopic;
  @Output() saveData = new EventEmitter<ITopic>();

  isInputDisplay = false;
  selectedQuestion: IQuestion | null = null;
  selectedQuestionId: string | null = null;
  isAddingFollowUp = false;
  followUpQuestionCtrl = new FormControl('', [Validators.required]);
  followUpAnswerCtrl = new FormControl('', [Validators.required]);

  questionForm = new FormGroup({
    question: new FormControl('', [Validators.required]),
    answer: new FormControl('', [Validators.required]),
  });

  followUpForm = new FormGroup({
    question: this.followUpQuestionCtrl,
    answer: this.followUpAnswerCtrl,
  });

  private readonly dataAdapter = inject(DATA_ADAPTER);
  private readonly breakpointObserver = inject(BreakpointObserver);

  ngOnInit() {
    // Component initialization
  }

  get totalFollowUps(): number {
    return getTotalFollowUps(this.data.questions);
  }

  get maxDepth(): number {
    const calculateDepth = (questions: IQuestion[], depth = 0): number => {
      if (!questions || questions.length === 0) return depth;
      return Math.max(
        depth,
        ...questions.map((q) =>
          q.subQuestions && q.subQuestions.length > 0
            ? calculateDepth(q.subQuestions, depth + 1)
            : depth
        )
      );
    };
    return calculateDepth(this.data.questions);
  }

  onQuestionSelected(question: IQuestion) {
    this.selectedQuestion = question;
    this.selectedQuestionId = question.id;
    this.isAddingFollowUp = false;
    this.followUpQuestionCtrl.reset();
    this.followUpAnswerCtrl.reset();
  }

  onQuestionSaved(updated: IQuestion) {
    this.data.questions = updateQuestionInTree(this.data.questions, updated);
    this.selectedQuestion = updated;
    this.persist();
    this.saveData.emit(this.data);
  }

  onAddFollowUp() {
    if (!this.selectedQuestion) return;
    this.isAddingFollowUp = true;
    this.followUpQuestionCtrl.reset();
    this.followUpAnswerCtrl.reset();
  }

  saveFollowUp() {
    if (
      !this.selectedQuestion ||
      this.followUpQuestionCtrl.invalid ||
      this.followUpAnswerCtrl.invalid
    ) {
      return;
    }

    const newFollowUp: IQuestion = {
      id: generateRandomId('subq'),
      question: this.followUpQuestionCtrl.value!.trim(),
      answer: this.followUpAnswerCtrl.value!.trim(),
      subQuestions: [],
      currentValue: 0,
    };

    this.data.questions = addFollowUpToQuestion(
      this.data.questions,
      this.selectedQuestion.id,
      newFollowUp
    );

    // Update selected question to include new follow-up
    const updated = findQuestionById(this.data.questions, this.selectedQuestion.id);
    if (updated) {
      this.selectedQuestion = updated;
      this.selectedQuestionId = updated.id;
    }

    this.isAddingFollowUp = false;
    this.followUpQuestionCtrl.reset();
    this.followUpAnswerCtrl.reset();
    this.persist();
    this.saveData.emit(this.data);
  }

  cancelFollowUp() {
    this.isAddingFollowUp = false;
    this.followUpQuestionCtrl.reset();
    this.followUpAnswerCtrl.reset();
  }

  onFollowUpSelected(followUp: IQuestion) {
    this.onQuestionSelected(followUp);
  }

  onQuestionDeleted(question: IQuestion) {
    if (!question) {
      return;
    }
    this.removeQuestionAndRefresh(question.id);
  }

  onFollowUpDeleted(event: { followUpId: string; parentId: string | null }) {
    if (!event || !event.followUpId) {
      return;
    }
    this.removeQuestionAndRefresh(event.followUpId);
  }

  addQuestion() {
    this.isInputDisplay = true;
    this.questionForm.reset();
  }

  saveQuestion(event: Event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    if (this.questionForm.invalid) {
      return;
    }

    const { question, answer } =
      this.questionForm.value as {
        question: string;
        answer: string;
      };

    this.data.questions.push({
      id: generateRandomId('question'),
      question,
      answer,
      subQuestions: [],
      currentValue: 0,
    });

    this.resetQuestionForm();
    this.persist();
    this.saveData.emit(this.data);
  }


  cancelQuestion() {
    this.questionForm.reset();
    this.isInputDisplay = false;
  }

  private resetQuestionForm() {
    this.questionForm.reset();
    this.isInputDisplay = false;
  }

  private persist() {
    this.dataAdapter.saveTopic(this.data);
  }

  private removeQuestionAndRefresh(questionId: string) {
    const { updatedQuestions, removed, parentIdOfRemoved } = removeQuestionFromTree(
      this.data.questions,
      questionId
    );
    if (!removed) {
      return;
    }

    this.data.questions = updatedQuestions;

    if (parentIdOfRemoved) {
      const parent = findQuestionById(this.data.questions, parentIdOfRemoved);
      if (parent) {
        this.onQuestionSelected(parent);
      } else {
        this.selectFirstAvailableQuestion();
      }
    } else {
      this.selectFirstAvailableQuestion();
    }

    this.isAddingFollowUp = false;
    this.followUpQuestionCtrl.reset();
    this.followUpAnswerCtrl.reset();
    this.persist();
    this.saveData.emit(this.data);
  }

  private selectFirstAvailableQuestion() {
    const firstQuestion = this.data.questions[0];
    if (firstQuestion) {
      this.onQuestionSelected(firstQuestion);
    } else {
      this.selectedQuestion = null;
      this.selectedQuestionId = null;
    }
  }
}
