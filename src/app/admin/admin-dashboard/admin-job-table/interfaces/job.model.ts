import { statusTableData, statusTableLabels } from 'src/static-data/status-table-data';
import { formatDate } from '@angular/common';
export class Job {
  _id: string;
  id: number;
  client: string;
  shiftDate: Date;
  locationShift: string;
  purchaseOrderNo: string; // optional
  additionalInformation: string;
  status: any;
  statusStr: string;
  fulfilled: number;
  totalStaff: string;
  clientId: any;
  shifts: [
    {
      department: {type: String},
      role: {type: String},
      startTime: {type: String},
      endTime: {type: String},
      total: {type: Number, default: 1},
      workers:[
        {
          role: {type:String},
          startTime: {type:String},
          endTime: {type:String},
          workerId: {type: any}
        }
      ]
    }
  ];
  constructor(job) {
    this._id = job._id;
    this.id = job.id;
    this.client = job.client;
    this.shifts = job.shifts;
    this.shiftDate = job.shiftDate;
    this.locationShift = job.locationShift;
    this.purchaseOrderNo = job.purchaseOrderNo;
    this.additionalInformation = job.additionalInformation;
    this.statusStr = job.statusStr;
    this.clientId = job.clientId;
    if (job.statusStr === 'Completed') {
      this.status = statusTableLabels[4];
    }
    else  if (job.statusStr === 'Timesheet Submitted') {
      this.status = statusTableLabels[0];
  }
    else  if (job.statusStr === 'Pending') {
      this.status = statusTableLabels[1];
  }
    else  if (job.statusStr === 'Cancelled') {
      this.status = statusTableLabels[3];
  }
    else
       this.status = statusTableLabels[2];

    // this.total = job.total;
    this.fulfilled = job.fulfilled;
    this.statusStr = job.statusStr;
    this.setTotalStaff();
  }
  setTotalStaff(){
    // this.totalStaff = this.fulfilled + ' / ' + this.total;
  }
}
