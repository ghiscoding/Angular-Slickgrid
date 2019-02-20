import { ComponentRef } from '@angular/core';
import {
  AngularUtilService,
  Column,
  Editor,
  EditorValidator,
  EditorValidatorOutput,
} from './../modules/angular-slickgrid';

/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export class CustomAngularComponentEditor implements Editor {
  /** Angular Component Reference */
  componentRef: ComponentRef<any>;

  /** default item Id */
  defaultId: string;

  /** default item object */
  defaultItem: any;

  constructor(private args: any) {
    this.init();
  }

  /** Angular Util Service */
  get angularUtilService(): AngularUtilService {
    return this.columnDef && this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.params.angularUtilService;
  }

  /** Get the Collection */
  get collection(): any[] {
    return this.columnDef && this.columnDef && this.columnDef.internalColumnEditor.collection || [];
  }

  /** Get Column Definition object */
  get columnDef(): Column {
    return this.args && this.args.column || {};
  }

  /** Get Column Editor object */
  get columnEditor(): any {
    return this.columnDef && this.columnDef.internalColumnEditor || {};
  }

  get hasAutoCommitEdit() {
    return this.args.grid.getOptions().autoCommitEdit;
  }

  /** Get the Validator function, can be passed in Editor property or Column Definition */
  get validator(): EditorValidator {
    return this.columnEditor.validator || this.columnDef.validator;
  }

  init() {
    if (!this.columnEditor || !this.columnEditor.params.component || !(this.columnEditor.params.angularUtilService instanceof AngularUtilService)) {
      throw new Error(`[Angular-Slickgrid] For the Editors.angularComponent to work properly, you need to provide your component to the "component" property and make sure to add it to your "entryComponents" array.
      Example: this.columnDefs = [{ id: 'title', field: 'title', editor: { model: Editors.angularComponent, collection: [...] }, params: { component: MyComponent, angularUtilService: this.angularUtilService }`);
    }
    if (this.columnEditor && this.columnEditor.params.component) {
      const angularUtilService = this.columnEditor.params.angularUtilService as AngularUtilService;
      const componentOutput = angularUtilService.createAngularComponentAppendToDom(this.columnEditor.params.component, this.args.container);
      this.componentRef = componentOutput && componentOutput.componentRef;
      Object.assign(this.componentRef.instance, { collection: this.collection });

      this.componentRef.instance.onModelChanged.subscribe((item) => {
        this.save();
      });
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
    if (this.args && this.args.cancelChanges) {
      this.args.cancelChanges();
    }
  }

  hide() {
    // optional, implement a hide method on your Angular Component
    if (this.componentRef && this.componentRef.instance && typeof this.componentRef.instance.hide === 'function') {
      this.componentRef.instance.hide();
    }
  }

  show() {
    // optional, implement a show method on your Angular Component
    if (this.componentRef && this.componentRef.instance && typeof this.componentRef.instance.show === 'function') {
      this.componentRef.instance.show();
    }
  }

  destroy() {
    // destroy the Angular Component
    if (this.componentRef && this.componentRef.destroy) {
      this.componentRef.destroy();
    }
  }

  focus() {
    // optional, implement a focus method on your Angular Component
    if (this.componentRef && this.componentRef.instance && typeof this.componentRef.instance.focus === 'function') {
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
    const itemObject = item && item[this.columnDef.field];
    this.componentRef.instance.selectedId = itemObject && itemObject.id || '';
    this.componentRef.instance.selectedItem = itemObject && itemObject;
  }

  serializeValue(): any {
    return this.componentRef.instance.selectedItem;
  }

  isValueChanged() {
    return (!(this.componentRef.instance.selectedId === '' && this.defaultId == null)) && (this.componentRef.instance.selectedId !== this.defaultId);
  }

  validate(): EditorValidatorOutput {
    if (this.validator) {
      const value = this.componentRef.instance.selectedId;
      const validationResults = this.validator(value, this.args);
      if (!validationResults.valid) {
        return validationResults;
      }
    }

    // by default the editor is always valid
    // if user want it to be required, he would have to provide his own validator
    return {
      valid: true,
      msg: null
    };
  }
}
