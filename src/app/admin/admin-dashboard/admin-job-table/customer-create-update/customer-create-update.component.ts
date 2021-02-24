import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
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
import { AuthService } from 'src/app/services/auth.service';
import { CountryState } from 'src/app/client/settings/companydetails/companydetails.component';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import icArrowDropDown from '@iconify/icons-ic/twotone-arrow-drop-down';
import { Router } from '@angular/router';
import icAdd from '@iconify/icons-fa-solid/plus-square';
import icMinus from '@iconify/icons-fa-solid/minus-square';
import moment from 'moment';

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
  AllClients: any[];
  selectedClient = '';

  fields: any;

  stateCtrl: FormControl;
  filteredStates$: Observable<CountryState[]>;
  states: CountryState[] = [
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ];
  currentUser:any;
  public headers: any[] = [];
  icArrowDropDown = icArrowDropDown;
  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<CustomerCreateUpdateComponent>,
    private fb: FormBuilder,
    private route: Router,
    private authService: AuthService) {
      if (!this.authService.currenctUser) {
        this.authService.setCurrentUser();
        }
        this.currentUser = this.authService.currenctUser;
    }
  filterStates(name: string) {
    return this.states.filter(state =>
      state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  async ngOnInit() {
    console.log('customer create update');
    if (!this.authService.AllUser) {
      await this.authService.getAllUserAuth();
    }
    this.stateCtrl = new FormControl();
    this.filteredStates$ = this.stateCtrl.valueChanges.pipe(
        startWith(''),
        map(state => state ? this.filterStates(state) : this.states.slice())
      );
    this.AllClients = this.authService.AllUser;
    this.AllClients = this.AllClients.filter((obj) => obj.accountType === 'Client');
    console.log('this.AllClients', this.AllClients);
    this.minDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    console.log('minDate', this.minDate);
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
      stateCtrl: [this.stateCtrl.value || ''],
      shifts: this.fb.array([])
    });
    this.assignShifts();
    this.selectedClient = this.defaults.client;
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
    const tempUser = this.AllClients.filter(obj => {
      const tempName = obj.firstName + ' ' + obj.lastName;
      if (tempName === customer.client) {
        return obj;
      }
    });
    customer.clientId  = tempUser[0]._id;
    this.dialogRef.close(customer);

    console.log('SUCCESS!!' + JSON.stringify(this.form.value));
  }

  updateCustomer() {
    const customer = this.form.value;
    console.log('customer', customer.shifts)
    customer.id = this.defaults.id;
    const tempUser = this.AllClients.filter(obj => {
      const tempName = obj.firstName + ' ' + obj.lastName;
      if (tempName === customer.client) {
        return obj;
      }
    });
    customer.clientId  = tempUser[0]._id;
    this.dialogRef.close(customer);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

  openJobs(){
    console.log('-----openjobs--------');
    console.log('---this.defaults----', this.defaults);
    const event: any = this.defaults;

    this.authService.currentScrumboard = [];
    event.shifts.forEach((element, i) => {
      this.authService.currentScrumboard.push({
        id: event.id,
        title: event.shifts[i].department,
        shiftId: event.shifts[i]._id,
        children: [
          // { id:1, label:'Unassigned Shifts', children:[] },
          // { id:2, label:'Assigned', children:[] },
          { id: 1, label: 'In Progress', children: [] },
          { id: 2, label: 'Timesheet Submitted', children: [] },
          { id: 3, label: 'Completed', children: [] },
        ]
      });
      this.authService.currentJob = event;
      console.log('currentJob', this.authService.currentJob);
      const arrLabel = ['In Progress', 'Timesheet Submitted', 'Completed'];
      console.log('&&&&', event.client);
      arrLabel.forEach((ele, index) => {
        if (ele === event.statusStr) {
          this.authService.currentScrumboard[i].children[index].children.push({
            id: event.id,
            title: event.shifts[i].department,
            client: event.clientId,
            shiftDate: event.shiftDate,
            locationShift: event.locationShift,
            purchaseOrderNo: event.purchaseOrderNo,
            additionalInformation: event.additionalInformation,
            statusStr: event.statusStr,
            fulfilled: event.fulfilled,
            shift: event.shifts[i],
            totalStaff: event.totalStaff,
            clientId: event.clientId,
            timesheetId: event.timesheetId
          });
        }
      });
    });
    this.authService.setCurrentScrumboardLocal(this.authService.currentScrumboard);
    if(this.currentUser.accountType === 'Admin')
      this.route.navigate(['/admin/jobs/scrumboard', event.id]);
    else if(this.currentUser.accountType === 'Team')
      this.route.navigate(['/team/jobs/scrumboard', event.id]);

    this.dialogRef.close();
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
