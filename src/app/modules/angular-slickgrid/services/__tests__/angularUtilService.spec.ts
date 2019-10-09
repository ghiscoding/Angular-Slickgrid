import { ApplicationRef, Component, ComponentFactoryResolver, Injector } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AngularUtilService } from '..';

const DOM_ELEMENT_ID = 'row-detail123';
const DOM_PARENT_ID = 'parent-detail';
jest.mock('flatpickr', () => { });

const componentFactoryResolverStub = {
  create: jest.fn(),
  resolveComponentFactory: jest.fn(),
} as ComponentFactoryResolver;

const applicationRefStub = {
  attachView: jest.fn(),
} as unknown as ApplicationRef;

const injectorStub = {} as Injector;

@Component({
  template: `<h4>Loading...</h4>`
})
export class TestPreloadComponent { }

describe('AngularUtilService', () => {
  let service: AngularUtilService;
  let fixture: ComponentFixture<TestPreloadComponent>;
  let component: TestPreloadComponent;

  beforeEach(() => {
    // define a <div> container to simulate a row detail DOM element
    const div = document.createElement('div');
    div.innerHTML = `<div id="${DOM_PARENT_ID}">parent text</div><div id="${DOM_ELEMENT_ID}">some text</div>`;
    document.body.appendChild(div);

    TestBed.configureTestingModule({
      declarations: [TestPreloadComponent],
      providers: [
        AngularUtilService,
        { provide: ApplicationRef, useValue: applicationRefStub },
        { provide: ComponentFactoryResolver, useValue: componentFactoryResolverStub },
        { provide: Injector, useValue: injectorStub },
      ]
    });
    fixture = TestBed.createComponent(TestPreloadComponent);
    component = fixture.componentInstance;
    service = TestBed.get(AngularUtilService);
  });

  afterEach(() => {
    const domElm = document.getElementById(DOM_ELEMENT_ID);
    domElm.innerHTML = 'some text';
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  describe('createAngularComponent method', () => {
    let domElm: HTMLElement;
    let mockComponentFactory;

    beforeEach(() => {
      domElm = document.getElementById(DOM_ELEMENT_ID);
      mockComponentFactory = { hostView: { rootNodes: [domElm] } };
    });

    it('should create an Angular Component and add it to the current component DOM tree', () => {
      // @ts-ignore
      const spyResolver = jest.spyOn(componentFactoryResolverStub, 'resolveComponentFactory').mockReturnValue({ create: () => mockComponentFactory });
      const spyAttachView = jest.spyOn(applicationRefStub, 'attachView');

      const output = service.createAngularComponent(TestPreloadComponent);

      expect(spyResolver).toHaveBeenCalled();
      expect(spyAttachView).toHaveBeenCalled();
      expect(output).toEqual({ componentRef: mockComponentFactory, domElement: domElm });
    });
  });

  describe('createAngularComponentAppendToDom method', () => {
    let domElm: HTMLElement;
    let domParentElm: HTMLElement;
    let mockComponentFactory;

    beforeEach(() => {
      domElm = document.getElementById(DOM_ELEMENT_ID);
      domParentElm = document.getElementById(DOM_PARENT_ID);
      mockComponentFactory = { hostView: { rootNodes: [domElm] } };
    });

    it('should an angular component and append it to the DOM tree in the document body', () => {
      // @ts-ignore
      const spyResolver = jest.spyOn(componentFactoryResolverStub, 'resolveComponentFactory').mockReturnValue({ create: () => mockComponentFactory });
      const spyAttachView = jest.spyOn(applicationRefStub, 'attachView');
      const spyBody = jest.spyOn(document.body, 'appendChild');

      const output = service.createAngularComponentAppendToDom(TestPreloadComponent);

      expect(spyResolver).toHaveBeenCalled();
      expect(spyAttachView).toHaveBeenCalled();
      expect(spyBody).toHaveBeenCalled();
      expect(output).toEqual({ componentRef: mockComponentFactory, domElement: domElm });
    });

    it('should an angular component and append it to the current component DOM tree, which also contains the parent node text', () => {
      // @ts-ignore
      const spyResolver = jest.spyOn(componentFactoryResolverStub, 'resolveComponentFactory').mockReturnValue({ create: () => mockComponentFactory });
      const spyAttachView = jest.spyOn(applicationRefStub, 'attachView');
      const spyElement = jest.spyOn(domParentElm, 'appendChild');

      const output = service.createAngularComponentAppendToDom(TestPreloadComponent, domParentElm);

      expect(spyResolver).toHaveBeenCalled();
      expect(spyAttachView).toHaveBeenCalled();
      expect(spyElement).toHaveBeenCalled();
      expect(domParentElm.innerHTML).toBe('parent text<div id="row-detail123">some text</div>');
      expect(output).toEqual({ componentRef: mockComponentFactory, domElement: domElm });
    });

    it('should an angular component and append it to the current component DOM tree, which will have its parent node text emptied (because of 3rd flag)', () => {
      // @ts-ignore
      const spyResolver = jest.spyOn(componentFactoryResolverStub, 'resolveComponentFactory').mockReturnValue({ create: () => mockComponentFactory });
      const spyAttachView = jest.spyOn(applicationRefStub, 'attachView');
      const spyElement = jest.spyOn(domParentElm, 'appendChild');

      const output = service.createAngularComponentAppendToDom(TestPreloadComponent, domParentElm, true);

      expect(spyResolver).toHaveBeenCalled();
      expect(spyAttachView).toHaveBeenCalled();
      expect(spyElement).toHaveBeenCalled();
      expect(domParentElm.innerHTML).toBe('<div id="row-detail123">some text</div>');
      expect(output).toEqual({ componentRef: mockComponentFactory, domElement: domElm });
    });
  });
});
