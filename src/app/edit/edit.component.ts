import { Component } from '@angular/core';
import { StudentsService } from '../Services/students.service';
import { year } from '../_models/years';
import { Student } from '../_models/student';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  editid = 0;
  constructor(
    public studentService: StudentsService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.editid = this.config.data.id;
  }
  myname: string = '';
  myid: number = 0;
  mygrade: string = '';
  initStudent: Student | undefined = new Student(0, '', '', '');
  selectedyear: string = '';
  Years: year[] = [
    { year: '1st' },
    { year: '2nd' },
    { year: '3rd' },
    { year: '4th' },
    { year: '5th' },
    { year: '6st' },
    { year: '7nd' },
    { year: '8rd' },
    { year: '9th' },
    { year: '10th' },
    { year: '11th' },
    { year: '12th' },
  ];
  years2: string[] = [
    '1st',
    '2nd',
    '3rd',
    '4th',
    '5th',
    '6th',
    '7th',
    '8th',
    '9th',
    '10th',
    '11th',
    '12th',
  ];
  frmGroup = new FormGroup({
    myid: new FormControl(0, [Validators.required]),
    myname: new FormControl('Ali', [Validators.required]),
    drop: new FormControl('', [Validators.required]),
    mygrade: new FormControl('B', [Validators.required]),
  });
  ngOnInit() {
    this.getedited();
  }
  getedited() {
    this.initStudent = this.studentService.getInfo(this.config.data.id);
    console.log(this.initStudent);
    this.frmGroup.controls['myname'].setValue(
      this.initStudent?.name.toString() as string
    );
    this.frmGroup.controls['myid'].setValue(
      Number(this.initStudent?.id.toString() as string)
    );
    this.frmGroup.controls['drop'].setValue(
      this.initStudent?.year.toString() as string
    );
    this.frmGroup.controls['mygrade'].setValue(
      this.initStudent?.grade.toString() as string
    );
  }
  edit() {
    this.myname = this.frmGroup?.get('myname')?.value?.toString() as string;
    this.myid = Number(this.frmGroup?.get('myid')?.value?.toString() as string);
    this.mygrade = this.frmGroup?.get('mygrade')?.value?.toString() as string;
    this.selectedyear = this.frmGroup?.get('drop')?.value?.toString() as string;
    this.studentService.edit(
      this.config.data.id,
      this.myname,
      this.selectedyear.toString(),
      this.mygrade
    );
    console.log(
      this.config.data.id,
      this.myid,
      this.myname,
      this.selectedyear.toString(),
      this.mygrade
    );
  }
}
