import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'vex-calendar-edit',
  templateUrl: './calendar-edit.component.html',
  styleUrls: ['./calendar-edit.component.scss']
})
export class CalendarEditComponent implements OnInit {

  form = this.fb.group({
    startTime: null,
    endTime: null,
    department: null,
    role: null,
    title: null
  });
  currentUser:any;
  constructor(private dialogRef: MatDialogRef<CalendarEditComponent>,
    @Inject(MAT_DIALOG_DATA) public event: any,
    private fb: FormBuilder,
    private route: Router,
    private authService: AuthService) {
      if (!this.authService.currenctUser) {
        this.authService.setCurrentUser();
        }
        this.currentUser = this.authService.currenctUser;
    }

  ngOnInit() {
    this.form.patchValue(this.event);
  }

  save() {
    this.dialogRef.close({
      ...this.event,
      ...this.form.value
    });
  }
  goToJob(){
    console.log('this.event', this.event);
    this.authService.currentScrumboard = [
      {
      id: this.event.client.id,
      title: this.event.client.department,
      children: [
        // { id:1, label:'Unassigned Shifts', children:[] },
        // { id:2, label:'Assigned', children:[] },
        { id: 1, label: 'In Progress', children: [] },
        { id: 2, label: 'Timesheet Submitted', children: [] },
        { id: 3, label: 'Completed', children: [] },
      ]
    }];
    this.authService.currentJob = this.event;
    const arrLabel = ['In Progress', 'Timesheet Submitted', 'Completed'];
    console.log('&&&&');
    console.log(' this.event.client', this.event.client);
    console.log('&&&&');
    arrLabel.forEach((ele, index) => {
      if (ele === this.event.client.statusStr) {
        this.authService.currentScrumboard[0].children[index].children.push({
          id: this.event.client.id,
          title: this.event.client.department,
          client: this.event.client.client,
          department: this.event.client.department,
          role: this.event.client.role,
          shiftDate: this.event.client.shiftDate,
          startTime: this.event.client.startTime,
          endTime: this.event.client.endTime,
          locationShift: this.event.client.locationShift,
          purchaseOrderNo: this.event.client.purchaseOrderNo,
          additionalInformation: this.event.client.additionalInformation,
          statusStr: this.event.client.statusStr,
          fulfilled: this.event.client.fulfilled,
          total: this.event.client.total,
          totalStaff: this.event.client.totalStaff,
          clientId: this.event.client.clientId,
          timesheetId: this.event.client.timesheetId
        });
      }
    });
    this.authService.setCurrentScrumboardLocal(this.authService.currentScrumboard);
    if(this.currentUser.accountType === 'Admin')
      this.route.navigate(['/admin/jobs/scrumboard', this.event.client.id]);
    else if(this.currentUser.accountType === 'Team')
      this.route.navigate(['/team/jobs/scrumboard', this.event.client.id]);
    this.dialogRef.close({
      ...this.event,
      ...this.form.value
    });
  }
}
