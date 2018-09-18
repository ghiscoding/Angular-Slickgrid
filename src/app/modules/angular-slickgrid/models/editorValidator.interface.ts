import { EditorArgs, EditorValidatorOutput } from './index';

export type EditorValidator = (value: any, args?: EditorArgs) => EditorValidatorOutput;
