import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import icGroup from '@iconify/icons-ic/twotone-group';
import icPageView from '@iconify/icons-ic/twotone-pageview';
import icCloudOff from '@iconify/icons-ic/twotone-cloud-off';
import icTimer from '@iconify/icons-ic/twotone-timer';
import icPersonOutline from '@iconify/icons-ic/twotone-person-outline';
import icContacts from '@iconify/icons-ic/twotone-contacts';
import icAssigment from '@iconify/icons-ic/twotone-assignment';
import { defaultChartOptions } from '../../../@vex/utils/default-chart-options';
import { Order, tableSalesData } from '../../../static-data/table-sales-data';
import { TableColumn } from '../../../@vex/interfaces/table-column.interface';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import { AuthService } from 'src/app/services/auth.service';
import icBook from '@iconify/icons-ic/twotone-book';
import icStar from '@iconify/icons-ic/twotone-star';
import icContactSupport from '@iconify/icons-ic/twotone-contact-support';
import icBubbleChart from '@iconify/icons-ic/twotone-bubble-chart';
import icReceipt from '@iconify/icons-ic/twotone-receipt';

@Component({
  selector: 'vex-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  clientJob: any;
  totalJobs: number;
  requestTime: number;
  icAssigment = icAssigment;
  icContacts = icContacts;
  icPersonOutline = icPersonOutline;
  icGroup = icGroup;
  icReceipt = icReceipt;
  icContactSupport = icContactSupport;
  icStar = icStar;
  icPageView = icPageView;
  icCloudOff = icCloudOff;
  icTimer = icTimer;
  icMoreVert = icMoreVert;
  icBook = icBook;
  icBubbleChart = icBubbleChart;
  AllJob: any;
  AllUsers: any;
  totalStaff = 0;
  pendingClient = 0;
  pendingWorker = 0;
  totalClient = 0;
  reviewTimesheets = 0;
  constructor(private cd: ChangeDetectorRef,
              private authService: AuthService) { }

  async ngOnInit() {
      await this.authService.getAllUserAuth();
      await this.authService.getAllJobAuth();
      this.authService.getTimesheets('Timesheet Submitted').subscribe((res) => {
        this.reviewTimesheets = res.length;
      });
    // if(!this.authService.AllJob)
    //   this.authService.setAllJob();
    // if(!this.authService.AllUser)
    //   this.authService.setAllUser();
      this.AllJob = this.authService.AllJob;
      console.log('--admin AllJob--', this.AllJob);
      this.AllUsers = this.authService.AllUser;
      const temp = this.AllUsers;
      this.totalStaff = temp.filter((obj) => obj.accountType === 'Worker').length;
      this.pendingWorker =  temp.filter((obj) => obj.accountType === 'Worker' && obj.clientStatus === 'Pending').length;
      this.pendingClient =  temp.filter((obj) => obj.accountType === 'Client' && obj.clientStatus === 'Pending').length;
      this.totalClient = this.AllUsers.length - this.totalStaff - 2;
    // console.log('____________')
    // console.log(this.clientJob)
    // this.totalJobs =  this.clientJob.filter((obj) => obj.statusStr == 'Completed').length;
    // this.clientJob = this.authService.clientJob;
    // this.requestTime = 0;
    // console.log('____________+++=')
    // console.log(this.clientJob)
    // console.log(this.requestTime)
    // console.log(this.totalJobs)
    // this.clientJob.filter((obj) => {this.requestTime += parseInt(obj.endTime) - parseInt(obj.startTime)}).length;
    // this.clientJob = this.authService.clientJob;

  }

}
