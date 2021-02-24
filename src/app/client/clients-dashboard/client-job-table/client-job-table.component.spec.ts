import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientJobTableComponent } from './client-job-table.component';

describe('ClientJobTableComponent', () => {
  let component: ClientJobTableComponent;
  let fixture: ComponentFixture<ClientJobTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientJobTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientJobTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
