import { Component, OnInit, Input } from '@angular/core';
import icCheckCircle from '@iconify/icons-ic/twotone-check-circle';
import icStar from '@iconify/icons-ic/twotone-star';

@Component({
  selector: 'vex-widget-assistant',
  templateUrl: './widget-assistant.component.html',
  styleUrls: ['./widget-assistant.component.scss']
})
export class WidgetAssistantComponent implements OnInit {

  icCheckCircle = icCheckCircle;
  icStar = icStar;
  @Input() valueFlag: string;
  @Input() numberPending: number;
  constructor() { }

  ngOnInit() {
  }

}
