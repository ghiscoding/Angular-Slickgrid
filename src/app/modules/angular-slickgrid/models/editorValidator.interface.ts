import { EditorValidatorOutput } from './editorValidatorOutput.interface';

export type EditorValidator = (value: any) => EditorValidatorOutput;
