import { Component, OnInit } from '@angular/core';
import icLayers from '@iconify/icons-ic/twotone-layers';
import icAssigment from '@iconify/icons-ic/twotone-assignment';
import { Icon } from '@visurel/iconify-angular';
import icContactSupport from '@iconify/icons-ic/twotone-contact-support';
import icContacts from '@iconify/icons-ic/twotone-contacts';
import icAssessment from '@iconify/icons-ic/twotone-assessment';
import icBook from '@iconify/icons-ic/twotone-book';
import { PopoverRef } from '../popover/popover-ref';

export interface MegaMenuFeature {
  icon: Icon;
  label: string;
  route: string;
}

export interface MegaMenuPage {
  label: string;
  route: string;
}

@Component({
  selector: 'vex-mega-menu',
  templateUrl: './mega-menu.component.html'
})
export class MegaMenuComponent implements OnInit {

  features: MegaMenuFeature[] = [
    {
      icon: icLayers,
      label: 'Dashboard',
      route: '/'
    },
    {
      icon: icAssigment,
      label: 'AIO-Table',
      route: '/apps/aio-table'
    },
    {
      icon: icContactSupport,
      label: 'Help Center',
      route: '/apps/help-center'
    },
    {
      icon: icContacts,
      label: 'Contacts',
      route: '/apps/contacts/grid'
    },
    {
      icon: icAssessment,
      label: 'Scrumboard',
      route: '/apps/scrumboard/1'
    },
    {
      icon: icBook,
      label: 'Documentation',
      route: '/documentation'
    }
  ];
  pageAdmin: MegaMenuPage[] = [
    {
      label: 'Dashboard',
      route: '/admin'
    },
    {
      label: 'Jobs',
      route: '/admin/jobs'
    },
    {
      label: 'Clients',
      route: '/admin/client'
    },
    {
      label: 'Workers',
      route: '/admin/workers'
    },
    {
      label: 'Invoices',
      route: '/admin/invoices'
    },
    {
      label: 'Timesheets',
      route: '/admin/timesheets'
    },
    {
      label: 'Payroll',
      route: '/admin/payroll'
    },
    {
      label: 'Settings',
      route: '/admin/companydetails'
    }
  ];
  pageClient: MegaMenuPage[] = [
    {
      label: 'Dashboard',
      route: '/client'
    },
    {
      label: 'Timesheets',
      route: '/client/timesheets'
    },
    {
      label: 'Invoices',
      route: '/client/invoices'
    },
    {
      label: 'Settings',
      route: '/settings/companydetails'
    },
    {
      label: 'FAQ',
      route: '/pages/faq'
    },
    {
      label: 'Help Center',
      route: '/apps/help-center'
    }
  ];
  pageWorker: MegaMenuPage[] = [
    {
      label: 'Dashboard',
      route: '/worker'
    },
    {
      label: 'Jobs',
      route: '/jobs'
    },
    {
      label: 'Profile',
      route: '/profile'
    },
    {
      label: 'Pay History',
      route: 'worker/payslips'
    },
    {
      label: 'FAQ',
      route: '/pages/faq'
    },
    {
      label: 'Help Center',
      route: '/apps/help-center'
    }
  ];
  pages: MegaMenuPage[] = [
    {
      label: 'All-In-One Table',
      route: '/apps/aio-table'
    },
    {
      label: 'Authentication',
      route: '/login'
    },
    {
      label: 'Components',
      route: '/ui/components/overview'
    },
    {
      label: 'Documentation',
      route: '/documentation'
    },
    {
      label: 'FAQ',
      route: '/pages/faq'
    },
    {
      label: 'Form Elements',
      route: '/ui/forms/form-elements'
    },
    {
      label: 'Form Wizard',
      route: '/ui/forms/form-wizard'
    },
    {
      label: 'Guides',
      route: '/pages/guides'
    },
    {
      label: 'Help Center',
      route: '/apps/help-center'
    },
    {
      label: 'Scrumboard',
      route: '/apps/scrumboard'
    }
  ];
  pagesOther: MegaMenuPage[] = [
    {
      label: 'All-In-One Table',
      route: '/apps/aio-table'
    },
    {
      label: 'Authentication',
      route: '/login'
    },
    {
      label: 'Components',
      route: '/ui/components/overview'
    },
    {
      label: 'Documentation',
      route: '/documentation'
    },
    {
      label: 'FAQ',
      route: '/pages/faq'
    },
    {
      label: 'Form Elements',
      route: '/ui/forms/form-elements'
    },
    {
      label: 'Form Wizard',
      route: '/ui/forms/form-wizard'
    },
    {
      label: 'Guides',
      route: '/pages/guides'
    },
    {
      label: 'Help Center',
      route: '/apps/help-center'
    },
    {
      label: 'Scrumboard',
      route: '/apps/scrumboard'
    }
  ];
  accountRole;
  constructor(private popoverRef: PopoverRef<MegaMenuComponent>) { }

  ngOnInit() {
    if(localStorage.getItem('loggedIn'))
    {
      this.accountRole = localStorage.getItem('loggedIn')
      if(this.accountRole == 'Client')
        this.pages = this.pageClient;
      else if(this.accountRole == 'Worker')
        this.pages = this.pageWorker;
      else
        this.pages = this.pageAdmin;
    }

  }

  close() {
    this.popoverRef.close();
  }
}
