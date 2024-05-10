import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from '../_models/student';
import { year } from '../_models/years';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { StudentsService } from '../Services/students.service';
import { GradesService } from '../Services/grades.service';
import { subject } from '../_models/subject';
import { devNull } from 'os';
@Component({
  selector: 'app-edit-grades',
  templateUrl: './edit-grades.component.html',
  styleUrl: './edit-grades.component.css',
})
export class EditGradesComponent {
  editid = 0;
  selectedsub = '';
  constructor(
    public studentService: StudentsService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public gradesservices: GradesService
  ) {
    this.editid = this.config.data.id;
    this.selectedsub = this.config.data.subject;
  }
  term1: number = 0;
  term2: number = 0;
  initStudent: subject | undefined = new subject(0, '', '', '', 0, 0, '');
  frmGroup = new FormGroup({
    term1: new FormControl(0, [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(2),
      Validators.pattern(/^-?(0|[1-9]\d*)?$/),
      Validators.pattern(/^(?:1[0-5]|[0-9])$/),
    ]),
    term2: new FormControl(0, [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(2),
      Validators.pattern(/^-?(0|[1-9]\d*)?$/),
      Validators.pattern(/^(?:1[0-5]|[0-9])$/),
    ]),
  });
  ngOnInit() {
    this.getedited();
  }
  getedited() {
    this.initStudent = this.gradesservices.getGrades(
      this.config.data.id,
      this.config.data.subject
    );
    console.log(this.initStudent);
    this.frmGroup.controls['term1'].setValue(
      Number(this.initStudent?.term1.toString() as string)
    );
    this.frmGroup.controls['term2'].setValue(
      Number(this.initStudent?.term2.toString() as string)
    );
  }

  edit() {
    this.term1 = Number((this.frmGroup?.get('term1')?.value ?? '').toString());
    this.term2 = Number((this.frmGroup?.get('term2')?.value ?? '').toString());
    this.gradesservices.edit(
      this.config.data.id,
      this.config.data.subject,
      this.term1,
      this.term2
    );
  }
}
