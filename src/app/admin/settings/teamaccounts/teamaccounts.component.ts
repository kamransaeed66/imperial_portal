import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { UserCreateUpdateComponent } from './user-create-update/user-create-update.component';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { stagger40ms } from '../../../../@vex/animations/stagger.animation';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatSelectChange } from '@angular/material/select';
import { Client } from 'src/app/models/client.model';
import { AuthService } from 'src/app/services/auth.service';


@UntilDestroy()
@Component({
  selector: 'vex-teamaccounts',
  templateUrl: './teamaccounts.component.html',
  styleUrls: ['./teamaccounts.component.scss'],
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
export class TeamAccountsComponent implements OnInit, AfterViewInit {
  layoutCtrl = new FormControl('boxed');
  subject$: ReplaySubject<Client[]> = new ReplaySubject<Client[]>(1);
  data$: Observable<Client[]> = this.subject$.asObservable();
  clients: Client[];

  @Input()
  columns: TableColumn<Client>[] = [
    { label: 'First Name', property: 'firstName', type: 'text', visible: true },
    { label: 'Last Name', property: 'lastName', type: 'text', visible: true },
    { label: 'Email Address', property: 'emailAddress', type: 'text', visible: true },
    { label: 'Phone Number', property: 'phoneNumber', type: 'text', visible: true },
    { label: 'Actions', property: 'actions', type: 'button', visible: true },
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<Client> | null;
  searchCtrl = new FormControl();
  icEdit = icEdit;
  icSearch = icSearch;
  icDelete = icDelete;
  icAdd = icAdd;
  icFilterList = icFilterList;
  icMoreHoriz = icMoreHoriz;
  AllUsers: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog,
              private authService: AuthService) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  getData() {
    this.authService.getTypeUsers('Team').subscribe((clients) => {
      of(clients.map(client => new Client(client))).subscribe(clientes => {
        console.log('--clientsComp--', clientes);
        this.subject$.next(clientes);
      });
    });
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

  createUser() {
    this.dialog.open(UserCreateUpdateComponent).afterClosed().subscribe((client: Client) => {
      /**
       * Client is the updated client (if the user pressed Save - otherwise it's null)
       */
      if (client) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.authService.register(client, 'Team').subscribe((res) => {
          console.log('new created User');
          this.authService.openSnackbar('New User Added!');
        });
        this.clients.unshift(new Client(client));
        this.subject$.next(this.clients);
      }
    });
  }

  updateUser(client: Client) {
    console.log('client', client);
    this.dialog.open(UserCreateUpdateComponent, {
      data: client
    }).afterClosed().subscribe(updatedClient => {

      if (updatedClient) {
        console.log('********');
        console.log('updatedClient',updatedClient);
        this.authService.updateUser(updatedClient).subscribe((res => {
            this.authService.openSnackbar('Updated Successfully!');
        }));
        const index = this.clients.findIndex((existingClient) => existingClient.id === updatedClient.id);
        this.clients[index] = new Client(updatedClient);
        this.subject$.next(this.clients);
      }
    });
  }

  deleteUser(client: Client) {

      this.authService.deleteUser(client, 'Client').subscribe((res => {
        this.authService.openSnackbar('Removed Successfully!');
      }));
      this.clients.splice(this.clients.findIndex((existingClient) => existingClient.id === client.id), 1);
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

  onLabelChange(change: MatSelectChange, row: Client) {
    const index = this.clients.findIndex(c => c === row);
    // this.clients[index].labels = change.value;
    this.subject$.next(this.clients);
  }

}
