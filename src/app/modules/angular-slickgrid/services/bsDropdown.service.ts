
import { Injectable } from '@angular/core';
import { AngularUtilService } from './angularUtil.service';

interface DropDownServiceParams {
  /** the custom action formatter component that contains the dropdown */
  component: any;

  /** help to get the data context */
  args: any;

  /** parent container */
  parent: any;

  /** Offset bottom when using a Drop Up, if we need to reposition the dropdown component */
  offsetDropupBottom?: number;

  /** Offset left if we need to reposition the dropdown component */
  offsetLeft?: number;

  /** Offset top if we need to reposition the dropdown component */
  offsetTop?: number;
}

// using external non-typed js libraries
declare var $: any;

// Boostrap dropdown service
@Injectable()
export class BsDropDownService {
  private _domContainerElement: any;
  private _domElement: any;

  constructor(private angularUtilService: AngularUtilService) { }

  get domElement() {
    return this._domElement;
  }

  get domContainerElement() {
    return this._domContainerElement;
  }

  get gridViewport() {
    return $('.slick-viewport');
  }

  dispose() {
    if (this._domElement && this._domElement.remove) {
      this._domElement.remove();
    }
  }

  dropContainerShow() {
    if (this._domContainerElement && this._domContainerElement.show) {
      this._domContainerElement.show();
    }
  }

  render(dropdownParams: DropDownServiceParams) {
    return new Promise((resolve) => {
      const { component, args, parent, offsetTop, offsetLeft, offsetDropupBottom } = dropdownParams;

      const cell = args.cell;
      const row = args.row;

      this._domContainerElement = $(`#myDrop-r${row}-c${cell}`);

      if (this._domContainerElement) {
        // hide the dropdown we created as a formatter Component, we'll redisplay it later
        const cellPos = this._domContainerElement.offset();

        const componentOutput = this.angularUtilService.createAngularComponent(component);
        const componentInstance = componentOutput && componentOutput.componentRef && componentOutput.componentRef.instance;

        if (componentInstance) {
          const myDropId = componentInstance.dropdownId || 'myDrop';
          const dropDownToggleId = componentInstance.dropDownToggleId || 'dropdownMenu1';
          this._domElement = $(`#${myDropId}`);

          if (this._domElement) {
            // make sure to remove any previous Action dropdown elements, to avoid having multiple element of the same on top of each other
            this.dispose();

            // assign the row data to the dropdown component instance
            Object.assign(componentInstance, { parent, row: args.row, dataContext: args.grid.getDataItem(args.row) });

            // use a delay to make sure Angular ran at least a full cycle and make sure it finished rendering the Component before using it
            setTimeout(() => {
              // create a new dropdown element
              this._domElement = $(componentOutput.domElement);
              const topPos = (cellPos && cellPos.top || 0) + 30 + (offsetTop || 0);
              const leftPos = (cellPos && cellPos.left || 0) + (offsetLeft || 0);
              this._domElement.appendTo('body');
              this._domElement.css('position', 'absolute');
              this._domElement.css('top', topPos);
              this._domElement.css('left', leftPos);
              $(`#${myDropId}`).addClass('open');
              $(`#${dropDownToggleId}`).hide();

              // check if it should drop Up or Down
              const offset = 35;
              const iElement = $('.dropdown-menu');
              const iElementWrapper = iElement.parent();
              const iElementWrapperOffset = iElementWrapper.offset() || {};
              const iElementWrapperOffsetTop = iElementWrapperOffset.top || iElementWrapper && iElementWrapper.length > 0 && iElementWrapper[0].offsetTop;
              const iElementHeight = iElement.height();
              const windowHeight = window.innerHeight;
              const shouldDropUp = (windowHeight - iElementHeight - offset) < iElementWrapperOffsetTop;
              let menuMarginTop = '0px';
              if (shouldDropUp) {
                const offsetBottom = offsetDropupBottom || 0;
                menuMarginTop = '-'.concat(`${iElementHeight + offset + offsetBottom + 5}`, 'px');
              }
              this._domElement.css({ 'margin-top': menuMarginTop });

              // set dropdown margin left according to the document width
              const parentOffset = iElementWrapperOffset.left;
              const leftMargin = parentOffset - $(document).width();
              this._domElement.css({ 'margin-left': (this._domElement.width() + leftMargin + 60) + 'px' });

              try {
                this._domElement.dropdown('show'); // required for Bootstrap 4 only
              } catch (e) {
                // Bootstrap 3 wil throw an error since that method doesn't exist, we can safely disregard it
              }

              this._domElement.on('hidden.bs.dropdown', () => this.dropContainerShow());

              // hide dropdown menu on grid scroll
              this.gridViewport.on('scroll', () => this.dispose());

              // hide on dropdown click
              this._domElement.on('click', () => this.dispose());
              resolve(true);
            });
          }
        }
      }
    });
  }
}
