import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { aioTableData, aioTableLabels } from '../../../../static-data/aio-table-data';
import { CustomerCreateUpdateComponent } from './customer-create-update/customer-create-update.component';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import { SelectionModel } from '@angular/cdk/collections';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icFolder from '@iconify/icons-ic/twotone-folder';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { stagger40ms } from '../../../../@vex/animations/stagger.animation';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatSelectChange } from '@angular/material/select';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icMail from '@iconify/icons-ic/twotone-mail';
import icMap from '@iconify/icons-ic/twotone-map';
import { Customer } from 'src/app/pages/apps/aio-table/interfaces/customer.model';
import { statusTableLabels, statusTableData } from 'src/static-data/status-table-data';
import { Job } from './interfaces/job.model';
import { AuthService } from 'src/app/services/auth.service';
import { ViewJobComponent } from './view-job/view-job.component';
@Component({
  selector: 'vex-client-job-table',
  templateUrl: './client-job-table.component.html',
  styleUrls: ['./client-job-table.component.scss'],
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
export class ClientJobTableComponent implements OnInit {

  layoutCtrl = new FormControl('boxed');

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Job[]> = new ReplaySubject<Job[]>(1);
  data$: Observable<Job[]> = this.subject$.asObservable();
  customers: Job[];

  @Input()
  columns: TableColumn<Job>[] = [
    { label: 'Job ID', property: 'JobId', type: 'text', visible: true },
    { label: 'Department', property: 'department', type: 'text', visible: false },
    { label: 'Shift Date', property: 'shiftDate', type: 'text', visible: true },
    { label: 'Total Staff', property: 'totalStaff', type: 'text', visible: true},
    { label: 'Status', property: 'status', type: 'button', visible: true },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<Job> | null;
  selection = new SelectionModel<Job>(true, []);
  // searchCtrl = new FormControl();

  statuss = statusTableLabels;

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
    const current = JSON.parse(localStorage.getItem('userInfo'));
    console.log('--current client--', current);
    this.authService.getClientJobSync(current).subscribe((clients) => {
      of(clients.map(client => new Job(client))).subscribe(clientes => {
        console.log('job', clientes);
        this.subject$.next(clientes);
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
      filter<Job[]>(Boolean)
    ).subscribe(customers => {
      this.customers = customers;
      this.dataSource.data = customers;
    });

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
        this.authService.addJob(customer, customer.clientId).subscribe((res) => {
          customer[''];
          this.customers.unshift(new Job(res));
          this.subject$.next(this.customers);
          this.authService.openSnackbar('New Job Added!');
        });
      }
    });
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  viewJob(data: Job){
    this.dialog.open(ViewJobComponent, {
      data: data
    });
  }

}
