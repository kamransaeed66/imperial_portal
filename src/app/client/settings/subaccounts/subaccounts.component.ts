import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Customer } from './interfaces/customer.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { aioTableData, aioTableLabels, clientStatusLabels } from '../../../../static-data/aio-table-data';
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
import { Client } from 'src/app/models/client.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@UntilDestroy()
@Component({
  selector: 'vex-subaccounts',
  templateUrl: './subaccounts.component.html',
  styleUrls: ['./subaccounts.component.scss'],
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
export class SubaccountsComponent implements OnInit, AfterViewInit {

  layoutCtrl = new FormControl('boxed');

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Client[]> = new ReplaySubject<Client[]>(1);
  data$: Observable<Client[]> = this.subject$.asObservable();
  customers: Client[];

  @Input()
  columns: TableColumn<Client>[] = [
    { label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true },
    { label: 'Name', property: 'name', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'First Name', property: 'firstName', type: 'text', visible: false },
    { label: 'Last Name', property: 'lastName', type: 'text', visible: false },
    { label: 'Email', property: 'emailAddress', type: 'text', visible: true },
    { label: 'Phone Number', property: 'phoneNumber', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Department', property: 'department', type: 'text', visible: false, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Account Type', property: 'clientType', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Status', property: 'clientStatus', type: 'button', visible: true },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<Client> | null;
  selection = new SelectionModel<Client>(true, []);
  searchCtrl = new FormControl();

  labels = clientStatusLabels;

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
    private authService:AuthService,
    private router:Router) {
      if(!this.authService.currenctUser)
         this.authService.setCurrentUser();
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
    this.authService.getTypeSubUsers(this.currentUser._id).subscribe((clients)=>{
      of(clients.map(client =>new Client(client))).subscribe(clientes =>{
        console.log('123213123')
        console.log(clientes)
        this.subject$.next(clientes)
      });
    })// return of(aioTableData.map(customer => new Client(customer)));
  }

  ngOnInit() {
    if(!this.authService.currenctUser)
    this.authService.setCurrentUser();
    this.currentUser = this.authService.currenctUser;
    // if(this.currentUser.clientType != 'Master Admin')
    //   {
    //     alert("You can't access into the this page ");
    //     this.router.navigate(['/client/companydetails']);
    //   }
    this.getData();
    // this.getData().subscribe(customers => {
    //   this.subject$.next(customers);
    // });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter<Client[]>(Boolean)
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
    this.dialog.open(CustomerCreateUpdateComponent).afterClosed().subscribe((customer: Client) => {
      /**
       * Client is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (customer) {
        customer.parentId = this.currentUser._id;
        this.authService.register(customer, 'Client').subscribe((res)=>{
          console.log('new created client')
          this.authService.openSnackbar('New Sub Client Added!');
        })
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.customers.unshift(new Client(customer));
        this.subject$.next(this.customers);
      }
    });
  }

  updateCustomer(customer: Client) {
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
        updatedCustomer.parentId = this.currentUser._id;
        this.authService.updateUser(updatedCustomer).subscribe((res)=>{
          this.authService.openSnackbar('Updated Successfully!')
        })
        const index = this.customers.findIndex((existingCustomer) => existingCustomer.id === updatedCustomer.id);
        this.customers[index] = new Client(updatedCustomer);
        this.subject$.next(this.customers);
      }
    });
  }

  deleteCustomer(customer: Client) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    this.customers.splice(this.customers.findIndex((existingCustomer) => existingCustomer.id === customer.id), 1);
    this.selection.deselect(customer);
    this.subject$.next(this.customers);
  }
  transferMasterAdmin(custer:Client){

  }
  deleteCustomers(customers: Client[]) {
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

  // onLabelChange(change: MatSelectChange, row: Client) {
  //   const index = this.customers.findIndex(c => c === row);
  //   this.customers[index].labels = change.value;
  //   this.subject$.next(this.customers);
  // }
}
