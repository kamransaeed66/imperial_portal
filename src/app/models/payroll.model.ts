import { formatDate } from '@angular/common';

export class Payroll {
    _id: string;
    id:number;
    firstName:string;
    lastName:string;
    logID:string;
    timestamp:Date;
    timestampStr:string;
    type:string;
    response:string;
    periodStart:Date;
    periodEnd:Date;
    // clientType:string;
    // parentId:string;
    // clientStatus:string;
    // companyUrl:string;
    // tradingName:string;
    constructor(client) {
        this._id = client._id;
        this.id = client.id;
        this.logID = client.logID;
        this.firstName = client.firstName;
        this.lastName = client.lastName;
        this.timestamp = client.timestamp;
        this.timestampStr = formatDate(this.timestamp, 'dd MMM,yyyy HH:mm','en');
        this.type = client.type;
        this.response = client.response;
        this.periodStart = client.periodStart;
        this.periodEnd = client.periodEnd;
      }

      get name() {
        let name = '';

        if (this.firstName && this.lastName) {
          name = this.firstName + ' ' + this.lastName;
        } else if (this.firstName) {
          name = this.firstName;
        } else if (this.lastName) {
          name = this.lastName;
        }

        return name;
      }
      get period(){
        let period = '';
        if(this.periodStart != undefined)
          period = formatDate(this.periodStart, 'dd MMM,yyyy','en') + ' - '+ formatDate(this.periodEnd, 'dd MMM,yyyy','en');
        return period;
      }
}