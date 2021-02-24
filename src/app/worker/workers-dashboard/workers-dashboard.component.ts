import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import icGroup from '@iconify/icons-ic/twotone-group';
import icTimer from '@iconify/icons-ic/twotone-timer';
import { AuthService } from 'src/app/services/auth.service';
import moment from 'moment';

@Component({
  selector: 'vex-workers-dashboard',
  templateUrl: './workers-dashboard.component.html',
  styleUrls: ['./workers-dashboard.component.scss']
})
export class WorkersDashboardComponent implements OnInit {
  clientJob: any;

  completedShifts:number;
  totalHours:string;
  tableData = [];
  icGroup = icGroup;
  icTimer = icTimer;
  constructor(private cd: ChangeDetectorRef,
              private authService: AuthService) { }

  ngOnInit() {
    if(!this.authService.workerJobInfo)
      this.authService.setCurrentWorkerJob();
      this.tableData = this.authService.workerJobInfo;
    console.log('workerJobInfo',this.authService.workerJobInfo)
      this.completedShifts = this.tableData.filter((obj) => obj.statusStr == 'Completed').length;
      this.totalHours = '0:00';
      var t_duration = 0;
      console.log('----------------------')
      console.log('Completed', this.completedShifts)
      this.tableData.filter((obj) => {
        if(obj.statusStr == 'Completed' || obj.statusStr == 'Timesheet Submitted'){
          var duration = this.total_hous(obj.workers.hours);
          console.log('mints', duration)
          t_duration += duration;
        }
        this.totalHours = moment().startOf('day').add(t_duration, 'minutes').format('HH:mm');
    })

    console.log('totalHours', this.totalHours)
  }

  total_hous(hour){
    var duration = moment.duration(hour);
    return duration.asMinutes();
  }

}
