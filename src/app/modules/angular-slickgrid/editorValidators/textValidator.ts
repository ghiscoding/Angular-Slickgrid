import { Constants } from '../constants';
import { EditorValidatorOutput } from '../models/editorValidatorOutput.interface';
import { EditorValidator } from '../models/editorValidator.interface';

interface TextValidatorOptions {
  editorArgs: any;
  errorMessage?: string;
  required?: boolean;
  validator?: EditorValidator;
}

export function textValidator(inputValue: any, options: TextValidatorOptions): EditorValidatorOutput {
  const isRequired = options.required;
  const errorMsg = options.errorMessage;

  if (options.validator) {
    return options.validator(inputValue, options.editorArgs);
  }

  // by default the editor is almost always valid (except when it's required but not provided)
  if (isRequired && inputValue === '') {
    return {
      valid: false,
      msg: errorMsg || Constants.VALIDATION_REQUIRED_FIELD
    };
  }

  return { valid: true, msg: null };
}
