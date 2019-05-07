import { GridOption } from './../models/gridOption.interface';
import { TestBed, async } from '@angular/core/testing';
import { ResizerService } from './resizer.service';
import { Component } from '@angular/core';

const gridOptionMock = {
  gridId: 'grid1',
  autoResize: { containerId: 'demo-container' },
  enableAutoResize: true
} as GridOption;

const gridStub = {
  getOptions: () => gridOptionMock,
  getUID: () => 'abc123',
};

// define a <div> container to simulate the grid container
@Component({
  template: `<div id="grid1"></div>`
})
class TestComponent { }

describe('Resizer Service', () => {
  let service: ResizerService;

  beforeEach(() => {
    const fixture = TestBed.configureTestingModule({
      declarations: [TestComponent]
    })
      .createComponent(TestComponent);

    service = new ResizerService();
    service.init(gridStub);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should trigger a grid resize on a window resize', () => {
    // arrange
    const gridSpy = jest.spyOn(gridStub, 'getOptions');
    const serviceSpy = jest.spyOn(service, 'resizeGrid');

    // act
    // bind window resize & call a viewport resize
    service.bindAutoResizeDataGrid();
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 500 });
    window.dispatchEvent(new Event('resize'));

    // assert
    expect(gridSpy).toHaveBeenCalled();
    expect(serviceSpy).toHaveBeenCalled();
  });
});
