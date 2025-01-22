### Description
You can add Header and/or Footer to your grid by using `ng-template` within your `angular-slickgrid` component, it's as simple as that. Using these slots also has the advantage of being contained in the same container making them the same width as the grid container.

### Demo

[Demo](https://ghiscoding.github.io/Angular-Slickgrid/#/header-footer) / [Demo Component](https://github.com/ghiscoding/Angular-Slickgrid/blob/master/src/app/examples/grid-header-footer.component.ts)

### Basic Usage

##### Component

```html
<angular-slickgrid gridId="grid1" [columnDefinitions]="columnDefinitions" [gridOptions]="gridOptions" [dataset]="dataset">
  <ng-template #slickgridHeader>
    <h3>Grid with header and footer slot</h3>
  </ng-template>

  <ng-template #slickgridFooter>
    <custom-footer></custom-footer>
  </ng-template>
</angular-slickgrid>
```