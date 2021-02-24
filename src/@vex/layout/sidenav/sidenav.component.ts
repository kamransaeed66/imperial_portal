import { Component, Input, OnInit } from '@angular/core';
import { trackByRoute } from '../../utils/track-by';
import { NavigationService } from '../../services/navigation.service';
import icRadioButtonChecked from '@iconify/icons-ic/twotone-radio-button-checked';
import icRadioButtonUnchecked from '@iconify/icons-ic/twotone-radio-button-unchecked';
import { LayoutService } from '../../services/layout.service';
import { ConfigService } from '../../services/config.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'vex-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Input() collapsed: boolean;
  collapsedOpen$ = this.layoutService.sidenavCollapsedOpen$;
  title$ = this.configService.config$.pipe(map(config => config.sidenav.title));
  imageUrl$ = this.configService.config$.pipe(map(config => config.sidenav.imageUrl));
  showCollapsePin$ = this.configService.config$.pipe(map(config => config.sidenav.showCollapsePin));

  items = this.navigationService.items;
  items_worker = this.navigationService.items_worker;
  items_client = this.navigationService.items_client;
  items_admin = this.navigationService.items_admin;
  items_team = this.navigationService.items_team;
  trackByRoute = trackByRoute;
  icRadioButtonChecked = icRadioButtonChecked;
  icRadioButtonUnchecked = icRadioButtonUnchecked;
  type;
  constructor(private navigationService: NavigationService,
              private layoutService: LayoutService,
              private configService: ConfigService) { }

  ngOnInit() {
    this.type = localStorage.getItem('loggedIn');
  }

  onMouseEnter() {
    this.layoutService.collapseOpenSidenav();
  }

  onMouseLeave() {
    this.layoutService.collapseCloseSidenav();
  }

  toggleCollapse() {
    this.collapsed ? this.layoutService.expandSidenav() : this.layoutService.collapseSidenav();
  }
}
