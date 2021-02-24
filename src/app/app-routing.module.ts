import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomLayoutComponent } from './custom-layout/custom-layout.component';
import { VexRoutes } from '../@vex/interfaces/vex-route.interface';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
let loggedIn = localStorage.getItem('loggedIn');
if(loggedIn){
  loggedIn = loggedIn.toLowerCase();
}
const routes: VexRoutes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/pages/auth/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'register',
    children: [
      {
        path: 'worker',
        loadChildren: () => import('./pages/pages/auth/register-worker/register-worker.module').then(m => m.RegisterWorkerModule),
      },
      {
        path: 'client',
        loadChildren: () => import('./pages/pages/auth/register/register.module').then(m => m.RegisterModule),

      }
    ]
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/pages/auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/pages/auth/reset-password/reset-password.module').then(m => m.ResetPasswordModule),
  },
  {
    path: 'email-verify',
    loadChildren: () => import('./pages/pages/auth/email-verify/email-verify.module').then(m => m.EmailVerifyModule),
  },
  {
    path: 'coming-soon',
    loadChildren: () => import('./pages/pages/coming-soon/coming-soon.module').then(m => m.ComingSoonModule),
  },
  {
    path: '404',
    loadChildren: () => import('./pages/pages/errors/error-404/error-404.module').then(m => m.Error404Module)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: CustomLayoutComponent,
    children: [
      // {
      //   path: 'dashboards/analytics',
      //   redirectTo: '/'
      // },
      // admin routes
      {
        path: 'admin',
        canActivate: [RoleGuard],
        children: [
          {
            path: '',
            loadChildren: () => import('./admin/admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule),
          },
          {
            path: 'timesheets',
            loadChildren: () => import('./admin/admin-timesheet/admin-timesheet.module').then(m => m.AdminTimesheetModule),
          },
          {
            path: 'clients',
            loadChildren: () => import('./admin/clients/clients.module').then(m => m.ClientsModule),
          },
          {
            path: 'workers',
            children: [
              {
                path: '',
                loadChildren: () => import('./admin/workers/workers.module').then(m => m.WorkersModule),
              },
              {
                path: 'edit',
                loadChildren: () => import('./admin/workers/edit-worker/edit-worker.module').then(m => m.EditWorkerModule),
              }
            ]
          },
          {
            path: 'payroll',
            loadChildren: () => import('./admin/payroll/payroll.module').then(m => m.PayrollModule),

          },
          {
            path: 'invoices',
            children: [
                {
                  path: '',
                  loadChildren: () => import('./admin/invoices/invoices.module').then(m => m.InvoicesModule),
                },
                {
                  path: 'pdf',
                  loadChildren: () => import('./admin/invoices/invoice/invoice.module').then(m => m.InvoiceModule),
                }
            ]
          },
          {
            path: 'jobs',
            children: [
              {
                path: '',
                loadChildren: () => import('./admin/admin-calendar/admin-calendar.module').then(m => m.AdminCalendarModule),
              },
              {
                path: 'scrumboard',
                loadChildren: () => import('./admin/admin-calendar/admin-job/admin-job.module').then(m => m.AdminJobModule),

              }
            ]
          },
          {
            path: 'settings',
            children: [
              {
                path: 'companydetails',
                loadChildren: () => import('./admin/settings/companydetails/companydetails.module').then(m => m.CompanydetailsModule),
              },
              {
                path: 'emailsettings',
                loadChildren: () => import('./admin/settings/email-settings/email-settings.module').then(m => m.EmailSettingsModule),
              },
              {
                path: 'teamaccounts',
                loadChildren: () => import('./admin/settings/teamaccounts/teamaccounts.module').then(m => m.TeamAccountsModule),
              },
              {
                path: 'invoicesettings',
                loadChildren: () => import('./admin/settings/invoice-settings/invoice-settings.module').then(m => m.InvoiceSettingsModule),
              },
              {
                path: 'generaltemplates',
                loadChildren: () => import('./admin/settings/general-templates/general-templates.module').then(m => m.GeneralTemplatesModule),
              }
            ]
          },
          {
            path: 'profile',
            loadChildren: () => import('./pages/apps/social/social.module').then(m => m.SocialModule)
          }
        ],
        data: {
          role: 'Admin'
        }
      },
      // admin team routes
      {
        path: 'team',
        canActivate: [RoleGuard],
        children: [
          {
            path: '',
            loadChildren: () => import('./admin/admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule),
          },
          {
            path: 'timesheets',
            loadChildren: () => import('./admin/admin-timesheet/admin-timesheet.module').then(m => m.AdminTimesheetModule),
          },
          {
            path: 'clients',
            loadChildren: () => import('./admin/clients/clients.module').then(m => m.ClientsModule),
          },
          {
            path: 'workers',
            children: [
              {
                path: '',
                loadChildren: () => import('./admin/workers/workers.module').then(m => m.WorkersModule),
              },
              {
                path: 'edit',
                loadChildren: () => import('./admin/workers/edit-worker/edit-worker.module').then(m => m.EditWorkerModule),
              }
            ]
          },
          {
            path: 'payroll',
            loadChildren: () => import('./admin/payroll/payroll.module').then(m => m.PayrollModule),

          },
          {
            path: 'invoices',
            children: [
              {
                path: '',
                loadChildren: () => import('./admin/invoices/invoices.module').then(m => m.InvoicesModule),
              },
              {
                path: 'pdf',
                loadChildren: () => import('./admin/invoices/invoice/invoice.module').then(m => m.InvoiceModule),
              }
            ]
          },
          {
            path: 'jobs',
            children: [
              {
                path: '',
                loadChildren: () => import('./admin/admin-calendar/admin-calendar.module').then(m => m.AdminCalendarModule),
              },
              {
                path: 'scrumboard',
                loadChildren: () => import('./admin/admin-calendar/admin-job/admin-job.module').then(m => m.AdminJobModule),

              }
            ]
          },
          {
            path: 'profile',
            loadChildren: () => import('./pages/apps/social/social.module').then(m => m.SocialModule)
          }
        ],
        data: {
          role: 'Team'
        }
      },
      // client routes
      {
        path: 'client',
        canActivate: [RoleGuard],
        children: [
            {
              path: '',
              loadChildren: () => import('./client/clients-dashboard/clients-dashboard.module').then(m => m.ClientsDashboardModule),
            },
            {
              path: 'timesheets',
              loadChildren: () => import('./client/client-timesheet/client-timesheet.module').then(m => m.ClientTimesheetModule),
            },
            {
              path: 'invoices',
              children: [
                {
                  path: '',
                  loadChildren: () => import('./client/invoices/invoices.module').then(m => m.InvoicesModule),
                },
                {
                  path: 'pdf',
                  loadChildren: () => import('./client/invoices/invoice/invoice.module').then(m => m.InvoiceModule),
                }
              ]
            },
            {
              path: 'companydetails',
              loadChildren: () => import('./client/settings/companydetails/companydetails.module').then(m => m.CompanydetailsModule),
            },
            {
              path: 'subaccounts',
              loadChildren: () => import('./client/settings/subaccounts/subaccounts.module').then(m => m.SubaccountsModule),
            },
            {
              path: 'faqs',
              loadChildren: () => import('./pages/pages/faq/faq.module').then(m => m.FaqModule)
            },
            {
              path: 'support',
              loadChildren: () => import('./support/support.module').then(m => m.SupportModule)
            },
            {
              path: 'profile',
              loadChildren: () => import('./pages/apps/social/social.module').then(m => m.SocialModule)
            },
        ],
        data: {
          role: 'Client'
        }
      },
      // worker routes
      {
        path: 'worker',
        canActivate: [RoleGuard],
        children: [
          {
            path: '',
            loadChildren: () => import('./worker/workers-dashboard/workers-dashboard.module').then(m => m.WorkersDashboardModule),
          },
          {
            path: 'payslips',
            loadChildren: () => import('./worker/payhistory/payhistory.module').then(m => m.PayhistoryModule),
          },
          {
            path: 'faqs',
            loadChildren: () => import('./pages/pages/faq/faq.module').then(m => m.FaqModule)
          },
          {
            path: 'support',
            loadChildren: () => import('./support/support.module').then(m => m.SupportModule)
          },
          {
            path: 'profile',
            loadChildren: () => import('./pages/apps/social/social.module').then(m => m.SocialModule)
          },
        ],
        data: {
          role: 'Worker'
        }
      },
      {
        path: 'apps',
        children: [
          {
            path: 'chat',
            loadChildren: () => import('./pages/apps/chat/chat.module').then(m => m.ChatModule),
            data: {
              toolbarShadowEnabled: true
            }
          },
          {
            path: 'mail',
            loadChildren: () => import('./pages/apps/mail/mail.module').then(m => m.MailModule),
            data: {
              toolbarShadowEnabled: true,
              scrollDisabled: true
            }
          },
          {
            path: 'contacts',
            loadChildren: () => import('./pages/apps/contacts/contacts.module').then(m => m.ContactsModule)
          },
          {
            path: 'calendar',
            loadChildren: () => import('./pages/apps/calendar/calendar.module').then(m => m.CalendarModule),
            data: {
              toolbarShadowEnabled: true
            }
          },
          {
            path: 'aio-table',
            loadChildren: () => import('./pages/apps/aio-table/aio-table.module').then(m => m.AioTableModule),
          },
          {
            path: 'help-center',
            loadChildren: () => import('./pages/apps/help-center/help-center.module').then(m => m.HelpCenterModule),
          },
          {
            path: 'scrumboard',
            loadChildren: () => import('./pages/apps/scrumboard/scrumboard.module').then(m => m.ScrumboardModule),
          },
          {
            path: 'editor',
            loadChildren: () => import('./pages/apps/editor/editor.module').then(m => m.EditorModule),
          },
        ]
      },
      {
        path: 'pages',
        children: [
          {
            path: 'pricing',
            loadChildren: () => import('./pages/pages/pricing/pricing.module').then(m => m.PricingModule)
          },
          {
            path: 'faq',
            loadChildren: () => import('./pages/pages/faq/faq.module').then(m => m.FaqModule)
          },
          {
            path: 'guides',
            loadChildren: () => import('./pages/pages/guides/guides.module').then(m => m.GuidesModule)
          },
          {
            path: 'invoice',
            loadChildren: () => import('./pages/pages/invoice/invoice.module').then(m => m.InvoiceModule)
          },
          {
            path: 'error-404',
            loadChildren: () => import('./pages/pages/errors/error-404/error-404.module').then(m => m.Error404Module)
          },
          {
            path: 'error-500',
            loadChildren: () => import('./pages/pages/errors/error-500/error-500.module').then(m => m.Error500Module)
          }
        ]
      },
      {
        path: 'ui',
        children: [
          {
            path: 'components',
            loadChildren: () => import('./pages/ui/components/components.module').then(m => m.ComponentsModule),
          },
          {
            path: 'forms/form-elements',
            loadChildren: () => import('./pages/ui/forms/form-elements/form-elements.module').then(m => m.FormElementsModule),
            data: {
              containerEnabled: true
            }
          },
          {
            path: 'forms/form-wizard',
            loadChildren: () => import('./pages/ui/forms/form-wizard/form-wizard.module').then(m => m.FormWizardModule),
            data: {
              containerEnabled: true
            }
          },
          {
            path: 'icons',
            loadChildren: () => import('./pages/ui/icons/icons.module').then(m => m.IconsModule)
          },
          {
            path: 'page-layouts',
            loadChildren: () => import('./pages/ui/page-layouts/page-layouts.module').then(m => m.PageLayoutsModule),
          },
        ]
      },
      {
        path: 'documentation',
        loadChildren: () => import('./pages/documentation/documentation.module').then(m => m.DocumentationModule),
      },
      { path: '**', redirectTo: '/'+loggedIn },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules,
    useHash: true,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
