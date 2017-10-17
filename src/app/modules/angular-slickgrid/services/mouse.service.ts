export class MouseService {
  attachOnMouseHover(grid: any) {
    grid.onMouseEnter.subscribe(function (e: any) {
      const cell = grid.getCellFromEvent(e);
      if (cell && cell.row >= 0) {
        grid.setSelectedRows([cell.row]);
        e.preventDefault();
      }
    });
    grid.onMouseLeave.subscribe(function (e: any) {
      grid.setSelectedRows([]);
      e.preventDefault();
    });
  }
}
