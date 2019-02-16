import {
  AngularUtilService,
  Column,
  CollectionOption,
  Editor,
  EditorValidator,
  EditorValidatorOutput,
  GridOption,
} from './../modules/angular-slickgrid';

// using external non-typed js libraries
declare var $: any;

/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export class CustomAngularComponentEditor implements Editor {
  /** Grid options */
  gridOptions: GridOption;

  $input: any;
  defaultValue: any;

  constructor(private args: any) {
    this.gridOptions = this.args.grid.getOptions() as GridOption;
    const gridOptions = this.gridOptions || this.args.column.params || {};

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

  /** Getter for the Collection Options */
  get collectionOptions(): CollectionOption {
    return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.collectionOptions;
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
    if (!this.columnEditor || !this.columnEditor.params.component) {
      throw new Error(`[Angular-Slickgrid] For the Editors.angularComponent to work properly, you need to provide your component to the "component" property and make sure to add it to your "entryComponents" array.
      Example: this.columnDefs = [{ id: 'title', field: 'title', editor: { component: MyComponent, model: Editors.angularComponent, collection: [...] },`);
    }
    if (this.columnEditor && this.columnEditor.params.component) {
      const compRef = this.columnEditor.params.angularUtilService.appendAngularComponentToDom(this.columnEditor.params.component, this.args.container);
      Object.assign(compRef.instance, { collection: this.collection });
    }
  }

  save() {

  }

  cancel() {

  }

  hide() {

  }

  show() {

  }

  position(position: any) {

  }

  destroy() {
    $('#ngSelectContainer').appendTo('#editorsContainer');
  }

  focus() {

  }

  applyValue(item: any, state: any) {

  }

  getValue() {
    return this.$input.val();
  }

  loadValue(item: any) {

  }

  serializeValue(): any {

  }

  isValueChanged(): boolean {
    return false;
  }

  validate(): EditorValidatorOutput {
    if (this.validator) {
      const value = this.$input && this.$input.val && this.$input.val();
      const validationResults = this.validator(value, this.args);
      if (!validationResults.valid) {
        return validationResults;
      }
    }

    // by default the editor is always valid
    // if user want it to be a required checkbox, he would have to provide his own validator
    return {
      valid: true,
      msg: null
    };
  }
}
