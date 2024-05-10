import { Injectable, OnInit } from '@angular/core';
import { Student } from '../_models/student';
import { Subjects } from '../_models/subjects';
import { StudentsService } from './students.service';
import { subject } from '../_models/subject';
@Injectable({
  providedIn: 'root',
})
export class GradesService implements OnInit {
  students: Student[] = this.studentservice.getAll();
  studentsRecordes: any = [];
  constructor(public studentservice: StudentsService) {
    for (let i = 0; i < this.students.length; i++) {
      this.studentsRecordes.push(
        new subject(
          this.students[i].id,
          this.students[i].name,
          this.students[i].year,
          'Math',
          10,
          10,
          this.students[i].grade
        )
      );
      this.studentsRecordes.push(
        new subject(
          this.students[i].id,
          this.students[i].name,
          this.students[i].year,
          'Arabic',
          5,
          5,
          this.students[i].grade
        )
      );
      this.studentsRecordes.push(
        new subject(
          this.students[i].id,
          this.students[i].name,
          this.students[i].year,
          'History',
          7,
          7,
          this.students[i].grade
        )
      );
    }
  }
  ngOnInit(): void {}

  getSubjects(sub: string) {
    const studentsInSubject: any = [];
    for (let i = 0; i < this.studentsRecordes.length; i++) {
      if (this.studentsRecordes[i].subject == sub) {
        studentsInSubject.push(this.studentsRecordes[i]);
      }
    }
    return studentsInSubject;
  }
  getGrades(s: number, sub: string) {
    for (let i = 0; i < this.studentsRecordes.length; i++) {
      if (
        s == this.studentsRecordes[i].id &&
        sub == this.studentsRecordes[i].subject
      ) {
        return this.studentsRecordes[i];
      }
    }
    return undefined;
  }
  calcGrade(t: number) {
    const total = t / 30;
    if (total >= 0.9) {
      return 'A';
    } else if (total >= 0.75) {
      return 'B';
    } else if (total >= 0.65) {
      return 'C';
    } else if (total >= 0.5) {
      return 'D';
    } else {
      return 'F';
    }
  }
  edit(n: number, sub: string, t1: number, t2: number) {
    const gLetter = this.calcGrade(t1 + t2);
    for (let i = 0; i < this.studentsRecordes.length; i++) {
      if (
        n == this.studentsRecordes[i].id &&
        sub == this.studentsRecordes[i].subject
      ) {
        this.studentsRecordes[i].term1 = t1;
        this.studentsRecordes[i].term2 = t2;
        this.studentsRecordes[i].total =
          this.studentsRecordes[i].term1 + this.studentsRecordes[i].term2;
        this.studentsRecordes[i].grade = gLetter;
      }
      console.log(this.studentsRecordes);
    }
    return this.studentsRecordes;
  }
}
