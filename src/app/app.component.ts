import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { TopicComponent, ITopic } from './topic/topic.component';
import { generateRandomId } from './helpers';
import { MatDialog } from '@angular/material/dialog';
import { SummaryDialogComponent } from './summary-dialog/summary-dialog.component';

export interface IQuiz {
  topics: ITopic[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    TopicComponent,
  ],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  isInputDisplay = false;
  topic = new FormControl('', [Validators.required, Validators.minLength(1)]);

  data: IQuiz = { topics: [] };

  constructor(
    private readonly dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    const saved = localStorage.getItem('quiz');
    if (saved) {
      this.data = JSON.parse(saved);
    }
  }

  addTopic() {
    this.isInputDisplay = true;
  }

  saveTopic() {
    if (this.topic.valid) {
      this.data.topics.push({
        id: generateRandomId('topic'),
        name: this.topic.value as string,
        questions: [],
        grades: [],
      });
      this.topic.reset();
      this.isInputDisplay = false;
      localStorage.setItem('quiz', JSON.stringify(this.data));
    }
  }

  saveTopicData(updatedTopic: ITopic) {
    const idx = this.data.topics.findIndex(t => t.id === updatedTopic.id);
    if (idx > -1) {
      this.data.topics[idx] = updatedTopic;
      localStorage.setItem('quiz', JSON.stringify(this.data));
    }
  }

  cleanAll() {
    this.data = { topics: [] };
    localStorage.removeItem('quiz');
    this.isInputDisplay = false;
  }

  openSummaryDialog() {
    this.dialog.open(SummaryDialogComponent, {
      width: '850px',
      maxHeight: '90vh',
      data: this.data.topics,
      autoFocus: false,
      disableClose: true
    });
  }
}
