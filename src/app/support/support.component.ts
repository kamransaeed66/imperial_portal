import { ChangeDetectionStrategy,ChangeDetectorRef, Component, OnInit } from '@angular/core';
import icGroup from '@iconify/icons-ic/twotone-group';
import icPageView from '@iconify/icons-ic/twotone-pageview';
import icCloudOff from '@iconify/icons-ic/twotone-cloud-off';
import icTimer from '@iconify/icons-ic/twotone-timer';
import { defaultChartOptions } from '../../@vex/utils/default-chart-options';
import { Order, tableSalesData } from '../../static-data/table-sales-data';
import { TableColumn } from '../../@vex/interfaces/table-column.interface';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import { Job } from 'src/app/client/clients-dashboard/client-job-table/interfaces/job.model';
import { AuthService } from 'src/app/services/auth.service';
import { fadeInUp400ms } from '../../@vex/animations/fade-in-up.animation';
import { stagger60ms } from '../../@vex/animations/stagger.animation';
import icSmartphone from '@iconify/icons-ic/twotone-smartphone';
import icSearch from '@iconify/icons-ic/twotone-search';
import icMail from '@iconify/icons-ic/twotone-mail';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import icVisibility from '@iconify/icons-ic/twotone-visibility';

import icPhoneInTalk from '@iconify/icons-ic/twotone-phone-in-talk';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
@Component({
  selector: 'vex-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class SupportComponent implements OnInit {
  visible = false;
  form: FormGroup;
  selectedType = '';
  tableColumns: TableColumn<Job>[] = [
    {
      label: 'Role',
      property: 'role',
      type: 'text'
    },
    {
      label: 'Client',
      property: 'client',
      type: 'text',
      cssClasses: ['font-medium']
    },
    {
      label: 'Start Time',
      property: 'startTime',
      type: 'text',
      cssClasses: ['text-secondary']
    },
    {
      label: 'End Time',
      property: 'endTime',
      type: 'text',
      cssClasses: ['text-secondary']
    },
    {
      label: 'Status',
      property: 'statusStr',
      type: 'button',
      cssClasses: ['text-secondary']
    }
  ];
  tableData :any;
  // series: ApexAxisChartSeries = [{
  //   name: 'Subscribers',
  //   data: [28, 40, 36, 0, 52, 38, 60, 55, 67, 33, 89, 44]
  // }];

  // userSessionsSeries: ApexAxisChartSeries = [
  //   {
  //     name: 'Users',
  //     data: [10, 50, 26, 50, 38, 60, 50, 25, 61, 80, 40, 60]
  //   },
  //   {
  //     name: 'Sessions',
  //     data: [5, 21, 42, 70, 41, 20, 35, 50, 10, 15, 30, 50]
  //   },
  // ];

  // salesSeries: ApexAxisChartSeries = [{
  //   name: 'Sales',
  //   data: [28, 40, 36, 0, 52, 38, 60, 55, 99, 54, 38, 87]
  // }];

  // pageViewsSeries: ApexAxisChartSeries = [{
  //   name: 'Page Views',
  //   data: [405, 800, 200, 600, 105, 788, 600, 204]
  // }];

  // uniqueUsersSeries: ApexAxisChartSeries = [{
  //   name: 'Unique Users',
  //   data: [356, 806, 600, 754, 432, 854, 555, 1004]
  // }];

  // uniqueUsersOptions = defaultChartOptions({
  //   chart: {
  //     type: 'area',
  //     height: 100
  //   },
  //   colors: ['#ff9800']
  // });
  icVisibility=icVisibility;
  icVisibilityOff=icVisibilityOff;
  icSmartphone = icSmartphone;
  icPhoneInTalk = icPhoneInTalk;
  icSearch = icSearch;
  icPageView = icPageView;
  icCloudOff = icCloudOff;
  icMail = icMail;
  icTimer = icTimer;
  icMoreVert = icMoreVert;
  completedShifts:number;
  totalHours:number;
  currentUser:any;
  constructor(private cd: ChangeDetectorRef,
    private authService:AuthService,
    private fb: FormBuilder,) { }

  ngOnInit() {
    if(!this.authService.currenctUser)
      this.authService.setCurrentUser();
    this.currentUser = this.authService.currenctUser;
      // this.totalHours = this.tableData.filter((obj) => obj.statusStr == 'Completed').length;
    this.form = this.fb.group({
          phoneNumber:[''],
          enquiryType: ['', Validators.required],
          message: ['', Validators.required],
    });
    setTimeout(() => {
      const temp = [
        {
          name: 'Subscribers',
          data: [55, 213, 55, 0, 213, 55, 33, 55]
        },
        {
          name: ''
        }
      ];
    }, 3000);
  }
  submit(){
    const formval = this.form.controls;
    console.log('form======');
    console.log(formval)
    console.log(this.currentUser)
    if(formval.message.invalid || formval.enquiryType.invalid){
      this.authService.openSnackbar('You have to input Message & Type !');
      this.form.reset();
      return;
    }
    var tempName;
    if(this.currentUser.accountType == 'Worker')
      tempName = this.currentUser.forename + ' ' + this.currentUser.surename;
    else
      tempName = this.currentUser.firstName + ' ' + this.currentUser.lastName;
    var sendObj = {
      phoneNumber: formval.phoneNumber.value || '',
      message: formval.message.value,
      enquiryType: formval.enquiryType.value,
      nameContact: tempName,
      emailAddress: this.currentUser.emailAddress,
      company: this.currentUser.companyName || '',
      userId: this.currentUser._id
    };
    this.authService.sendMsg(sendObj).subscribe((res)=>{
      console.log(res)
      this.authService.openSnackbar('Send message to Support Team Successfully !');
      this.form.reset();

    })
  }
}
