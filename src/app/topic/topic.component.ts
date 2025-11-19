import {
  Component,
  EventEmitter,
  Input,
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
    QuestionComponent,
  ],
  providers: [
    provideDataAdapter(),
  ],
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
})
export class TopicComponent {
  @Input() data!: ITopic;
  @Output() saveData = new EventEmitter<ITopic>();

  isInputDisplay = false;
  question = new FormControl('', [Validators.required]);
  answer = new FormControl('', [Validators.required]);

  questionForm = new FormGroup({
    question: new FormControl('', [Validators.required]),
    answer: new FormControl('', [Validators.required]),
  });

  private readonly dataAdapter = inject(DATA_ADAPTER);

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
