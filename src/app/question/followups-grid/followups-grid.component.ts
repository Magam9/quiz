import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IQuestion } from '../../core/models';

@Component({
  selector: 'app-followups-grid',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './followups-grid.component.html',
  styleUrls: ['./followups-grid.component.scss'],
})
export class FollowupsGridComponent {
  @Input() followUps: IQuestion[] = [];
  @Input() parentQuestionId: string | null = null;
  @Output() followUpSelected = new EventEmitter<IQuestion>();

  selectFollowUp(followUp: IQuestion) {
    this.followUpSelected.emit(followUp);
  }
}
