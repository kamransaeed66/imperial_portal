import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ScrumboardCard } from '../../interfaces/scrumboard-card.interface';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import icAssignment from '@iconify/icons-ic/twotone-assignment';
import icAdd from '@iconify/icons-fa-solid/plus-square';
import icMinus from '@iconify/icons-fa-solid/minus-square';
import { scrumboardLabels, scrumboardUsers } from '../../../../../../static-data/scrumboard';
import icDescription from '@iconify/icons-ic/twotone-description';
import icClose from '@iconify/icons-ic/twotone-close';
import { ScrumboardList } from '../../interfaces/scrumboard-list.interface';
import { Scrumboard } from '../../interfaces/scrumboard.interface';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icImage from '@iconify/icons-ic/twotone-image';
import { ScrumboardAttachment } from '../../interfaces/scrumboard-attachment.interface';
import icAttachFile from '@iconify/icons-ic/twotone-attach-file';
import icInsertComment from '@iconify/icons-ic/twotone-insert-comment';
import { DateTime } from 'luxon';
import { ScrumboardComment } from '../../interfaces/scrumboard-comment.interface';
import icStar from '@iconify/icons-ic/twotone-star';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'vex-scrumboard-dialog',
  templateUrl: './scrumboard-dialog.component.html',
  styleUrls: ['./scrumboard-dialog.component.scss']
})

export class ScrumboardDialogComponent implements OnInit {

  form = this.fb.group({
    title: null,
    client: null,
    department: null,
    role: null,
    shiftDate: null,
    startTime: null,
    endTime: null,
    locationShift: null,
    purchaseOrderNo: null,
    additionalInformation: null,
    statusStr: null,
    fulfilled: 0,
    total: 0,
    totalStaff: null,
    clientId: null,
    timesheetId: [],
  });

  roles: any;
  commentCtrl = new FormControl();
  originalTimesheets: any[] = [];
  icAssignment = icAssignment;
  icDescription = icDescription;
  icClose = icClose;
  icAdd = icAdd;
  icMinus = icMinus;
  icMoreVert = icMoreVert;
  icDelete = icDelete;
  icImage = icImage;
  icAttachFile = icAttachFile;
  icInsertComment = icInsertComment;
  icStar = icStar;
  jobId;
  // users = scrumboardUsers;
  labels = scrumboardLabels;
  _workers: any;
  list: any;
  // list: ScrumboardList;
  // board: Scrumboard;
  fulfilled;
  newWorkerId: any;
  oldWorkerId: any;
  wokersSelect: any = [];
  totalworkers: [];
  checked = false;
  constructor(private dialogRef: MatDialogRef<ScrumboardDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: {
              },
              private fb: FormBuilder,
              private authService: AuthService) { }

