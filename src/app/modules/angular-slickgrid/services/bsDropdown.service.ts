
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
  constructor(private angularUtilService: AngularUtilService) { }

  render(dropdownParams: DropDownServiceParams) {
    const { component, args, parent, offsetTop, offsetLeft, offsetDropupBottom } = dropdownParams;

    const cell = args.cell;
    const row = args.row;

    // hide the dropdown we created as a formatter Component, we'll redisplay it later
    const cellPos = $(`#myDrop-r${row}-c${cell}`).offset();

    const componentOutput = this.angularUtilService.createAngularComponent(component);
    const componentInstance = componentOutput && componentOutput.componentRef && componentOutput.componentRef.instance;

    if (componentInstance) {
      const myDropId = componentInstance.dropdownId || 'myDrop';
      const dropDownToggleId = componentInstance.dropDownToggleId || 'dropdownMenu1';

      // make sure to remove previous Action dropdown to avoid having multiple element of the same on top of each other
      $('#' + myDropId).remove();

      // assign the row data to the dropdown component instance
      Object.assign(componentInstance, { parent, row: args.row, dataContext: args.grid.getDataItem(args.row) });

      // use a delay to make sure Angular ran at least a full cycle and make sure it finished rendering the Component before using it
      setTimeout(() => {
        const elm = $(componentOutput.domElement);
        const topPos = (cellPos && cellPos.top || 0) + 30 + (offsetTop || 0);
        const leftPos = (cellPos && cellPos.left || 0) + (offsetLeft || 0);
        elm.appendTo('body');
        elm.css('position', 'absolute');
        elm.css('top', topPos);
        elm.css('left', leftPos);
        $(`#${myDropId}`).addClass('open');
        $(`#${dropDownToggleId}`).hide();

        // check if it should drop Up or Down
        const offset = 35;
        const iElement = $('.dropdown-menu');
        const iElementWrapper = iElement.parent();
        const IElementWrapperOffset = iElementWrapper.offset() || {};
        const iElementWrapperOffsetTop = IElementWrapperOffset.top;
        const iElementHeight = iElement.height();
        const windowHeight = $(window).height();
        const shouldDropUp = (windowHeight - iElementHeight - offset) < iElementWrapperOffsetTop;
        let menuMarginTop = '0px';
        if (shouldDropUp) {
          const offsetBottom = offsetDropupBottom || 0;
          menuMarginTop = '-'.concat(`${iElementHeight + offset + offsetBottom + 5}`, 'px');
        }
        elm.css({ 'margin-top': menuMarginTop });

        // set dropdown margin left according to the document width
        const parentOffset = IElementWrapperOffset.left;
        const leftMargin = parentOffset - $(document).width();
        elm.css({ 'margin-left': (elm.width() + leftMargin + 60) + 'px' });

        $(`#${myDropId}`).on('hidden.bs.dropdown', () => {
          $(`#myDrop-r${row}-c${cell}`).show();
        });

        // hide dropdown menu on grid scroll
        $('.slick-viewport').on('scroll', () => {
          $(`#${myDropId}`).remove();
        });
      });
    }
  }
}
