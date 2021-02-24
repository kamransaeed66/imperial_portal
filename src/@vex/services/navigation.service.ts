import { Injectable } from '@angular/core';
import { NavigationDropdown, NavigationItem, NavigationLink, NavigationSubheading } from '../interfaces/navigation-item.interface';
import { Subject } from 'rxjs';
import icLayers from '@iconify/icons-ic/twotone-layers';
import icAssigment from '@iconify/icons-ic/twotone-assignment';
import icContactSupport from '@iconify/icons-ic/twotone-contact-support';
import icDateRange from '@iconify/icons-ic/twotone-date-range';
import icChat from '@iconify/icons-ic/twotone-chat';
import icContacts from '@iconify/icons-ic/twotone-contacts';
import icAssessment from '@iconify/icons-ic/twotone-assessment';
import icLock from '@iconify/icons-ic/twotone-lock';
import icHelp from '@iconify/icons-ic/twotone-help';
import icError from '@iconify/icons-ic/twotone-error';
import icAttachMoney from '@iconify/icons-ic/twotone-attach-money';
import icPersonOutline from '@iconify/icons-ic/twotone-person-outline';
import icReceipt from '@iconify/icons-ic/twotone-receipt';
import icBook from '@iconify/icons-ic/twotone-book';
import icBubbleChart from '@iconify/icons-ic/twotone-bubble-chart';
import icFormatColorText from '@iconify/icons-ic/twotone-format-color-text';
import icStar from '@iconify/icons-ic/twotone-star';
import icViewCompact from '@iconify/icons-ic/twotone-view-compact';
import icPictureInPicture from '@iconify/icons-ic/twotone-picture-in-picture';
import icSettings from '@iconify/icons-ic/twotone-settings';
import icUpdate from '@iconify/icons-ic/twotone-update';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  items: NavigationItem[] = [];
  items_worker: NavigationItem[]  = [
   {
     type: 'link',
     label: 'Dashboard',
     route: '/worker',
     icon: icLayers,
     routerLinkActiveOptions: { exact: true }
   },
   {
     type: 'link',
     label: 'Profile',
     route: '/worker/profile',
     icon: icPersonOutline,
     routerLinkActiveOptions: { exact: true }
   },
   {
     type: 'link',
     label: 'Pay History',
     route: 'worker/payslips',
     icon: icAssigment,
     routerLinkActiveOptions: { exact: true }
   },
   {
     type: 'link',
     label: 'FAQs',
     route: '/worker/faqs',
     icon: icHelp,
     routerLinkActiveOptions: { exact: true }
   },
   {
     type: 'link',
     label: 'Support',
     route: '/worker/support',
     icon: icContactSupport,
     routerLinkActiveOptions: { exact: true }
   }
 ];
  items_client : NavigationItem[] = [
   {
     type: 'link',
     label: 'Dashboard',
     route: '/client',
     icon: icLayers,
     routerLinkActiveOptions: { exact: true }
   },
   {
     type: 'link',
     label: 'Timesheets',
     route: '/client/timesheets',
     icon: icDateRange,
     routerLinkActiveOptions: { exact: true }
   },
   {
     type: 'link',
     label: 'Invoices',
     route: '/client/invoices',
     icon: icReceipt,
     routerLinkActiveOptions: { exact: true }
   },
   {
     type: 'link',
     label: 'FAQs',
     route: '/client/faqs',
     icon: icHelp,
     routerLinkActiveOptions: { exact: true }
   },
   {
     type: 'link',
     label: 'Support',
     route: '/client/support',
     icon: icContactSupport,
     routerLinkActiveOptions: { exact: true }
   },
   {
      type: 'dropdown',
      label: 'Settings',
      icon: icSettings,
      children: [
        {
          type: 'link',
          label: 'Company Details',
          route: '/client/companydetails'
        },
        {
          type: 'link',
          label: 'Sub Accounts',
          route: '/client/subaccounts'
        }
      ]
    }
 ];
  items_admin: NavigationItem[]  = [
   {
     type: 'link',
     label: 'Dashboard',
     route: '/admin',
     icon: icLayers,
     routerLinkActiveOptions: { exact: true }
   },
   {
     type: 'link',
     label: 'Jobs',
     route: '/admin/jobs',
     icon: icAssessment,
     routerLinkActiveOptions: { exact: true }
   },
   {
     type: 'link',
     label: 'Clients',
     route: '/admin/clients',
     icon: icPersonOutline,
     routerLinkActiveOptions: { exact: true }
   },
   {
     type: 'link',
     label: 'Workers',
     route: '/admin/workers',
     icon: icPersonOutline,
     routerLinkActiveOptions: { exact: true }
   },
   {
     type: 'link',
     label: 'Invoices',
     route: '/admin/invoices',
     icon: icReceipt,
     routerLinkActiveOptions: { exact: true }
   },
   {
     type: 'link',
     label: 'Timesheets',
     route: '/admin/timesheets',
     icon: icDateRange,
     routerLinkActiveOptions: { exact: true }
   },
   {
     type: 'link',
     label: 'Payroll',
     route: '/admin/payroll',
     icon: icReceipt,
     routerLinkActiveOptions: { exact: true }
   },
   {
     type: 'dropdown',
     label: 'Settings',
     icon: icSettings,
     children: [
           {
             type: 'link',
             label: 'Company Details',
             route: '/admin/settings/companydetails'
           },
           {
             type: 'link',
             label: 'Invoice Settings',
             route: '/admin/settings/invoicesettings'
           },
           {
             type: 'link',
             label: 'Team Accounts',
             route: '/admin/settings/teamaccounts'
           },
          //  {
          //    type: 'link',
          //    label: 'Departments & Roles',
          //    route: '/admin/settings/departmentsroles'
          //  },
           {
             type:'dropdown',
             label:'Email Configurations',
             children:[
              //  {
              //    type:'link',
              //    label:'General Templates',
              //    route:'/admin/settings/generaltemplates'
              //  },
               {
                 type:'link',
                 label:'Email Settings',
                 route:'/admin/settings/emailsettings'
               }
             ]
           }
         ]
       }
 ];
 items_team: NavigationItem[]  = [
  {
    type: 'link',
    label: 'Dashboard',
    route: '/team',
    icon: icLayers,
    routerLinkActiveOptions: { exact: true }
  },
  {
    type: 'link',
    label: 'Jobs',
    route: '/team/jobs',
    icon: icAssessment,
    routerLinkActiveOptions: { exact: true }
  },
  {
    type: 'link',
    label: 'Clients',
    route: '/team/clients',
    icon: icPersonOutline,
    routerLinkActiveOptions: { exact: true }
  },
  {
    type: 'link',
    label: 'Workers',
    route: '/team/workers',
    icon: icPersonOutline,
    routerLinkActiveOptions: { exact: true }
  },
  {
    type: 'link',
    label: 'Invoices',
    route: '/team/invoices',
    icon: icReceipt,
    routerLinkActiveOptions: { exact: true }
  },
  {
    type: 'link',
    label: 'Timesheets',
    route: '/team/timesheets',
    icon: icDateRange,
    routerLinkActiveOptions: { exact: true }
  },
  {
    type: 'link',
    label: 'Payroll',
    route: '/team/payroll',
    icon: icReceipt,
    routerLinkActiveOptions: { exact: true }
  }
  ];
  private _openChangeSubject = new Subject<NavigationDropdown>();
  openChange$ = this._openChangeSubject.asObservable();

  constructor() {}

  triggerOpenChange(item: NavigationDropdown) {
    this._openChangeSubject.next(item);
  }

  isLink(item: NavigationItem): item is NavigationLink {
    return item.type === 'link';
  }

  isDropdown(item: NavigationItem): item is NavigationDropdown {
    return item.type === 'dropdown';
  }

  isSubheading(item: NavigationItem): item is NavigationSubheading {
    return item.type === 'subheading';
  }
}
