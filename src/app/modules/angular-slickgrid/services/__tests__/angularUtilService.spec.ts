import { Component, ViewContainerRef } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AngularUtilService } from '..';

const DOM_ELEMENT_ID = 'row-detail123';
const DOM_PARENT_ID = 'parent-detail';
jest.mock('flatpickr', () => { });

const viewContainerRefStub = {
  createComponent: jest.fn(),
  detectChanges: jest.fn(),
} as unknown as ViewContainerRef;

@Component({ template: `<h4>Loading...</h4>` })
class TestPreloadComponent { }

@Component({ template: `<h1>{{ title }}</h1>` })
class TestComponent { title = ''; }

describe('AngularUtilService', () => {
  let service: AngularUtilService;
  let fixture: ComponentFixture<TestPreloadComponent>;
  let component: TestPreloadComponent;

  beforeEach(async () => {
    // define a <div> container to simulate a row detail DOM element
    const div = document.createElement('div');
    div.innerHTML = `<div id="${DOM_PARENT_ID}">parent text</div><div id="${DOM_ELEMENT_ID}">some text</div>`;
    document.body.appendChild(div);

    await TestBed.configureTestingModule({
      declarations: [TestPreloadComponent],
      providers: [
        AngularUtilService,
        { provide: ViewContainerRef, useValue: viewContainerRefStub },
      ],
      teardown: { destroyAfterEach: false }
    });
    fixture = TestBed.createComponent(TestPreloadComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AngularUtilService);
  });

  afterEach(() => {
    const domElm = document.getElementById(DOM_ELEMENT_ID) as HTMLDivElement;
    domElm.innerHTML = 'some text';
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  describe('createAngularComponent method', () => {
    let domElm: HTMLElement;
    let domParentElm: HTMLElement;
    let mockComponentFactory: any;

    beforeEach(() => {
      domElm = document.getElementById(DOM_ELEMENT_ID) as HTMLDivElement;
      domParentElm = document.getElementById(DOM_PARENT_ID) as HTMLDivElement;
      mockComponentFactory = { hostView: { rootNodes: [domElm] }, instance: {}, changeDetectorRef: { detectChanges: jest.fn() } };
    });

    it('should create an Angular Component and add it to the current component DOM tree', () => {
      // @ts-ignore
      const createCompSpy = jest.spyOn(viewContainerRefStub, 'createComponent').mockReturnValue(mockComponentFactory);

      const output = service.createAngularComponent(TestPreloadComponent);

      expect(createCompSpy).toHaveBeenCalled();
      expect(output).toEqual({ componentRef: mockComponentFactory, domElement: domElm });
    });

    it('should create an Angular Component with optional target element and extra data to provide to the component instance', () => {
      const titleMock = 'Some Title';
      const h1Mock = document.createElement('h1');
      h1Mock.textContent = titleMock;
      mockComponentFactory.hostView.rootNodes[0] = h1Mock;
      // @ts-ignore
      const createCompSpy = jest.spyOn(viewContainerRefStub, 'createComponent').mockReturnValue(mockComponentFactory);
      const output = service.createAngularComponent(TestComponent, domParentElm, { title: titleMock });

      expect(createCompSpy).toHaveBeenCalled();
      expect(domParentElm.innerHTML).toBe('Some Title');
      expect(output).toEqual({ componentRef: mockComponentFactory, domElement: h1Mock });
    });
  });

  describe('createAngularComponentAppendToDom method', () => {
    let domElm: HTMLElement;
    let domParentElm: HTMLElement;
    let mockComponentFactory: any;

    beforeEach(() => {
      domElm = document.getElementById(DOM_ELEMENT_ID) as HTMLDivElement;
      domParentElm = document.getElementById(DOM_PARENT_ID) as HTMLDivElement;
      mockComponentFactory = { hostView: { rootNodes: [domElm] } };
    });

    it('should an angular component and append it to the DOM tree in the document body', () => {
      // @ts-ignore
      const createCompSpy = jest.spyOn(viewContainerRefStub, 'createComponent').mockReturnValue(mockComponentFactory);
      const spyBody = jest.spyOn(document.body, 'replaceChildren');

      const output = service.createAngularComponentAppendToDom(TestPreloadComponent);

      expect(createCompSpy).toHaveBeenCalled();
      expect(spyBody).toHaveBeenCalled();
      expect(output).toEqual({ componentRef: mockComponentFactory, domElement: domElm });
    });

    it('should an angular component and append it to the current component DOM tree, which will have its parent node replaced by the new html', () => {
      // @ts-ignore
      const createCompSpy = jest.spyOn(viewContainerRefStub, 'createComponent').mockReturnValue(mockComponentFactory);
      const spyElement = jest.spyOn(domParentElm, 'replaceChildren');

      const output = service.createAngularComponentAppendToDom(TestPreloadComponent, domParentElm);

      expect(createCompSpy).toHaveBeenCalled();
      expect(spyElement).toHaveBeenCalled();
      expect(domParentElm.innerHTML).toBe('<div id="row-detail123">some text</div>');
      expect(output).toEqual({ componentRef: mockComponentFactory, domElement: domElm });
    });
  });
});
