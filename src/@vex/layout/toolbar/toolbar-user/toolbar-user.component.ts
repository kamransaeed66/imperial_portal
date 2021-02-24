import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PopoverService } from '../../../components/popover/popover.service';
import { ToolbarUserDropdownComponent } from './toolbar-user-dropdown/toolbar-user-dropdown.component';
import icPerson from '@iconify/icons-ic/twotone-person';

@Component({
  selector: 'vex-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarUserComponent implements OnInit {

  dropdownOpen: boolean;
  icPerson = icPerson;
  personName ='Admin';
  photo = '';
  constructor(private popover: PopoverService,
              private cd: ChangeDetectorRef) { }

  ngOnInit() {
    var userInfo =  JSON.parse(localStorage.getItem('userInfo'));
    var userType = localStorage.getItem('loggedIn');
    if(userType == 'Client' || userType == 'Team'){
      this.personName = userInfo['firstName'] + ' '+ userInfo['lastName'];
    }else if(userType == 'Worker'){
      this.personName = userInfo['forename'] + ' '+ userInfo['surename'];
      this.photo = userInfo['profilePhoto'];
    }
  }

  showPopover(originRef: HTMLElement) {
    this.dropdownOpen = true;
    this.cd.markForCheck();

    const popoverRef = this.popover.open({
      content: ToolbarUserDropdownComponent,
      origin: originRef,
      offsetY: 12,
      position: [
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom'
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        },
      ]
    });

    popoverRef.afterClosed$.subscribe(() => {
      this.dropdownOpen = false;
      this.cd.markForCheck();
    });
  }
}
