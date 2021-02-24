import { formatDate } from '@angular/common';

export class Invoice {
  _id: string;
  invoiceId:string;
  timesheetId:any;
  timesheetId_id:any;
  invoiceDate:Date;
  invoiceDateStr:string;
  invoiceDueDate:Date;
  invoiceDueDateStr:string;
  client_Id: any;
  workers:[
    {
      workerId: any;
      client_Id: any;
      hours:number;
      chargeRate:number;
      net:number;
    }
  ];
  totalNet:number;
  totalVat:number;
  constructor(client) {
    this._id = client._id;
    this.invoiceId = client.invoiceId;
    this.timesheetId = client.timesheetId;
    this.invoiceDate = client.invoiceDate;
    this.invoiceDateStr = formatDate(client.invoiceDate, 'yyyy-MM-dd', 'en').toString();
    this.invoiceDueDate= client.invoiceDueDate;
    this.invoiceDueDateStr= formatDate(client.invoiceDueDate, 'yyyy-MM-dd', 'en').toString();

    this.client_Id = client.client_Id;
    this.workers = client.workers;
    this.totalNet= client.totalNet;
    this.totalVat= client.totalVat;
  }
  get name() {
    let clientname = '';

    if (this.client_Id && this.client_Id.firstName && this.client_Id.lastName) {
      clientname = this.client_Id.firstName + ' ' + this.client_Id.lastName;
    } else if (this.client_Id.firstName) {
      clientname = this.client_Id.firstName;
    } else if (this.client_Id.lastName) {
      clientname = this.client_Id.lastName;
    }

    return clientname;
  }
}