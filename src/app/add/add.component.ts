import { Component } from '@angular/core';
import { year } from '../_models/years';
import { StudentsService } from '../Services/students.service';
import { Student } from '../_models/student';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent {
  constructor(public studentService: StudentsService) {}
  name: string = '';
  nId: string | undefined;
  selectedyear = { year: '' };
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
  inputData: Student = new Student(1, '', '', '');
  frmGroup = new FormGroup({
    myname: new FormControl('Mohamed'),
    nId: new FormControl(12),
    drop: new FormControl(''),
  });
  ngOnInit() {
    console.log(this.Years);
  }
  i = 7;
  add() {
    this.name = this.frmGroup?.get('myname')?.value?.toString() as string;
    this.inputData = new Student(this.i, this.name, this.selectedyear.year, '');
    this.studentService.add(this.inputData);
    console.log(this.name);
    console.log(this.selectedyear);
    this.i++;
  }
}
