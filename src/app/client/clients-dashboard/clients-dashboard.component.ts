import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import icGroup from '@iconify/icons-ic/twotone-group';
import icPageView from '@iconify/icons-ic/twotone-pageview';
import icCloudOff from '@iconify/icons-ic/twotone-cloud-off';
import icTimer from '@iconify/icons-ic/twotone-timer';
import { defaultChartOptions } from '../../../@vex/utils/default-chart-options';
import { Order, tableSalesData } from '../../../static-data/table-sales-data';
import { TableColumn } from '../../../@vex/interfaces/table-column.interface';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import { AuthService } from 'src/app/services/auth.service';
import moment from 'moment';
import icReceipt from '@iconify/icons-ic/twotone-receipt';

@Component({
  selector: 'vex-clients-dashboard',
  templateUrl: './clients-dashboard.component.html',
  styleUrls: ['./clients-dashboard.component.scss']
})
export class ClientsDashboardComponent implements OnInit {
  clientJob: any;
  totalJobs = 0;
  requestTime = 0;
  reviewTimesheets = 0;

  icGroup = icGroup;
  icPageView = icPageView;
  icCloudOff = icCloudOff;
  icTimer = icTimer;
  icMoreVert = icMoreVert;
  icReceipt = icReceipt;
  constructor(private cd: ChangeDetectorRef,
              private authService: AuthService) { }

  async ngOnInit() {
    await this.authService.getAuthClientJob();
    this.authService.getTimesheets('In Progress').subscribe((res) => {
      this.reviewTimesheets = res.length;
    });
    this.clientJob = this.authService.clientJob;
    console.log('--client AllJob--', this.clientJob);
    // this.clientJob = this.authService.clientJob;
    // this.totalJobs =  this.clientJob.filter((obj) => obj.statusStr == 'Completed').length;
    this.totalJobs =  this.clientJob.length;
    this.requestTime = 0;
    // this.clientJob.filter((obj) => {
    //   this.requestTime += parseInt(obj.endTime) - parseInt(obj.startTime); }).length;
    this.clientJob.forEach(element => {
      const now = moment();
      const input = moment(element.shiftDate);
      if (now.isoWeek() === input.isoWeek()){
        element.shifts.forEach(ele => {
          // tslint:disable-next-line: radix
          this.requestTime += parseInt(ele.endTime) - parseInt(ele.startTime);
        });
      }
    });
    console.log('requestTime', this.requestTime);
  }

}
