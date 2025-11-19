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
import { QuestionComponent } from '../question/question.component';
import { generateRandomId } from '../helpers';
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
    QuestionComponent,
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
  question = new FormControl('', [Validators.required]);
  answer = new FormControl('', [Validators.required]);

  questionForm = new FormGroup({
    question: new FormControl('', [Validators.required]),
    answer: new FormControl('', [Validators.required]),
  });

  gridCols = 3;

  private readonly dataAdapter = inject(DATA_ADAPTER);
  private readonly breakpointObserver = inject(BreakpointObserver);

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
      .subscribe((state) => {
        if (state.breakpoints[Breakpoints.XSmall] || state.breakpoints[Breakpoints.Small]) {
          this.gridCols = 1;
        } else if (state.breakpoints[Breakpoints.Medium]) {
          this.gridCols = 2;
        } else {
          this.gridCols = 3;
        }
      });
  }

  get totalFollowUps(): number {
    return this.data.questions.reduce(
      (acc, q) => acc + (q.subQuestions ? q.subQuestions.length : 0),
      0
    );
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

  saveQuestionData(updated: IQuestion) {
    const idx = this.data.questions.findIndex((question) => question.id === updated.id);
    if (idx > -1) {
      this.data.questions[idx] = updated;
      this.persist();
      this.saveData.emit(this.data);
    }
  }

  cancelQuestion() {
    this.questionForm.reset();
    this.isInputDisplay = false;
  }

  private resetQuestionForm() {
    this.question.reset();
    this.answer.reset();
    this.isInputDisplay = false;
  }

  private persist() {
    this.dataAdapter.saveTopic(this.data);
  }
}
