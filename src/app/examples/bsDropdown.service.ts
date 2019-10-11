import { AngularGridInstance, AngularUtilService } from './../modules/angular-slickgrid';
import { Injectable } from '@angular/core';


interface DropDownServiceParams {
  grid: AngularGridInstance,
  formatter: any, // the custom action component that contains the dropdown
  args: any, // help to get the data context
  parent : any
}

declare var $:any;

// Boostrap dropdown service
@Injectable()
export class BsDropDownService {

  constructor(private angularUtilService: AngularUtilService) {}

  render(Params: DropDownServiceParams) {
    const { grid, formatter, args, parent} = Params;

    const myDropId = 'myDrop';
    const dropdownMenuId = 'dropdownMenu1';

    $('#'+ myDropId).remove(); // make sure to remove previous Action dropdown, you don't want to have 100 after a 100 clicks...
    const cell = args.cell;
    const row = args.row;

    // hide the dropdown we created as a Formatter, we'll redisplay it later
    const cellPos = $(`#myDrop-r${row}-c${cell}`).offset();

    const componentOutput = this.angularUtilService.createAngularComponent(formatter);

    // pass "this" and the row number to the Component instance (CustomActionFormatter) so that we can call "parent.deleteCell(row)" with (click)
    const metadata = grid.gridService.getColumnFromEventArguments(args);
    Object.assign(componentOutput.componentRef.instance, { parent, row: args.row, dataContext: metadata.dataContext });

    // use a delay to make sure Angular ran at least a full cycle and make sure it finished rendering the Component before using it
    setTimeout(() => {
 
      const elm = $(componentOutput.domElement);
      elm.appendTo('body');
      elm.css('position', 'absolute');
      elm.css('top', cellPos.top + 30);
      elm.css('left', cellPos.left);
      $(`#${myDropId}`).addClass('open');
      $(`#${dropdownMenuId}`).hide();
      // check if it should drop up or drop down
      var offset = 35;
      const iElement = $('.dropdown-menu');
      const iElementWrapper = iElement.parent();
      const iElementWrapperOffsetTop = iElementWrapper.offset().top;
      const iElementHeight = iElement.height();
      const windowHeight = $(window).height();
      const shouldDropUp = (windowHeight - iElementHeight - offset) < iElementWrapperOffsetTop;
      const menuMarginTop = shouldDropUp ? '-'.concat(`${iElementHeight + 40}`, 'px') : '0px';
      elm.css({ 'margin-top': menuMarginTop });

      // set dropdown margin left according to the document width
      const parentOfset = iElementWrapper.offset().left;
      const leftMargin = parentOfset - $(document).width();;

      elm.css({'margin-left': (elm.width() + leftMargin + 100) + 'px' });

      $(`#${myDropId}`).on('hidden.bs.dropdown', () => {
        $(`#myDrop-r${row}-c${cell}`).show();
      });

            
      // hide dropdown menu on grid scroll
      $(".slick-viewport").on( 'scroll', function(){
        $(`#${myDropId}`).remove();
     });

    });

  }
}
