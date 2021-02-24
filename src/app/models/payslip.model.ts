import { formatDate } from '@angular/common';
import moment from 'moment';

export class Payslip {
  _id: string;
  payslipID: string;
  workerId: string;
  id:number;
  TAX:number;
  NI_EES:number;
  GROSS_TO_DATE:number;
  TAX_TO_DATE:number;
  NI_TO_DATE:number;
  TOTAL_DEDUCTIONS:number;
  NET_PAY:number;
  NI_CODE:string;
  PAY_DATE:Date;
  PAY_DATE_Str:string;
  WEEK_NO:number;
  TAX_CODE:string;
  WK1M1:string;
  NI_NUMBER:string;
  STUDENT_LOAN:number;
  PENSION:number;
  periodStart:Date;
  periodEnd:Date;
  work:{
    client_Id:any,
    workerId: any,
    hours:number,
    chargeRate:number,
    payRate:number,
    net:number
  }
  constructor(payslip) {
    this._id = payslip._id;
    this.workerId = payslip.workerId;
    this.payslipID = payslip.payslipID;
    this.TAX = payslip.TAX;
    this.NI_EES = payslip.NI_EES;
    this.GROSS_TO_DATE = payslip.GROSS_TO_DATE;
    this.TAX_TO_DATE = payslip.TAX_TO_DATE;
    this.NI_TO_DATE = payslip.NI_TO_DATE;
    this.TOTAL_DEDUCTIONS = payslip.TOTAL_DEDUCTIONS;
    this.NET_PAY = payslip.NET_PAY;
    this.NI_CODE = payslip.NI_CODE;
    this.PAY_DATE = moment(payslip.PAY_DATE, "DD/M/YYYY").toDate();
    this.PAY_DATE_Str = payslip.PAY_DATE
    this.WEEK_NO = payslip.WEEK_NO;
    this.TAX_CODE = payslip.TAX_CODE;
    this.WK1M1 = payslip.WK1M1;
    this.NI_NUMBER = payslip.NI_NUMBER;
    this.STUDENT_LOAN = payslip.STUDENT_LOAN;
    this.PENSION = payslip.PENSION;
    this.periodStart = payslip.periodStart;
    this.periodEnd = payslip.periodEnd;
    this.work = payslip.work
  }

  get period(){
    let period = '';
    if(this.periodStart != undefined)
      period = formatDate(this.periodStart, 'dd MMM,yyyy','en') + ' - '+ formatDate(this.periodEnd, 'dd MMM,yyyy','en');
    return period;
  }
}