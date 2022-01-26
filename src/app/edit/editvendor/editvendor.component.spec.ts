/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditvendorComponent } from './editvendor.component';

describe('EditvendorComponent', () => {
  let component: EditvendorComponent;
  let fixture: ComponentFixture<EditvendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditvendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditvendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
