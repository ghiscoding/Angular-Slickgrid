export class MouseService {
  attachOnMouseHover(grid: any) {
    grid.onMouseEnter.subscribe((e: any) => {
      const cell = grid.getCellFromEvent(e);
      if (cell && cell.row >= 0) {
        grid.setSelectedRows([cell.row]);
        e.preventDefault();
      }
    });
    grid.onMouseLeave.subscribe((e: any) => {
      grid.setSelectedRows([]);
      e.preventDefault();
    });
  }
}
