import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { StudentsService } from '../Services/students.service';
import { AddComponent } from '../add/add.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Student } from '../_models/student';
import { FormControl, FormGroup } from '@angular/forms';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
import { ConfirmPopup } from 'primeng/confirmpopup';
import { ok } from 'assert';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  providers: [DialogService, ConfirmationService, MessageService, ConfirmPopup],
})
export class MainComponent implements OnInit {
  students: any = [];
  searchTerm = '';
  ref: DynamicDialogRef | undefined;
  constructor(
    public studentService: StudentsService,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.students = this.studentService.getAll();
  }

  delete(i: number) {
    this.students = this.studentService.delete(i);
  }
  show() {
    this.ref = this.dialogService.open(AddComponent, {
      header: 'Add Student',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      closeOnEscape: true,
      height: '70vh',
      maximizable: true,
      focusOnShow: true,
    });
    this.ref.onClose.subscribe((data: any) => {
      if (data) {
        this.studentService.add(
          new Student(data[0], data[1], data[2], data[3])
        );
      }
    });
  }
  edit(n: number) {
    this.ref = this.dialogService.open(EditComponent, {
      header: 'Edit Student Data',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      closeOnEscape: true,
      height: '70vh',
      maximizable: true,
      focusOnShow: true,
      data: {
        id: n,
      },
    });
    this.ref.onClose.subscribe((data: any) => {
      if (data) {
        this.studentService.edit(n, data[0], data[1], data[2]);
      }
    });
  }
  filterStudents() {
    if (this.searchTerm.trim() === '') {
      this.students = this.studentService.getAll();
    } else {
      this.students = this.studentService
        .getAll()
        .filter((student: Student) => {
          return (
            student.name
              .toLowerCase()
              .startsWith(this.searchTerm.trim().toLowerCase()) ||
            student.id
              .toString()
              .toLowerCase()
              .startsWith(this.searchTerm.trim().toLowerCase()) ||
            student.year
              .toLowerCase()
              .startsWith(this.searchTerm.trim().toLowerCase()) ||
            student.grade
              .toLowerCase()
              .startsWith(this.searchTerm.trim().toLowerCase())
          );
        });
    }
  }
  confirm2(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to Delete this Student?',
      header: 'Delete',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Deleted',
          detail: 'Student has Deleted',
        });
        this.delete(id);
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 3000,
        });
      },
    });
  }
}
