import type { ComponentRef } from '@angular/core';
import type { Subscription } from 'rxjs';
import {
  AngularUtilService,
  type Column,
  type ColumnEditor,
  type Editor,
  type EditorValidator,
  type EditorValidationResult,
  type GridOption,
  type SlickGrid,
  unsubscribeAllObservables,
} from './../modules/angular-slickgrid';

/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export class CustomAngularComponentEditor implements Editor {
  private _subscriptions: Subscription[] = [];

  /** Angular Component Reference */
  componentRef!: ComponentRef<any>;

  /** default item Id */
  defaultId = '';

  /** default item object */
  defaultItem: any;

  /** SlickGrid grid object */
  grid: SlickGrid;

  constructor(private args: any) {
    this.grid = args?.grid;
    this.init();
  }

  /** Angular Util Service (could be inside the Grid Options Params or the Editor Params ) */
  get angularUtilService(): AngularUtilService {
    let angularUtilService = this.gridOptions && this.gridOptions.params && this.gridOptions.params.angularUtilService;
    if (!angularUtilService || !(angularUtilService instanceof AngularUtilService)) {
      angularUtilService = this.columnEditor && this.columnEditor.params && this.columnEditor.params.angularUtilService;
    }
    return angularUtilService;
  }

  /** Get the Collection */
  get collection(): any[] {
    return this.columnDef?.editor!.collection ?? [];
  }

  /** Get Column Definition object */
  get columnDef(): Column {
    return this.args?.column ?? {};
  }

  /** Get Column Editor object */
  get columnEditor(): ColumnEditor {
    return this.columnDef?.editor ?? {};
  }

  /** Getter for the Grid Options pulled through the Grid Object */
  get gridOptions(): GridOption {
    return (this.grid?.getOptions() ?? {}) as GridOption;
  }

  get hasAutoCommitEdit(): boolean {
    return this.gridOptions.autoCommitEdit ?? false;
  }

  /** Get the Validator function, can be passed in Editor property or Column Definition */
  get validator(): EditorValidator | undefined {
    return this.columnEditor.validator || this.columnDef.validator;
  }

  init() {
    if (!this.columnEditor || !this.columnEditor.params.component || !(this.angularUtilService instanceof AngularUtilService)) {
      throw new Error(`[Angular-Slickgrid] For Editor with Angular Component to work properly, you need to provide the "AngularUtilService" via the Editor "params" OR the Grid Options "params"
      Example: this.columnDefs = [{ id: 'title', field: 'title', editor: { model: CustomEditor, collection: [...], params: { component: MyComponent, angularUtilService: this.angularUtilService }}];
      OR this.columnDefs = [{ id: 'title', field: 'title', editor: { model: CustomEditor, collection: [...] }]; this.gridOptions = { params: { angularUtilService: this.angularUtilService }}`);
    }
    if (this.columnEditor?.params.component) {
      const componentOutput = this.angularUtilService.createAngularComponentAppendToDom(
        this.columnEditor.params.component,
        this.args.container
      );
      this.componentRef = componentOutput?.componentRef;

      // here we override the collection object of the Angular Component
      // but technically you can pass any values you wish to your Component
      Object.assign(this.componentRef.instance, { collection: this.collection });

      // when our model (item object) changes, we'll call a save of the slickgrid editor
      this._subscriptions.push(this.componentRef.instance.onItemChanged.subscribe((_item: any) => this.save()));
    }
  }

  save() {
    const validation = this.validate();
    if (validation && validation.valid) {
      if (this.hasAutoCommitEdit) {
        this.args.grid.getEditorLock().commitCurrentEdit();
      } else {
        this.args.commitChanges();
      }
    }
  }

  cancel() {
    this.componentRef.instance.selectedId = this.defaultId;
    this.componentRef.instance.selectedItem = this.defaultItem;
    if (this.args?.cancelChanges) {
      this.args.cancelChanges();
    }
  }

  /** optional, implement a hide method on your Angular Component */
  hide() {
    if (typeof this.componentRef?.instance.hide === 'function') {
      this.componentRef.instance.hide();
    }
  }

  /** optional, implement a show method on your Angular Component */
  show() {
    if (typeof this.componentRef?.instance.show === 'function') {
      this.componentRef.instance.show();
    }
  }

  /** destroy the Angular Component & Subscription */
  destroy() {
    if (this.componentRef?.destroy) {
      this.componentRef.destroy();
    }

    // also unsubscribe all Angular Subscriptions
    unsubscribeAllObservables(this._subscriptions);
  }

  /** optional, implement a focus method on your Angular Component */
  focus() {
    if (typeof this.componentRef?.instance.focus === 'function') {
      this.componentRef.instance.focus();
    }
  }

  applyValue(item: any, state: any) {
    item[this.columnDef.field] = state;
  }

  getValue() {
    return this.componentRef.instance.selectedId;
  }

  loadValue(item: any) {
    const itemObject = item?.[this.columnDef.field];
    this.componentRef.instance.selectedId = itemObject?.id || '';
    this.componentRef.instance.selectedItem = itemObject;
  }

  serializeValue(): any {
    return this.componentRef.instance.selectedItem;
  }

  isValueChanged() {
    return (
      !(this.componentRef.instance.selectedId === '' && (this.defaultId === null || this.defaultId === undefined)) &&
      this.componentRef.instance.selectedId !== this.defaultId
    );
  }

  validate(): EditorValidationResult {
    if (this.validator) {
      const value = this.componentRef.instance.selectedId;
      return this.validator(value, this.args);
    }

    // by default the editor is always valid
    // if user want it to be required, he would have to provide his own validator
    return {
      valid: true,
      msg: null,
    };
  }
}
