import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { ScrumboardList } from './interfaces/scrumboard-list.interface';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ScrumboardCard } from './interfaces/scrumboard-card.interface';
import { trackById } from '../../../../@vex/utils/track-by';
import { scrumboards, scrumboardUsers } from '../../../../static-data/scrumboard';
import icNotifications from '@iconify/icons-ic/twotone-notifications';
import icInsertComment from '@iconify/icons-ic/twotone-insert-comment';
import icAttachFile from '@iconify/icons-ic/twotone-attach-file';
import { MatDialog } from '@angular/material/dialog';
import { ScrumboardDialogComponent } from './components/scrumboard-dialog/scrumboard-dialog.component';
import { filter, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Scrumboard } from './interfaces/scrumboard.interface';
import icAdd from '@iconify/icons-ic/twotone-add';
import { PopoverService } from '../../../../@vex/components/popover/popover.service';
import icClose from '@iconify/icons-ic/twotone-close';
import { FormControl } from '@angular/forms';
import icEdit from '@iconify/icons-ic/twotone-edit';
import { stagger80ms } from '../../../../@vex/animations/stagger.animation';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { AuthService } from 'src/app/services/auth.service';
import { Customer } from 'src/app/pages/apps/aio-table/interfaces/customer.model';
import { CustomerCreateUpdateComponent } from '../../admin-dashboard/admin-job-table/customer-create-update/customer-create-update.component';
import data from '@iconify/icons-ic/twotone-visibility';
import { Subscription } from 'rxjs';

@Component({
  selector: 'vex-admin-job',
  templateUrl: './admin-job.component.html',
  styleUrls: ['./admin-job.component.scss'],
  animations: [
    stagger80ms,
    fadeInUp400ms
  ]
})
export class AdminJobComponent implements OnInit {

  static nextId = 100;
  currentJob = this.authService.currentJob || [];
  currentScrum: any;
  board: any;

  addCardCtrl = new FormControl();
  // addListCtrl = new FormControl();

