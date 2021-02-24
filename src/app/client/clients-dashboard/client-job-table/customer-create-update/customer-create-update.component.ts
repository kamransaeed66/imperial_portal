import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Job } from '../interfaces/job.model';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icClose from '@iconify/icons-ic/twotone-close';
import icPrint from '@iconify/icons-ic/twotone-print';
import icDownload from '@iconify/icons-ic/twotone-cloud-download';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icPerson from '@iconify/icons-ic/twotone-person';
import icMyLocation from '@iconify/icons-ic/twotone-my-location';
import icLocationCity from '@iconify/icons-ic/twotone-location-city';
import icEditLocation from '@iconify/icons-ic/twotone-edit-location';
import { statusTableLabels } from 'src/static-data/status-table-data';
import { formatDate } from '@angular/common';
import icAdd from '@iconify/icons-fa-solid/plus-square';
import icMinus from '@iconify/icons-fa-solid/minus-square';
import moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'vex-customer-create-update',
  templateUrl: './customer-create-update.component.html',
  styleUrls: ['./customer-create-update.component.scss']
})
export class CustomerCreateUpdateComponent implements OnInit {

  static id = 100;

  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  selectedType = 'Housekeeping';
  selectedRole = 'Linen Porter';
  icMoreVert = icMoreVert;
  icClose = icClose;

  icPrint = icPrint;
  icDownload = icDownload;
  icDelete = icDelete;
  icAdd = icAdd;
  icMinus = icMinus;

  icPerson = icPerson;
  icMyLocation = icMyLocation;
  icLocationCity = icLocationCity;
  icEditLocation = icEditLocation;
  icPhone = icPhone;
  minDate;
  minStart = 0;
  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
              private dialogRef: MatDialogRef<CustomerCreateUpdateComponent>,
              private fb: FormBuilder,
              private authService: AuthService) {
  }

  ngOnInit() {
    // this.minDate = '2020-08-15';
    this.minDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    console.log('1213123');
    console.log(this.minDate);
    // this.minDate = formatDate(new Date(), 'YYYY-MM-DD').toString();
    if (this.defaults) {
      console.log('this.defaults', this.defaults)
      this.mode = 'update';
      this.defaults.shiftDate = moment(moment(this.defaults.shiftDate)).format('YYYY-MM-DD');
      console.log('shiftDtae', this.defaults.shiftDate);
    } else {
      this.mode = 'create';
      this.defaults = {} as Job;
    }
    this.form = this.fb.group({
      id: [CustomerCreateUpdateComponent.id++],
      _id: [this.defaults._id || ''],
      client: [this.defaults.client || ''],
      shiftDate: [this.defaults.shiftDate || formatDate(new Date(), 'yyyy-MM-dd', 'en')],
      locationShift: [this.defaults.locationShift || ''],
      purchaseOrderNo: [this.defaults.purchaseOrderNo || ''],
      additionalInformation: [this.defaults.additionalInformation || ''],
      status: [this.defaults.status || statusTableLabels[2]],
      shifts: this.fb.array([])
    });
    this.assignShifts();
  }

  assignShifts() {
    if (this.mode === 'update') {
      this.defaults.shifts.forEach(x => {
        this.shifts.push(this.patchValues(x));
      });
    }
    else{
      this.shifts.push(
        this.fb.group({
          department: ['', Validators.required],
          role: ['', Validators.required],
          startTime: ['', Validators.required],
          endTime: ['', Validators.required],
          total: ['', [Validators.required, Validators.min(1)]],
        })
      );
    }
  }

  patchValues(x) {
    return this.fb.group({
      department: [x.department],
      role: [x.role],
      startTime: [x.startTime],
      endTime: [x.endTime],
      total: [x.total],
    });
  }

  save() {
    if (this.mode === 'create') {
      this.createCustomer();
    } else if (this.mode === 'update') {
      this.updateCustomer();
    }
  }

  createCustomer() {
    const customer = this.form.value;
    customer.clientId = this.authService.currenctUser._id;
    console.log('createCustomer', customer);
    this.dialogRef.close(customer);
  }

  updateCustomer() {
    const customer = this.form.value;
    customer.id = this.defaults.id;

    this.dialogRef.close(customer);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
  changeAccountType(ev, i){
    if (i === 1) {
    this.selectedType = ev.value();
    }
    else {
    this.selectedRole = ev.value();
    }
  }

  // tslint:disable-next-line: no-string-literal
  get shifts() { return this.form.controls.shifts as FormArray; }


  addShift(){
    this.shifts.push(this.fb.group({
      department: ['', Validators.required],
      role: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      total: ['', [Validators.required, Validators.min(1)]],
    }));
    console.log('addShift', this.shifts);
  }
  removeShift(index){
    this.shifts.removeAt(index);
    console.log('removeShift', index, this.shifts);
  }
}
