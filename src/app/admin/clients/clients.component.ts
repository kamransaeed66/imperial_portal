import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
// import { client } from './interfaces/client.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { TableColumn } from '../../../@vex/interfaces/table-column.interface';
import { aioTableData, aioTableLabels } from '../../../static-data/aio-table-data';
import { ClientCreateUpdateComponent } from './client-create-update/client-create-update.component';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icTimes from '@iconify/icons-fa-solid/times';
import icCheck from '@iconify/icons-fa-solid/check';
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
import { Client } from 'src/app/models/client.model';
import { AuthService } from 'src/app/services/auth.service';


@UntilDestroy()
@Component({
  selector: 'vex-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
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
export class ClientsComponent implements OnInit, AfterViewInit {

  layoutCtrl = new FormControl('boxed');

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Client[]> = new ReplaySubject<Client[]>(1);
  data$: Observable<Client[]> = this.subject$.asObservable();
  clients: Client[];

  @Input()
  columns: TableColumn<Client>[] = [
    { label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true },
    { label: 'Client ID', property: 'id', type: 'text', visible: true },
    // { label: 'Image', property: 'profilePhoto', type: 'image', visible: true },
    { label: 'Company Name', property: 'companyName', type: 'text', visible: true },
    { label: 'Point of Contact', property: 'name', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Email Address', property: 'emailAddress', type: 'text', visible: true },
    { label: 'First Name', property: 'firstName', type: 'text', visible: false },
    { label: 'Last Name', property: 'lastName', type: 'text', visible: false },
    { label: 'Company Address', property: 'companyAddress', type: 'text', visible: true },
    { label: 'Phone Number', property: 'companyPhoneNumber', type: 'text', visible: true },
    { label: 'Email Address AccountsTeam', property: 'emailAddressAccountsTeam', type: 'text', visible: false },
    { label: 'VATNumber', property: 'VATNumber', type: 'text', visible: false },
    { label: 'CompanyRegNumber', property: 'companyRegNumber', type: 'text', visible: false },
    { label: 'Position', property: 'position', type: 'text', visible: false },
    { label: 'Actions', property: 'actions', type: 'button', visible: true },
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<Client> | null;
  selection = new SelectionModel<Client>(true, []);
  searchCtrl = new FormControl();

  labels = aioTableLabels;

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
    this.authService.getTypeUsers('Client').subscribe((clients) => {
      of(clients.map(client => new Client(client))).subscribe(clientes => {
        console.log('--clientsComp--', clientes);
        this.subject$.next(clientes);
      });
    });
    // return of(aioTableData.map(client => new Client(client)));
  }

  ngOnInit() {
    this.getData();

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter<Client[]>(Boolean)
    ).subscribe(clients => {
      this.clients = clients;
      this.dataSource.data = clients;
    });

    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createClient() {
    this.dialog.open(ClientCreateUpdateComponent).afterClosed().subscribe((client: Client) => {
      /**
       * Client is the updated client (if the user pressed Save - otherwise it's null)
       */
      if (client) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.authService.register(client, 'Client').subscribe((res) => {
          console.log('new created client');
          this.authService.openSnackbar('New Client Added!');
        });
        this.clients.unshift(new Client(client));
        this.subject$.next(this.clients);
      }
    });
  }

  updateClient(client: Client, updateType) {
    console.log('client', client);
    client['updateType'] = updateType;
    this.dialog.open(ClientCreateUpdateComponent, {
      data: client
    }).afterClosed().subscribe(updatedClient => {
      /**
       * Client is the updated client (if the user pressed Save - otherwise it's null)
       */
      if (updatedClient) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        console.log('********');
        console.log(updatedClient);
        this.authService.updateUser(updatedClient).subscribe((res => {
            this.authService.openSnackbar('Updated Successfully!');
        }));
        const index = this.clients.findIndex((existingClient) => existingClient.id === updatedClient.id);
        this.clients[index] = new Client(updatedClient);
        this.subject$.next(this.clients);
      }
    });
  }

  deleteClient(client: Client) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
      this.authService.deleteUser(client, 'Client').subscribe((res => {
      this.authService.openSnackbar('Removed Successfully!');
  }));
      this.clients.splice(this.clients.findIndex((existingClient) => existingClient.id === client.id), 1);
      this.selection.deselect(client);
      this.subject$.next(this.clients);
  }

  statusUpdate(client: Client, status) {
    this.authService.updateClientStatus(client, status).subscribe((res => {
      this.authService.openSnackbar('Client Status Updated Successfully!');
    }));
    const index = this.clients.findIndex((existingClient) => existingClient.id === client.id);
    this.clients[index] = new Client(client);
    this.subject$.next(this.clients);
  }

  deleteClients(clients: Client[]) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    clients.forEach(c => {
      this.authService.deleteUser(c, 'Client').subscribe((res) => {
        console.log(res);
        // this.authService.openSnackbar('Removed Successfully!')
    }); });
        // this.authService.openSnackbar('Removed Successfully!')

    clients.forEach(c => this.deleteClient(c));
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

  onLabelChange(change: MatSelectChange, row: Client) {
    const index = this.clients.findIndex(c => c === row);
    // this.clients[index].labels = change.value;
    this.subject$.next(this.clients);
  }

}
