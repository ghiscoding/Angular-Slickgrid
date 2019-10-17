import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularUtilService } from '../angularUtil.service';
import { BsDropDownService } from '../bsDropdown.service';

const DOM_ELEMENT_ID = 'row-detail123';
const DOM_PARENT_ID = 'parent-detail';

const angularUtilServiceStub = {
  createAngularComponent: jest.fn(),
  createAngularComponentAppendToDom: jest.fn(),
};

const gridStub = {
  getDataItem: jest.fn(),
};

@Component({
  template: `<h4>Test Component...</h4>`
})
export class TestComponent { }

describe('bsdropdown-service', () => {
  let div: HTMLDivElement;
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let service: BsDropDownService;

  beforeEach(() => {
    // define a <div> container to simulate a row detail DOM element
    div = document.createElement('div');
    div.innerHTML = `<div id="${DOM_PARENT_ID}">parent text</div><div id="${DOM_ELEMENT_ID}">some text</div>`;
    document.body.appendChild(div);

    TestBed.configureTestingModule({
      declarations: [TestComponent],
      providers: [
        BsDropDownService,
        { provide: AngularUtilService, useValue: angularUtilServiceStub },
      ]
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    service = TestBed.get(BsDropDownService);
  });

  describe('BsDropDownService', () => {
    it('should create the service', () => {
      expect(service).toBeTruthy();
    });

    describe('render method', () => {
      it('should show check is the dropdown is displayed after clic', (done) => {
        const mockComponent = {
          domElement: div,
          componentRef: {
            instance: { dropdownId: 'myDropId2', dropDownToggleId: 'myToggleId2' }
          }
        };
        const spy = jest.spyOn(angularUtilServiceStub, 'createAngularComponent').mockReturnValue(mockComponent);

        service.render({
          component: TestComponent,
          args: { row: 0, cell: 0, grid: gridStub },
          parent: {}
        });

        setTimeout(() => {
          expect(spy).toHaveBeenCalledWith(TestComponent);
          done();
        });
      });
    });
  });
});

