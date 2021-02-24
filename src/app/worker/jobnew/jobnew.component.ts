import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Customer } from './interfaces/customer.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { TableColumn } from '../../../@vex/interfaces/table-column.interface';
import { aioTableData, aioTableLabels } from '../../../static-data/aio-table-data';
import { CustomerCreateUpdateComponent } from './customer-create-update/customer-create-update.component';
import icEdit from '@iconify/icons-ic/twotone-edit';
import baselineDone from '@iconify/icons-ic/baseline-done';
import baselineClose from '@iconify/icons-ic/baseline-close';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import { SelectionModel } from '@angular/cdk/collections';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icFolder from '@iconify/icons-ic/twotone-folder';
import { fadeInUp400ms } from '../../../@vex/animations/fade-in-up.animation';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
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
import { Job } from 'src/app/client/clients-dashboard/client-job-table/interfaces/job.model';


@UntilDestroy()
@Component({
  selector: 'vex-jobnew',
  templateUrl: './jobnew.component.html',
  styleUrls: ['./jobnew.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard'
      } as MatFormFieldDefaultOptions
    }
  ]
})
export class JobnewComponent implements OnInit, AfterViewInit {

  layoutCtrl = new FormControl('boxed');
  icPrint = icPrint;
  baselineDone = baselineDone;
  baselineClose = baselineClose;
  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Job[]> = new ReplaySubject<Job[]>(1);
  data$: Observable<Job[]> = this.subject$.asObservable();
  customers: Job[];

  @Input()
  columns: TableColumn<Job>[] = [
    // { label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true },
    { label: 'Job ID', property: 'JobId', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Client', property: 'client', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Department', property: 'department', type: 'text', visible: true },
    { label: 'Shift Date', property: 'shiftDateStr', type: 'text', visible: false },
    { label: 'Start Time', property: 'startTime', type: 'text', visible: true },
    { label: 'End Time', property: 'endTime', type: 'text', visible: true },
    { label: 'Worker Allocation', property: 'totalStaff', type: 'text', visible: true },
    { label: 'Status', property: 'status', type: 'button', visible: true },
    { label: 'ID', property: '_id', type: 'button', visible: false },
    // { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<Job> | null;
  selection = new SelectionModel<Job>(true, []);
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
  userInfo :any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog,
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
    this.authService.setCurrentUser();
    this.authService.getWorkerJob(this.authService.currenctUser['_id']).subscribe((clients)=>{
      of(clients.map(client =>new Job(client))).subscribe(clientes =>{
        console.log('123213123')  
        console.log(clientes)  
        this.subject$.next(clientes)
      });
    })
  }

  ngOnInit() {
    this.getData();
    // this.getData().subscribe(customers => {
    //   this.subject$.next(customers);
    // });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter<Job[]>(Boolean)
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

  createCustomer() {
    this.dialog.open(CustomerCreateUpdateComponent).afterClosed().subscribe((customer: Job) => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (customer) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.authService.addInvoice(customer).subscribe((res)=>{
          console.log('addInvoice')
          this.authService.openSnackbar('Added Invoice Successfully ');
        })
        this.customers.unshift(new Job(customer));
        this.subject$.next(this.customers);
      }
    });
  }

  updateCustomer(customer: Job) {
    this.dialog.open(CustomerCreateUpdateComponent, {
      data: customer
    }).afterClosed().subscribe(updatedCustomer => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (updatedCustomer) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.authService.updateInvoice(updatedCustomer).subscribe((res)=>{
          console.log('updateInvoice')
          this.authService.openSnackbar('Changed Invoice Successfully ');
        })
        const index = this.customers.findIndex((existingCustomer) => existingCustomer.id === updatedCustomer.id);
        this.customers[index] = new Job(updatedCustomer);
        this.subject$.next(this.customers);
      }
    });
  }

  deleteCustomer(customer: Job) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    this.customers.splice(this.customers.findIndex((existingCustomer) => existingCustomer.id === customer.id), 1);
    this.selection.deselect(customer);
    this.subject$.next(this.customers);
  }

  deleteCustomers(customers: Job[]) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    customers.forEach(c => this.deleteCustomer(c));
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

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  onLabelChange(change: MatSelectChange, row: Job) {
    // const index = this.customers.findIndex(c => c === row);
    // this.customers[index].labels = change.value;
    // this.subject$.next(this.customers);
  }
  // pdfCustomer(user:Job){
  //   this.route.navigate(['/admin/invoices/pdf',user.invoiceId]);
  // }
}
