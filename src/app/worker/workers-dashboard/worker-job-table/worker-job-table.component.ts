import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { stagger40ms } from '../../../../@vex/animations/stagger.animation';
import { AuthService } from 'src/app/services/auth.service';
import { Timesheet } from 'src/app/models/timesheet.model';
@Component({
  selector: 'vex-worker-job-table',
  templateUrl: './worker-job-table.component.html',
  styleUrls: ['./worker-job-table.component.scss'],
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
export class WorkerJobTableComponent implements OnInit {

  @Input()
  columns: TableColumn<Timesheet>[] = [
    { label: 'Role', property: 'workers.role', type: 'text', visible: true },
    { label: 'Client Name', property: 'clientId', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Shift Date', property: 'shiftDate', type: 'text', visible: true },
    { label: 'Start Time', property: 'workers.startTime', type: 'text', visible: true },
    { label: 'End Time', property: 'workers.endTime', type: 'text', visible: true },
    { label: 'Status', property: 'statusStr', type: 'text', visible: true },
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<Timesheet> | null;
  selection = new SelectionModel<Timesheet>(true, []);

  // statuss = statusTableLabels;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private authService: AuthService) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit() {
    if(!this.authService.workerJobInfo){
      this.authService.setCurrentWorkerJob();
    }

    this.dataSource = new MatTableDataSource();

    this.dataSource.data = this.authService.workerJobInfo;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
