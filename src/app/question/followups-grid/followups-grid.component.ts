import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { IQuestion } from '../../core/models';

@Component({
  selector: 'app-followups-grid',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
  ],
  templateUrl: './followups-grid.component.html',
  styleUrls: ['./followups-grid.component.scss'],
})
export class FollowupsGridComponent implements OnInit {
  @Input() followUps: IQuestion[] = [];
  @Input() parentQuestionId: string | null = null;
  @Output() followUpSelected = new EventEmitter<IQuestion>();

  gridCols = 3;
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

  selectFollowUp(followUp: IQuestion) {
    this.followUpSelected.emit(followUp);
  }
}
