import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableColumn } from '../../../@vex/interfaces/table-column.interface';
import { aioTableLabels } from '../../../static-data/aio-table-data';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import { SelectionModel } from '@angular/cdk/collections';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icFolder from '@iconify/icons-ic/twotone-folder';
import { fadeInUp400ms } from '../../../@vex/animations/fade-in-up.animation';
import { stagger40ms } from '../../../@vex/animations/stagger.animation';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatSelectChange } from '@angular/material/select';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icMail from '@iconify/icons-ic/twotone-mail';
import icMap from '@iconify/icons-ic/twotone-map';
import { Invoice } from 'src/app/models/invoice.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import icPrint from '@iconify/icons-ic/twotone-print';


@UntilDestroy()
@Component({
  selector: 'vex-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ],
})
export class InvoicesComponent implements OnInit, AfterViewInit {

  layoutCtrl = new FormControl('boxed');
  icPrint = icPrint;
  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Invoice[]> = new ReplaySubject<Invoice[]>(1);
  data$: Observable<Invoice[]> = this.subject$.asObservable();
  customers: Invoice[];

  @Input()
  columns: TableColumn<Invoice>[] = [
    { label: 'Invoice ID', property: 'invoiceId', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Timesheet ID', property: 'timesheetId', type: 'text', visible: true },
    { label: 'Client Name', property: 'name', type: 'text', visible: false },
    { label: 'Invoice Date', property: 'invoiceDate', type: 'text', visible: true },
    { label: 'Invoice Due Date', property: 'invoiceDueDate', type: 'text', visible: true },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<Invoice> | null;
  selection = new SelectionModel<Invoice>(true, []);
  searchCtrl = new FormControl();

  labels = aioTableLabels;

  icPhone = icPhone;
  icMail = icMail;
  icMap = icMap;
  icEdit = icEdit;
  icSearch = icSearch;
  icDelete = icDelete;
  icAdd = icAdd;
  icFilterList = icFilterList;
  icMoreHoriz = icMoreHoriz;
  icFolder = icFolder;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private authService:AuthService,
    private route:Router) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getData() {
    this.authService.getClientInvoices().subscribe((clients)=>{
      of(clients.map(client =>new Invoice(client))).subscribe(clientes =>{
        console.log('ClientInvoices', clientes)
        this.subject$.next(clientes)
      });
    })
  }

  ngOnInit() {
    this.getData();

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter<Invoice[]>(Boolean)
    ).subscribe(customers => {
      this.customers = customers;
      this.dataSource.data = customers;
    });

    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  pdfCustomer(user:Invoice){
    this.route.navigate(['/client/invoices/pdf',user.invoiceId]);
  }
}
