import { Injectable } from '@angular/core';
import { Student } from '../_models/student';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  students: Student[] = [
    new Student(1, 'Ali', '1st', 'A'),
    new Student(2, 'Mohamed', '2nd', 'F'),
    new Student(3, 'Yasser', '3rd', 'A'),
    new Student(4, 'Nour', '8th', 'C'),
    new Student(5, 'Magdy', '6th', 'D'),
    new Student(6, 'Islam', '6th', 'A'),
  ];
  getAll() {
    return this.students;
  }
  add(s: Student) {
    this.students.push(s);
  }
  edited: Student | undefined = new Student(12, '', '', '');
  edit(id: number, name: string, year: string, grade: string) {
    for (let i = 0; i < this.students.length; i++) {
      if (id == this.students[i].id) {
        this.students[i].id = id;
        this.students[i].name = name;
        this.students[i].year = year;
        this.students[i].grade = grade;
      }
    }
    return this.students;
  }
  delete(n: number) {
    for (let i = 0; i < this.students.length; i++) {
      if (n == this.students[i].id) {
        this.students.splice(i, 1);
      }
    }
    return this.students;
  }
  getInfo(s: number) {
    for (let i = 0; i < this.students.length; i++) {
      if (s == this.students[i].id) {
        return this.students[i];
      }
    }
    return undefined;
  }
  constructor() {}
}
