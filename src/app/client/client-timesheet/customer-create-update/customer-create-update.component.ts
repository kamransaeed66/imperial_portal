import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../interfaces/customer.model';
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
import { Job } from '../../clients-dashboard/client-job-table/interfaces/job.model';
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

  icMoreVert = icMoreVert;
  icClose = icClose;
  icPrint = icPrint;
  icDownload = icDownload;
  icDelete = icDelete;
  icPerson = icPerson;
  icMyLocation = icMyLocation;
  icLocationCity = icLocationCity;
  icEditLocation = icEditLocation;
  icPhone = icPhone;
  timesheets: any[];
  user: any;
  workerId: any;
  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
              private dialogRef: MatDialogRef<CustomerCreateUpdateComponent>,
              private fb: FormBuilder,
              private authService: AuthService) {
  }

  ngOnInit() {
    console.log('000000');
    console.log(this.defaults);
    this.timesheets = this.defaults.timesheetId;

    if (!this.authService.AllUser) {
      this.authService.setAllUser();
    }
    console.log('<><><><><><><><><><><<><><><><><><><><>');
    console.log(this.authService.AllUser);
    const tempArr = this.authService.AllUser;
    this.workerId = [];
    tempArr.forEach(obj => {
      if (obj.accountType === 'Worker') {
        this.workerId.push({profilePhoto: obj.profilePhoto, workerId: obj.workerId, id: obj._id});
      }
    });
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as Job;
    }

    this.form = this.fb.group({
      id: [CustomerCreateUpdateComponent.id++],
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

    if (!customer.imageSrc) {
      customer.imageSrc = 'assets/img/avatars/1.jpg';
    }

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
  createRange(number){
  const items: number[] = [];
  for (let i = 1; i <= number; i++){
     items.push(i);
  }
  return items;
  }
  setSubmit(){
    // this.timesheets.forEach((ele, index, arr) => {
    //   this.authService.setStatusTimesheet(ele._id, ele.statusStr).subscribe((res) => {
    //     console.log(res);
    //     if (index === (arr.length - 1)){
    //       this.authService.setStatusJob(this.defaults.id, 'Completed').subscribe((res1) => {
    //         console.log(res1);
    //         this.authService.openSnackbar('Confirmed Successfully!');
    //         this.defaults.statusStr = 'Completed';
    //         this.dialogRef.close(this.defaults);
    //         });
    //     }
    //   });

    // });
  }
  changeStatus(item, i){
    if (item.statusStr === 'Pending') {
      item.statusStr = 'Completed';
    }
    else if (item.statusStr === 'Completed') {
      item.statusStr = 'UnCompleted';
 }
    else {
      item.statusStr = 'Pending';
 }
    this.timesheets[i] = item;
  }
  getStatusClass(status, i)
  {
    if (i === 0 && status === 'Pending') {
      return 'text-green';
    }
    if (i === 0 && status === 'Completed') {
      return 'text-purple';
    }
    if (i === 0 && status === 'UnCompleted') {
      return 'text-cyan';
    }
    if (i === 1 && status === 'Pending') {
      return 'bg-green-light';
    }
    if (i === 1 && status === 'Completed') {
      return 'bg-purple-light';
    }
    if (i === 1 && status === 'UnCompleted') {
      return 'bg-cyan-light';
    }
  }
}
