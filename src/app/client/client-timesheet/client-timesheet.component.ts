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
// import { CustomerCreateUpdateComponent } from './customer-create-update/customer-create-update.component';
import icEdit from '@iconify/icons-ic/twotone-edit';
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
import { Timesheet } from 'src/app/models/timesheet.model';
import { Job } from 'src/app/client/clients-dashboard/client-job-table/interfaces/job.model';
import { AuthService } from 'src/app/services/auth.service';
import { AddTimesheetComponent } from './add-timesheet/add-timesheet.component';
import { statusTableLabels } from 'src/static-data/status-table-data';


@UntilDestroy()
@Component({
  selector: 'vex-client-timesheet',
  templateUrl: './client-timesheet.component.html',
  styleUrls: ['./client-timesheet.component.scss'],
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
export class ClientTimesheetComponent implements OnInit, AfterViewInit {

  layoutCtrl = new FormControl('boxed');

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Timesheet[]> = new ReplaySubject<Timesheet[]>(1);
  data$: Observable<Timesheet[]> = this.subject$.asObservable();
  customers: Timesheet[];

  @Input()
  columns: TableColumn<Timesheet>[] = [
    { label: 'Job ID', property: 'JobId_Id', type: 'text', visible: true },
    { label: 'Departments', property: 'departments', type: 'text', visible: true },
    { label: 'Shift Date', property: 'shiftDate', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Total Staff', property: 'totalStaff', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Status', property: 'status', type: 'button', visible: true },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<Timesheet> | null;
  selection = new SelectionModel<Timesheet>(true, []);
  searchCtrl = new FormControl();
  statuss = statusTableLabels;
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
  currentUser;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog,
              private authService: AuthService) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getData() {
    this.authService.getClientTimesheets().subscribe((clients) => {
      of(clients.map(client => new Timesheet(client))).subscribe(timesheets => {
        console.log('timesheets',timesheets);
        this.subject$.next(timesheets);
      });
    });
  }

  ngOnInit() {
    if (!this.authService.currenctUser) {
    this.authService.setCurrentUser();
    }
    this.currentUser = this.authService.currenctUser;
    this.getData();

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter<Timesheet[]>(Boolean)
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

  // createCustomer() {
  //   this.dialog.open(CustomerCreateUpdateComponent).afterClosed().subscribe((customer: Job) => {
  //     /**
  //      * Customer is the updated customer (if the user pressed Save - otherwise it's null)
  //      */
  //     if (customer) {
  //       /**
  //        * Here we are updating our local array.
  //        * You would probably make an HTTP request here.
  //        */
  //       this.customers.unshift(new Timesheet(customer));
  //       this.subject$.next(this.customers);
  //     }
  //   });
  // }

  // updateCustomer(customer: Timesheet) {
  //   this.dialog.open(CustomerCreateUpdateComponent, {
  //     data: customer
  //   }).afterClosed().subscribe(updatedCustomer => {
  //     /**
  //      * Customer is the updated customer (if the user pressed Save - otherwise it's null)
  //      */
  //     if (updatedCustomer) {
  //       /**
  //        * Here we are updating our local array.
  //        * You would probably make an HTTP request here.
  //        */
  //       const index = this.customers.findIndex((existingCustomer) => existingCustomer.id === updatedCustomer.id);
  //       this.customers[index] = new Timesheet(updatedCustomer);
  //       this.subject$.next(this.customers);
  //     }
  //   });
  // }

  deleteCustomer(customer: Timesheet) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    this.customers.splice(this.customers.findIndex((existingCustomer) => existingCustomer.id === customer.id), 1);
    this.selection.deselect(customer);
    this.subject$.next(this.customers);
  }

  deleteCustomers(customers: Timesheet[]) {
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

  onLabelChange(change: MatSelectChange, row: Timesheet) {
    const index = this.customers.findIndex(c => c === row);
    // this.customers[index].labels = change.value;
    this.subject$.next(this.customers);
  }
  updateStatus(customer: Timesheet , status){
    this.authService.setStatusJob(customer.id, status).subscribe((res) => {
      console.log(res);
      this.authService.openSnackbar('status has updated successfully');
    });
    const index = this.customers.findIndex((existingCustomer) => existingCustomer.id === customer.id);
    customer.setStatus(status);
    this.customers[index] = customer;
    this.subject$.next(this.customers);

  }
  confirmJob(customer: Timesheet){
    console.log('confirmJob', customer);
    // let old_cust = { ...customer};
    // this.authService.timeSheetData.next(old_cust);

    let ordersDialog = this.dialog.open(AddTimesheetComponent, {
      data: customer
    }).afterClosed().subscribe((customer: Timesheet) => {
      console.log('here in confirmJob', customer);
      ordersDialog = null;
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (customer) {
        console.log('inside')

        const index = this.customers.findIndex((existingCustomer) => existingCustomer.id === customer.id);
        customer.setStatus('Timesheet Submitted');
        this.customers[index] = customer;
        this.subject$.next(this.customers);
      }
    });
  }
}
