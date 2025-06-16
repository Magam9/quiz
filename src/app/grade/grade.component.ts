import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltip } from '@angular/material/tooltip';
import { IGrade } from '../core/models';

@Component({
  selector: 'app-grade',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DragDropModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatTooltip,
  ],
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss'],
})
export class GradeComponent implements OnInit {
  @Input() grades: IGrade[] = [];
  @Output() gradesChange = new EventEmitter<IGrade[]>();

  isAdding = false;
  gradeForm = new FormGroup({
    gradeName: new FormControl('', Validators.required),
    value: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0),
    ]),
  });

  ngOnInit() {
    this.syncPositions();
  }

  toggleAdd() {
    this.isAdding = !this.isAdding;
    if (!this.isAdding) {
      this.gradeForm.reset();
    }
  }

  saveGrade() {
    if (this.gradeForm.invalid) return;
    const { gradeName, value } = this.gradeForm.value as {
      gradeName: string;
      value: number;
    };
    this.grades.push({
      gradeName,
      value,
      position: this.grades.length + 1,
    });
    this.afterChange();
    this.toggleAdd();
  }

  removeGrade(i: number) {
    this.grades.splice(i, 1);
    this.afterChange();
  }

  drop(event: CdkDragDrop<IGrade[]>) {
    moveItemInArray(this.grades, event.previousIndex, event.currentIndex);
    this.afterChange();
  }

  private afterChange() {
    this.syncPositions();
    this.gradesChange.emit(this.grades);
  }

  private syncPositions() {
    this.grades = this.grades
      .sort((a, b) => a.position - b.position)
      .map((g, i) => ({ ...g, position: i + 1 }));
  }
}
