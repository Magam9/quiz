import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ITopic, TopicComponent } from './topic/topic.component';
import { generateRandomId } from './helpers';

export interface IQuiz {
  topics: ITopic[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.scss',
  imports: [RouterOutlet, CommonModule, FormsModule, ReactiveFormsModule, TopicComponent],
})
export class AppComponent implements OnInit, OnDestroy {
  isInputDisplay = false;
  topic: FormControl = new FormControl('', [
    Validators.required, 
    Validators.minLength(1)
  ])

  data: IQuiz  = {
    topics: [],
  };

  ngOnInit(): void {
    const data = localStorage.getItem('quiz');
    if (data) {
      this.data = JSON.parse(data); 
    }
  }

  ngOnDestroy(): void {
    localStorage.removeItem('quiz');
  }

  addTopic() {
    this.isInputDisplay = true;
  }

  saveTopic() {
    if (this.topic.valid) {
      this.data.topics.push({
        id: generateRandomId('topic'),
        name: this.topic.getRawValue(),
        questions: [],
      });
      this.topic.setValue('');
      this.isInputDisplay = false;
      localStorage.setItem('quiz', JSON.stringify(this.data));
    }
  }

  saveTopicData(data: ITopic) {
    this.data.topics.forEach(topic => {
      if (topic.id === data.id) {
        topic = data;
      }
    });
    localStorage.setItem('quiz', JSON.stringify(this.data));
  }

  cleanAll() {
    this.data = {
      topics: [],
    };
    localStorage.removeItem('quiz');
  }
}