  async ngOnInit() {
    if (!this.authService.AllUser){
      await this.authService.getAllUserAuth();
    }
    const tempArr = this.authService.AllUser;
    this._workers = [];
    tempArr.forEach(obj => {
        if (obj.accountType === 'Worker') {
          this._workers.push({profilePhoto: obj.profilePhoto, name: `${obj.forename} ${obj.surename}`, workerId: obj.workerId, emailAddress: obj.emailAddress, id: obj._id});
        }
      });
    console.log('this._workers', this._workers);

    console.log('this.data', this.data);
    this.list = this.data;
    this.form = this.fb.group({
      workers: this.fb.array([])
    });

    this.assignWorkers();

    if (this.list.title === 'Housekeeping'){
      this.roles = [
        {
          value: 'Linen Porter',
          label: 'Linen Porter'
        },
        {
          value: 'Floor Porter',
          label: 'Floor Porter'
        },
        {
          value: 'Floor Supervisor',
          label: 'Floor Supervisor'
        },
        {
          value: 'Room Supervisor',
          label: 'Room Supervisor'
        },
        {
          value: 'Evening Room Attendant',
          label: 'Evening Room Attendant'
        },
        {
          value: 'Public Area Attendant',
          label: 'Public Area Attendant'
        },
        {
          value: 'Spa Attendant',
          label: 'Spa Attendant'
        },
        {
          value: 'Valet',
          label: 'Valet'
        },
        {
          value: 'Housekeeper',
          label: 'Housekeeper'
        }
      ];
    }
    else if (this.list.title === 'Food and Beverage') {
      this.roles = [
        {
          value: 'Waiters',
          label: 'Waiters'
        },
        {
          value: 'Night Waiters',
          label: 'Night Waiters'
        },
        {
          value: 'Night Room Service',
          label: 'Night Room Service'
        },
        {
          value: 'Supervisor Banqueting',
          label: 'Supervisor Banqueting'
        },
        {
          value: 'Team Leader',
          label: 'Team Leader'
        },
        {
          value: 'Silver Service Waiters',
          label: 'Silver Service Waiters'
        },
        {
          value: 'Bar Staff',
          label: 'Bar Staff'
        },
        {
          value: 'Cloakroom',
          label: 'Cloakroom'
        },
        {
          value: 'Concierge',
          label: 'Concierge'
        },
        {
          value: 'Hostess',
          label: 'Hostess'
        }
      ];
    }
    else{
      this.roles = [
        {
          value: 'Kitchen Porter',
          label: 'Kitchen Porter'
        },
        {
          value: 'Night Kitchen Porter',
          label: 'Night Kitchen Porter'
        },
        {
          value: 'Night Cleaners',
          label: 'Night Cleaners'
        },
        {
          value: 'Supervisor BOH (Back of House)',
          label: 'Supervisor BOH (Back of House)'
        },
        {
          value: 'Food Runners',
          label: 'Food Runners'
        },
        {
          value: 'Breakfast Runners',
          label: 'Breakfast Runners'
        },
        {
          value: 'Commis Chef',
          label: 'Commis Chef'
        },
        {
          value: 'Breakfast Chef',
          label: 'Breakfast Chef'
        },
        {
          value: 'Chef De Partie',
          label: 'Chef De Partie'
        },
        {
          value: 'Pastry Chef',
          label: 'Pastry Chef'
        },
        {
          value: 'Banqueting Porter',
          label: 'Banqueting Porter'
        }
      ];
    }
  }
  get workers() { return this.form.controls.workers as FormArray; }

  assignWorkers() {
    for (let index = 0; index < this.list.shift.total; index++) {
      this.workers.push(this.patchValues(this.list.shift.workers[index]));
    }
  }

  patchValues(x) {
    return this.fb.group({
      role: [x.role],
      startTime: [x.startTime],
      endTime: [x.endTime],
      workerId: [x.workerId]
    });
  }

  addShift(){
    this.workers.push(this.fb.group({
      role: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      total: ['', [Validators.required, Validators.min(1)]],
      workerId: ['']
    }));
    console.log('addShift', this.workers);
  }
  removeShift(index){
    this.workers.removeAt(index);
    console.log('removeShift', index, this.workers);
  }

  save() {
    const workers = this.form.value.workers;
    console.log('workers', workers);
    this.authService.setJobWorkers(this.list.id, this.list.shift._id,workers).subscribe((res) => {
      console.log('res', res);
      if (this.checked === true) {
        this.authService.sendShiftEmail(workers, this.list, this.data).subscribe((sendemail_res) => {
          this.authService.openSnackbar('Shift Detail Sent to workers');
        });
      }

      this.dialogRef.close(res);
    })
  }
  sendEmail(sendEmail){
    console.log('send email', sendEmail);
  }

  isImageExtension(extension: string) {
    return extension === 'jpg' || extension === 'png';
  }

  makeCover(attachment: ScrumboardAttachment) {
    this.form.get('cover').setValue(attachment);
  }

  isCover(attachment: ScrumboardAttachment) {
    return this.form.get('cover').value === attachment;
  }

  remove(attachment: ScrumboardAttachment) {
    if (this.form.get('cover').value && attachment.id === this.form.get('cover').value.id) {
      this.form.get('cover').setValue(null);
    }

    this.form.setControl('attachments', this.fb.array(this.form.get('attachments').value.filter(a => a !== attachment)));
  }

  addComment() {
    if (!this.commentCtrl.value) {
      return;
    }

    const comments = this.form.get('comments') as FormArray;
    comments.push(new FormControl({
      from: {
        name: 'David Smith',
        imageSrc: 'assets/img/avatars/1.jpg'
      },
      message: this.commentCtrl.value,
      date: DateTime.local().minus({ seconds: 1 })
    } as ScrumboardComment));

    this.commentCtrl.setValue(null);
  }
  onWorker(ev){
    // console.log('//////')
    // console.log(ev)
    this.fulfilled = ev.value.length;
    // console.log(this.newWorkerId);
    // console.log(this.workerId);
  }
}
