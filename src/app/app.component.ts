import { Component, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';

import { TopicComponent } from './topic/topic.component';
import { SummaryDialogComponent } from './summary-dialog/summary-dialog.component';
import { generateRandomId } from './helpers';

import { IQuiz, ITopic } from './core/models';
import { DATA_ADAPTER, provideDataAdapter } from './core/data/data-adapter-injector';
import { LocalStorageDataAdapter } from './core/data/adapters/local-storage.adapter';
import { RestDataAdapter } from './core/data/adapters/rest.adapter';
import { GrpcDataAdapter } from './core/data/adapters/grpc.adapter';
import { SocketDataAdapter } from './core/data/adapters/socket.adapter';
import { environment } from '../../environment';

export function selectAdapter() {
  switch (environment.transport) {
    case 'rest':
      return RestDataAdapter; // not tested
    case 'grpc':
      return GrpcDataAdapter; // not tested
    case 'socket':
      return SocketDataAdapter; // not tested
    default:
      return LocalStorageDataAdapter; // tested
  }
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
  providers: [
    provideDataAdapter(selectAdapter()),
  ],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  isInputDisplay = false;
  topic = new FormControl('', [Validators.required, Validators.minLength(1)]);

  data: IQuiz = { topics: [] };

  private readonly dialog = inject(MatDialog);
  private readonly dataAdapter = inject(DATA_ADAPTER);

  ngOnInit(): void {
    this.dataAdapter.getTopics().subscribe({
      next: (topics) => {
        this.data.topics = topics;
      },
      error: (err) => {
        console.error('Failed to load topics:', err);
      }
    });
  }

  addTopic() {
    this.isInputDisplay = true;
  }

  saveTopic() {
    if (this.topic.invalid) return;

    const newTopic: ITopic = {
      id: generateRandomId('topic'),
      name: this.topic.value as string,
      questions: [],
      grades: [],
    };

    this.dataAdapter.saveTopic(newTopic).subscribe(() => {
      this.data.topics.push(newTopic);
      this.topic.reset();
      this.isInputDisplay = false;
    });
  }

  saveTopicData(updatedTopic: ITopic) {
    this.dataAdapter.saveTopic(updatedTopic).subscribe(() => {
      const idx = this.data.topics.findIndex(t => t.id === updatedTopic.id);
      if (idx !== -1) {
        this.data.topics[idx] = updatedTopic;
      }
    });
  }

  cleanAll() {
    this.data.topics = [];
    localStorage.removeItem('quizbuilder_topics');
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
