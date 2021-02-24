import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { TableColumn } from '../../../@vex/interfaces/table-column.interface';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import { fadeInUp400ms } from '../../../@vex/animations/fade-in-up.animation';
import { AuthService } from 'src/app/services/auth.service';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { stagger40ms } from '../../../@vex/animations/stagger.animation';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReplaySubject, Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Payslip } from 'src/app/models/payslip.model';
import { Router } from '@angular/router';

@Component({
  selector: 'vex-payhistory',
  templateUrl: './payhistory.component.html',
  styleUrls: ['./payhistory.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ],
})

export class PayhistoryComponent implements OnInit {

  layoutCtrl = new FormControl('boxed');
  payslipObj:any;
  payslips:any;
  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Payslip[]> = new ReplaySubject<Payslip[]>(1);
  data$: Observable<Payslip[]> = this.subject$.asObservable();
  customers: Payslip[];

  @Input()
  columns: TableColumn<Payslip>[] = [
    { label: 'Pay ID', property: 'payslipID', type: 'text', visible: true },
    { label: 'PAY DATE', property: 'PAY_DATE', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'AMOUNT', property: 'NET_PAY', type: 'text', visible: true },
    { label: 'Period', property: 'period', type: 'text', visible: true },
    { label: 'view', property: 'actions', type: 'button', visible: true },
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<Payslip> | null;
  selection = new SelectionModel<Payslip>(true, []);

  icMoreHoriz = icMoreHoriz;
  currentUser;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private authService: AuthService,
    private route:Router) {
      if (!this.authService.currenctUser) {
      this.authService.setCurrentUser();
      }
      this.currentUser = this.authService.currenctUser;
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getData() {
    this.authService.getPaySlips(this.currentUser._id).subscribe((res) => {
      console.log('Payslips',res)
      of(res.map(client => new Payslip(client))).subscribe(clients => {
        this.payslips = clients;
        console.log('clientes', clients);
        this.subject$.next(clients);
      });
    });
    // return of(statusTableData.map(customer => new Job(customer)));
  }

  ngOnInit() {
    if (!this.authService.currenctUser) {
      this.authService.setCurrentUser();
    }
    this.currentUser = this.authService.currenctUser;
    this.getData();

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter<Payslip[]>(Boolean)
    ).subscribe(customers => {
      this.customers = customers;
      this.dataSource.data = customers;
    });

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  downloadPayslip(payslipid){
    console.log('downloadPayslip', payslipid)
    this.payslipObj = this.payslips.filter((obj)=>obj.payslipID
    == payslipid)[0];
    console.log('payslipObj', this.payslipObj);
    let printContents =
    `<div id="print-section" class="p-gutter container ">
      <div @fadeInUp class="card p-16">
        <div class="clearfix">
          <table class="table-header">
            <thead class="table-header">
              <tr>
                <th>Employee</th>
                <th>Number</th>
                <th colspan="2">Employer</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${this.payslipObj.workerId.surename} ${this.payslipObj.workerId.forename}</td>
                <td>${this.payslipObj.workerId.workerId}</td>
                <td colspan="2">IMPERIAL RECRUITMENT COMPANY LTD</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <table class="inner-table">
            <thead class="table-header">
              <tr>
                <th colspan="2">PAYMENTS</th>
                <th class="desc">DEDUCTIONS</th>
                <th>TO DATE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td class="row2">Value &nbsp;= &nbsp;  Hours &nbsp;X &nbsp; Rate</td>
                <td class="row4">P.A.Y.E. &nbsp; &nbsp; &nbsp; ${this.payslipObj.TAX}</td>
                <td class="to-date">TAXABLE <span> &nbsp; &nbsp; &nbsp; &nbsp; ${this.payslipObj.TAX_TO_DATE}</span></td>
              </tr>
              <tr>
                <td class="name">${this.payslipObj.work.client_Id.companyName}</td>
                <td class="row2">${(this.payslipObj.work.hours * this.payslipObj.work.payRate).toFixed(2)} &nbsp; &nbsp; &nbsp; &nbsp;  ${this.payslipObj.work.hours} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ${this.payslipObj.work.payRate}</td>
                <td></td>
                <td class="to-date">tax &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span>${this.payslipObj.TAX}</span></td>
              </tr>
              <tr>
                <td></td>
                <td class="row2"></td>
                <td class="row3" >Nat.Ins &nbsp; &nbsp; &nbsp; ${this.payslipObj.NI_EES}</td>
                <td class="to-date" >nat.ins <span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ${this.payslipObj.NI_TO_DATE}</span></td>
              </tr>
              <tr>
                <td></td>
                <td class="row2"></td>
                <td class="row4" style="padding-top: 30px; padding-bottom: 30px; ">pension &nbsp;  ${this.payslipObj.PENSION}</td>
                <td class="to-date" ></td>
              </tr>
              <tr>
                <td></td>
                <td class="row2"></td>
                <td></td>
                <td class="to-date"> <span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;N.I. Code ${this.payslipObj.NI_CODE}</span></td>
              </tr>
              <tr>
                <td></td>
                <td class="row2"></td>
                <td></td>
                <td class="to-date"> pay date <span> &nbsp; &nbsp; &nbsp; &nbsp; ${this.payslipObj.PAY_DATE_Str}</span></td>
              </tr>
              <tr>
                <td></td>
                <td class="row2"></td>
                <td></td>
                <td class="to-date">tax period <span> &nbsp; &nbsp; WEEK ${this.payslipObj.WEEK_NO} </span></td>
              </tr>
              <tr>
                <td class="name">Total</td>
                <td class="row2">${(this.payslipObj.work.hours * this.payslipObj.work.payRate).toFixed(2)}</td>
                <td class="name">total &nbsp; &nbsp; ${(this.payslipObj.TAX + this.payslipObj.NI_EES + this.payslipObj.PENSION).toFixed(2)}</td>
                <td class="to-date">tax code <span> &nbsp; &nbsp; &nbsp; ${this.payslipObj.TAX_CODE} WK ${this.payslipObj.WK1M1} </span></td>
              </tr>
              <tr>
                <td></td>
                <td class="row2"></td>
                <td></td>
                <td  class="to-date date-last-col">n.i no <span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;${this.payslipObj.NI_NUMBER} </span></td>
              </tr>
            </tbody>
          </table>
          <div class="Row">
            <div class="Column-1"></div>
            <div class="Column-2"></div>
            <div class="Column-3">
              <div class="button">
                <a>net pay</a>
                ${this.payslipObj.NET_PAY}
              </div>
            </div>
          </div>
          <div class="note">
            please keep this pay advice in a place.it may be required for the purpose of self assessment.
          </div>
        </div>
      </div>
    </div>
    `;

    let popupWin = window.open("", "_blank", "top=0,left=0,height=auto,width=auto");
    popupWin.document.open();
    popupWin.document.write(`<html>
        <head>
          <style>
            @media print {
              @page {size: landscape}

              .card {
                box-shadow: none !important;
              }

              .table-header thead, .inner-table thead{
                background: #000!important;
                -webkit-print-color-adjust: exact;
                color: #fff!important;
              }

              a {
                color: #5D6975!important;
                text-decoration: none!important;
                text-transform: uppercase!important;
                background: #000!important;
                -webkit-print-color-adjust: exact;
                color: #fff!important;
                padding-bottom: 15px!important;
              }
            }
            .table {
              td {
                padding-left: var(--padding);
                padding-right: var(--padding);
              }
            }

            .bt-total{
              border-top: 2px solid #eee;
            }

            .clearfix:after {
              content: "";
              display: table;
              clear: both;
            }
            .table-header{
              border: 2px solid #000;
            }
            .table-header thead{
              background: #000;
              color: #fff;
              text-transform: uppercase;
              font-weight: 600;
              font-size: 14px;
            }
            .table-header th {
              color: #fff;
              background: #000;
              text-transform: uppercase;
              font-size: 11px;
              font-weight: 600;
            }
            .table-header td {
              background: #fff !important;
              border-left: 2px solid #000;
              padding: 10px 0;
              text-transform: uppercase;
              font-weight: 600;
              font-size: 14px;
            }
            table.inner-table {
              border: 2px solid #000;
            }
            .inner-table td{
              border-left: 2px solid #000;
              text-align: left;
              padding-left: 10px;
            }
            .row2{
              border-left: none !important;
              font-weight: 600;
              text-transform: capitalize;
              font-size: 13px;
            }
            .row3{
              font-weight: 600;
              text-transform: capitalize;
              font-size: 13px;
            }
            .row4{
              font-weight: 600;
              text-transform: uppercase;
              font-size: 13px;
            }
            .Row {
              display: flex;
            }
            .Column-1 {
              border: 2px solid #000;
              padding: 50px 0;
              width: 37%;
            }
            .Column-2 {
              border: 2px solid #000;
              margin: 20px 0 20px 20px;
              width: 26%;
            }
              .Column-3 {
              border: 2px solid #000;
              margin: 25px 0 28px 14px;
              width: 31%;
            }
            a {
              color: #5D6975;
              text-decoration: none;
              text-transform: uppercase;
              background: #000;
              color: #fff;
              padding: 17px 5px;
              font-size: 12px;
              font-weight: 600;
            }
            .button {
              margin-top: 14px;
            }
            .to-date span{
              text-transform: capitalize;
              font-weight: 600;
            }
            .to-date{
              text-transform: uppercase;
              font-size: 14px;
            }
            .date-last-col{
              padding: 0 0 20px 0;
            }
            .name{
              text-transform: uppercase;
              font-weight: 600;
            }
            .note {
              text-transform: uppercase;
              text-align: center;
              font-weight: 700;
              font-size: 12px;
            }
            .message .button {
              position: relative;
              top: 30px;
            }
            .message .button a{
              padding: 8px 16px;
            }
            header {
              padding: 10px 0;
              margin-bottom: -16px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              border-spacing: 0;
              margin-bottom: 20px;
            }
            table th,
            table td {
              text-align: center;
            }
            table th {
              padding: 5px 20px;
            }

          </style>
        </head>
        <body>
          `+printContents+`
          <script defer>
            function triggerPrint(event) {
              window.removeEventListener('load', triggerPrint, false);
              setTimeout(function() {
                window.print();
                setTimeout(function() { window.close(); }, 0);
              },0);
            }
            window.addEventListener('load', triggerPrint, false);
          </script>
        </body>
      </html>`);
    popupWin.document.close();
  }



}
