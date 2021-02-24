import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { TableColumn } from '../../../@vex/interfaces/table-column.interface';
import { CustomerCreateUpdateComponent } from './customer-create-update/customer-create-update.component';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import icTimes from '@iconify/icons-fa-solid/times';
import icCheck from '@iconify/icons-fa-solid/check';
import icStop from '@iconify/icons-ic/twotone-stop-circle';
import icInfo from '@iconify/icons-fa-solid/info-circle';
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
import { Worker } from 'src/app/models/worker.model';
import { AuthService } from 'src/app/services/auth.service';
import {  Router } from '@angular/router';


@UntilDestroy()
@Component({
  selector: 'vex-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss'],
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
export class WorkersComponent implements OnInit, AfterViewInit {

  layoutCtrl = new FormControl('boxed');

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Worker[]> = new ReplaySubject<Worker[]>(1);
  data$: Observable<Worker[]> = this.subject$.asObservable();
  customers: Worker[];

  @Input()
  columns: TableColumn<Worker>[] = [
    { label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: false },
    { label: 'Profile Photo', property: 'profilePhoto', type: 'image', visible: true },
    { label: 'Worker ID', property: 'workerId', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'WORKER NAME', property: 'name', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Worker Email Address', property: 'emailAddress', type: 'text', visible: true },
    { label: 'Phone Number', property: 'mobileNumber', type: 'text', visible: true },
    { label: 'Date Joined', property: 'createdDate', type: 'text', visible: true },
    { label: 'Status', property: 'clientStatus', type: 'text', visible: true },
    // { label: 'Labels', property: 'labels', type: 'button', visible: true },
    { label: 'Actions', property: 'actions', type: 'button', visible: true },
    { label: 'ID', property: '_id', type: 'text', visible: false }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<Worker> | null;
  selection = new SelectionModel<Worker>(true, []);
  searchCtrl = new FormControl();

  // labels = aioTableLabels;

  icTimes = icTimes;
  icCheck = icCheck;
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
  icStop = icStop;
  icInfo = icInfo;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog,
              private authService: AuthService,
              private router: Router) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getData() {
    this.authService.getTypeUsers('Worker').subscribe((clients) => {
      of(clients.map(client => new Worker(client))).subscribe(clientes => {
        console.log('--Worker--', clientes);
        this.subject$.next(clientes);
      });
    });
    // return of(aioTableData.map(customer => new Customer(customer)));
  }

  ngOnInit() {
    this.getData();

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter<Worker[]>(Boolean)
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
    this.dialog.open(CustomerCreateUpdateComponent, {width: '700px'}).afterClosed().subscribe((customer: Worker) => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (customer) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.authService.register(customer, 'Worker').subscribe((res) => {
          if(res)
          {
            console.log('new created client');
            this.authService.openSnackbar('New Worker Added!');
            this.customers.unshift(new Worker(res));
            this.subject$.next(this.customers);
          }
          else{
            console.log('worker error', res.status);
          }
        });
      }
    });
  }

  updateCustomer(customer: Worker) {
    // this.dialog.open(CustomerCreateUpdateComponent, {
    //   data: customer
    // }).afterClosed().subscribe(updatedCustomer => {
    //   if (updatedCustomer) {
    //     console.log('********')
    //     console.log(updatedCustomer)
    //     this.authService.updateUser(updatedCustomer).subscribe((res =>{
    //         this.authService.openSnackbar('Updated Successfully!')
    //     }))
    //     const index = this.customers.findIndex((existingCustomer) => existingCustomer.id === updatedCustomer.id);
    //     this.customers[index] = new Worker(updatedCustomer);
    //     this.subject$.next(this.customers);
    //   }
    // });
    localStorage.setItem('editCustomer', JSON.stringify(customer));
    if(localStorage.getItem('loggedIn') === 'Admin')
      this.router.navigate(['/admin/workers/edit']);
    else
      this.router.navigate(['/team/workers/edit']);

  }

  deleteCustomer(customer: Worker) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    this.authService.deleteUser(customer, 'Worker').subscribe((res => {
      this.authService.openSnackbar('Removed Successfully!');
  }));
    this.customers.splice(this.customers.findIndex((existingCustomer) => existingCustomer._id === customer._id), 1);
    this.selection.deselect(customer);
    this.subject$.next(this.customers);
  }

  statusUpdate(client: Worker, status) {
    this.authService.updateClientStatus(client, status).subscribe((res => {
      this.authService.openSnackbar('Worker Status Updated Successfully!');
    }));
    const index = this.customers.findIndex((existingClient) => existingClient.id === client.id);
    this.customers[index] = new Worker(client);
    this.subject$.next(this.customers);
  }

  deleteCustomers(customers: Worker[]) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    customers.forEach(c => {
      this.authService.deleteUser(c, 'Worker').subscribe((res) => {
        console.log(res);
        // this.authService.openSnackbar('Removed Successfully!')
    });});
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
}
