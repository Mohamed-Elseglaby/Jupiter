import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { StudentsService } from '../Services/students.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AddComponent } from '../add/add.component';
import { Student } from '../_models/student';
import { EditComponent } from '../edit/edit.component';
import { Subjects } from '../_models/subjects';
import { GradesService } from '../Services/grades.service';
import { subject } from '../_models/subject';
import { EditGradesComponent } from '../edit-grades/edit-grades.component';
@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrl: './grades.component.css',
  providers: [StudentsService, ConfirmationService, MessageService],
})
export class GradesComponent {
  students: any = [];
  subjects: Subjects[] = [
    { subject: 'Math' },
    { subject: 'Arabic' },
    { subject: 'History' },
  ];
  grades: any = [];
  selectedSub: any = { subject: 'Math' };
  searchTerm = '';
  ref: DynamicDialogRef | undefined;
  constructor(
    public studentService: StudentsService,
    public dialogService: DialogService,
    public gradesservice: GradesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.students = this.studentService.getAll();
  }
  ngOnInit(): void {
    this.grades = this.gradesservice.getSubjects(this.selectedSub.subject);
  }
  selectSub() {
    this.grades = this.gradesservice.getSubjects(this.selectedSub.subject);
  }
  edit(n: number, sub: string, t1: number, t2: number) {
    this.ref = this.dialogService.open(EditGradesComponent, {
      header: 'Edit Student Grades',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      closeOnEscape: true,
      height: '55vh',
      maximizable: true,
      focusOnShow: true,
      data: {
        id: n,
        subject: sub,
        term1: t1,
        term2: t2,
      },
    });
    this.ref.onClose.subscribe((data: any) => {
      if (data) {
        this.gradesservice.edit(n, sub, t1, t2);
      }
    });
  }
  getsucces(flag: boolean) {
    let count = 0;
    if (flag) {
      for (let i = 0; i < this.grades.length; i++) {
        if (this.grades[i].total >= 15) count += 1;
      }
    } else {
      for (let i = 0; i < this.grades.length; i++) {
        if (this.grades[i].total < 15) count += 1;
      }
    }
    return count;
  }
}
