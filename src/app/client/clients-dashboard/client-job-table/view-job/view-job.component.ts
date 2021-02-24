import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fadeInUp400ms } from '../../../../../@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '../../../../../@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from '../../../../../@vex/animations/scale-in.animation';
import { stagger40ms } from '../../../../../@vex/animations/stagger.animation';
import icTime from '@iconify/icons-ic/src/baseline-access-time';
import icAccessTime from '@iconify/icons-ic/twotone-access-time';
import icBuilding from '@iconify/icons-fa-solid/src/building';
import icTask from '@iconify/icons-fa-solid/src/tasks';
import icCount from '@iconify/icons-ic/src/twotone-countertops';
import icLocation from '@iconify/icons-ic/my-location';
import icDate from '@iconify/icons-ic/date-range';
import icInfo from '@iconify/icons-ic/info';
import icOrder from '@iconify/icons-fa-brands/first-order';
import icComment from '@iconify/icons-fa-solid/comment';

@Component({
  selector: 'vex-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.scss'],
  animations: [
    fadeInUp400ms,
    fadeInRight400ms,
    scaleIn400ms,
    stagger40ms
  ]
})
export class ViewJobComponent implements OnInit {
  viewjobData;
  icTime = icTime;
  icAccessTime = icAccessTime;
  icBuilding = icBuilding;
  icTask = icTask;
  icLocation = icLocation;
  icDate = icDate;
  icInfo = icInfo;
  icOrder = icOrder;
  icComment = icComment;
  icCount = icCount;

  constructor(@Inject(MAT_DIALOG_DATA) public jobData: any,
    private dialogRef: MatDialogRef<ViewJobComponent>
    ) {

  }

  ngOnInit() {
    this.viewjobData = JSON.parse(JSON.stringify(this.jobData))
    console.log('viewjobData', this.viewjobData)
  }

}