  trackById = trackById;
  icNotifications = icNotifications;
  icInsertComment = icInsertComment;
  icAttachFile = icAttachFile;
  icAdd = icAdd;
  icClose = icClose;
  icEdit = icEdit;
  fulfilled;
  constructor(private dialog: MatDialog,
              private route: ActivatedRoute,
              private popover: PopoverService,
              private authService: AuthService) {
              }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('scrumboardId');
    if (!this.authService.currentScrumboard){
      let res = await this.authService.getCurrentJob(id);
      console.log('res', res);
      this.currentJob['client'] = res;
      console.log('this.currentJob', this.currentJob);
      this.authService.currentScrumboard = [];
      res['shifts'].forEach((element, i) => {
        this.updateCurrentScrum(element, i, res)
      });
      this.authService.setCurrentScrumboardLocal(this.authService.currentScrumboard);
      this.currentScrum = this.authService.currentScrumboard;
      console.log('this.currentScrum', this.authService.currentScrumboard);
    }
    else{
      console.log('authService scrumboard', this.authService.currentScrumboard);
      this.authService.setCurrentScrumboard();
      this.currentScrum = this.authService.currentScrumboard;
    }
    console.log('scrumboard', this.currentScrum);
  }

  open(board) {
    console.log('card cliked', board);
    this.addCardCtrl.setValue(null);
    this.currentJob.shiftId = board.shiftId;
    this.dialog.open(ScrumboardDialogComponent, {
      data: board ,
      width: '700px',
      maxWidth: '100%',
      disableClose: true
    }).afterClosed().subscribe(updatedCustomer => {
      if (updatedCustomer) {
        console.log('updatedCustomer', updatedCustomer)
        this.currentJob.client = updatedCustomer;

        this.authService.currentScrumboard = [];
        updatedCustomer.shifts.forEach((element, i) => {
          this.updateCurrentScrum(element, i, updatedCustomer)
        });

        this.authService.setCurrentScrumboardLocal(this.authService.currentScrumboard);
        this.currentScrum = this.authService.currentScrumboard;
        console.log('this.currentScrum', this.authService.currentScrumboard);
        this.authService.openSnackbar('Updated Job Successfully');
      }
    });
  }

  updateCurrentScrum(element, i, res){
    console.log('element', element)
    let assigned = 0;
    element.workers.forEach(elem => {
      console.log('elem', elem.workerId);
      if(elem.workerId && elem.workerId !== null){
        assigned = assigned+1;
      }
    });
    this.authService.currentScrumboard.push({
      id: res.id,
      title: res.shifts[i].department,
      shiftId: res.shifts[i]._id,
      children: [
        // { id:1, label:'Unassigned Shifts', children:[] },
        // { id:2, label:'Assigned', children:[] },
        { id: 1, label: 'In Progress', children: [] },
        { id: 2, label: 'Timesheet Submitted', children: [] },
        { id: 3, label: 'Completed', children: [] },
      ]
    });
    console.log('currentJob', this.authService.currentJob);
    const arrLabel = ['In Progress', 'Timesheet Submitted', 'Completed'];
    arrLabel.forEach((ele, index) => {
      if (ele === res.statusStr) {
        this.authService.currentScrumboard[i].children[index].children.push({
          id: res.id,
          title: res.shifts[i].department,
          client: res.client.clientId,
          shiftDate: res.shiftDate,
          locationShift: res.locationShift,
          purchaseOrderNo: res.purchaseOrderNo,
          additionalInformation: res.additionalInformation,
          statusStr: res.statusStr,
          fulfilled: assigned,
          shift: res.shifts[i],
          totalStaff: res.totalStaff,
          clientId: res.clientId,
          timesheetId: res.timesheetId
        });
      }
    });
  }

  editJob(customer: Customer) {
    console.log('current job', customer, this.currentJob);
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
        this.authService.updateJob(updatedCustomer).subscribe((res) => {
          console.log('res', res);
          this.currentJob.client = res;
          this.authService.currentScrumboard = [];
          res.shifts.forEach((element, i) => {
            this.updateCurrentScrum(element, i, res)
          });
          this.authService.setCurrentScrumboardLocal(this.authService.currentScrumboard);
          this.currentScrum = this.authService.currentScrumboard;
          console.log('this.currentScrum', this.authService.currentScrumboard);
          this.authService.openSnackbar('Updated Job Successfully');
        });
      }
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    console.log('event', event);
    if (event.previousContainer === event.container) {
      console.log('if', event.previousContainer === event.container);
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log('else', event.previousContainer !== event.container);
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
        // alert(event.container.id)
      this.authService.setStatusJob(event.container.data[0].id, event.container.id).subscribe((res) => {
          console.log('res', res);
          this.currentJob.client = res;
          this.authService.currentScrumboard = [];
          res.shifts.forEach((element, i) => {
            this.updateCurrentScrum(element, i, res)
          });
          this.authService.setCurrentScrumboardLocal(this.authService.currentScrumboard);
          this.currentScrum = this.authService.currentScrumboard;
          console.log('this.currentScrum', this.authService.currentScrumboard);
          this.authService.openSnackbar('Job status updated successfully');

        });
      }
  }

  dropList(event: CdkDragDrop<ScrumboardList[]>) {
    console.log('dropList');
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  getConnectedList(board: Scrumboard) {
    return board.children.map(x => `${x.id}`);
  }

  openAddCard(list: ScrumboardList, content: TemplateRef<any>, origin: HTMLElement) {
    this.popover.open({
      content,
      origin,
      position: [
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'bottom'
        },
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
        },
      ]
    });
  }

  openAddList(board: Scrumboard, content: TemplateRef<any>, origin: HTMLElement) {
    this.popover.open({
      content,
      origin,
      position: [
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top'
        },
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
        },
      ]
    });
  }

  createCard(list: ScrumboardList, close: () => void) {
    if (!this.addCardCtrl.value) {
      return;
    }

    list.children.push({
      id: AdminJobComponent.nextId++,
      title: this.addCardCtrl.value
    });

    close();

    this.addCardCtrl.setValue(null);
  }


}
