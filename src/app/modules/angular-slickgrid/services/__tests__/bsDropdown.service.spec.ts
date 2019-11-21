import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularUtilService } from '../angularUtil.service';
import { BsDropDownService } from '../bsDropdown.service';

const gridId = 'grid1';
const gridUid = 'slickgrid_124343';
const containerId = 'demo-container';

const angularUtilServiceStub = {
  createAngularComponent: jest.fn(),
  createAngularComponentAppendToDom: jest.fn(),
};

const gridStub = {
  getDataItem: jest.fn(),
};

// define a <div> container to simulate the grid container
const gridTemplate =
  `<div id="${containerId}" style="height: 800px; width: 600px; overflow: hidden; display: block;">
    <div id="slickGridContainer-${gridId}" class="gridPane" style="width: 100%;">
    <div id="${gridId}" class="${gridUid}" style="width: 100%">
      <div class="slick-viewport" style="height: 300px"></div>
    </div>
    </div>
  </div>`;

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
    div.innerHTML = gridTemplate;
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
      let mockComponent;

      beforeEach(() => {
        mockComponent = {
          domElement: div,
          componentRef: {
            instance: { dropdownId: 'myDropId2', dropDownToggleId: 'myToggleId2' }
          }
        };
      });

      it('should render the dropdown DOM element', async () => {
        const spy = jest.spyOn(angularUtilServiceStub, 'createAngularComponent').mockReturnValue(mockComponent);

        await service.render({
          component: TestComponent,
          args: { row: 0, cell: 0, grid: gridStub },
          parent: {}
        });

        expect(spy).toHaveBeenCalledWith(TestComponent);
        expect(service.domElement).toBeTruthy();
        expect(service.domContainerElement).toBeTruthy();
      });

      it('should remove the DOM element when scrolling the grid', async () => {
        const compSpy = jest.spyOn(angularUtilServiceStub, 'createAngularComponent').mockReturnValue(mockComponent);
        const disposeSpy = jest.spyOn(service, 'dispose');

        await service.render({
          component: TestComponent,
          args: { row: 0, cell: 0, grid: gridStub },
          parent: {}
        });

        service.gridViewport.trigger('scroll');

        expect(compSpy).toHaveBeenCalledWith(TestComponent);
        expect(service.gridViewport).toBeTruthy();
        expect(disposeSpy).toHaveBeenCalledTimes(2);
        expect(service.domContainerElement).toBeTruthy();
      });

      it('should remove the DOM element after clicking on an item from the Action list', async () => {
        const compSpy = jest.spyOn(angularUtilServiceStub, 'createAngularComponent').mockReturnValue(mockComponent);
        const disposeSpy = jest.spyOn(service, 'dispose');

        await service.render({
          component: TestComponent,
          args: { row: 0, cell: 0, grid: gridStub },
          parent: {}
        });

        service.domElement.trigger('click');

        expect(compSpy).toHaveBeenCalledWith(TestComponent);
        expect(service.domElement).toBeTruthy();
        expect(disposeSpy).toHaveBeenCalledTimes(2);
        expect(service.domContainerElement).toBeTruthy();
      });

      it('should show the dropdown container DOM element after dropdown triggers an hiding event', async () => {
        const compSpy = jest.spyOn(angularUtilServiceStub, 'createAngularComponent').mockReturnValue(mockComponent);
        const disposeSpy = jest.spyOn(service, 'dispose');
        const showSpy = jest.spyOn(service, 'dropContainerShow');

        await service.render({
          component: TestComponent,
          args: { row: 0, cell: 0, grid: gridStub },
          parent: {}
        });

        service.domElement.trigger('hidden.bs.dropdown');

        expect(compSpy).toHaveBeenCalledWith(TestComponent);
        expect(service.domElement).toBeTruthy();
        expect(disposeSpy).toHaveBeenCalledTimes(1);
        expect(showSpy).toHaveBeenCalled();
        expect(service.domContainerElement).toBeTruthy();
      });

      it('should drop up when window height is below parent div offset top', async () => {
        const divDropdown = document.createElement('div');
        divDropdown.className = 'dropdown-menu';
        divDropdown.style.height = '200px';
        div.appendChild(divDropdown);
        const compSpy = jest.spyOn(angularUtilServiceStub, 'createAngularComponent').mockReturnValue(mockComponent);
        const disposeSpy = jest.spyOn(service, 'dispose');
        const showSpy = jest.spyOn(service, 'dropContainerShow');

        Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 100 });
        Object.defineProperty(div, 'offsetTop', { writable: true, configurable: true, value: 150 });
        window.dispatchEvent(new Event('resize'));
        div.dispatchEvent(new Event('resize'));
        await service.render({
          component: TestComponent,
          args: { row: 0, cell: 0, grid: gridStub },
          parent: {}
        });

        service.domElement.trigger('hidden.bs.dropdown');

        expect(service.domElement[0].style.marginTop).toBe('-40px');
        expect(compSpy).toHaveBeenCalledWith(TestComponent);
        expect(service.domElement).toBeTruthy();
        expect(disposeSpy).toHaveBeenCalledTimes(1);
        expect(showSpy).toHaveBeenCalled();
        expect(service.domContainerElement).toBeTruthy();
      });
    });
  });
});

