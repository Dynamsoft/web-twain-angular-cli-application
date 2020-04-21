import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DwtComponent } from './dwt.component';

describe('DwtComponent', () => {
  let component: DwtComponent;
  let fixture: ComponentFixture<DwtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DwtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DwtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
