import { Constants } from '../constants';
import { EditorValidatorOutput } from '../models/editorValidatorOutput.interface';
import { EditorValidator } from '../models/editorValidator.interface';

interface SliderValidatorOptions {
  editorArgs: any;
  errorMessage?: string;
  minValue?: string | number;
  maxValue?: string | number;
  required?: boolean;
  validator?: EditorValidator;
}

export function sliderValidator(inputValue: any, options: SliderValidatorOptions): EditorValidatorOutput {
  const isRequired = options.required;
  const minValue = options.minValue;
  const maxValue = options.maxValue;
  const errorMsg = options.errorMessage;
  const mapValidation = {
    '{{minValue}}': minValue,
    '{{maxValue}}': maxValue
  };

  if (options.validator) {
    return options.validator(inputValue, options.editorArgs);
  } else if (isRequired && inputValue === '') {
    return {
      valid: false,
      msg: errorMsg || Constants.VALIDATION_REQUIRED_FIELD
    };
  } else if (minValue !== undefined && maxValue !== undefined && inputValue !== null && (inputValue < minValue || inputValue > maxValue)) {
    // when decimal value is bigger than 0, we only accept the decimal values as that value set
    // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
    return {
      valid: false,
      msg: errorMsg || Constants.VALIDATION_EDITOR_NUMBER_BETWEEN.replace(/{{minValue}}|{{maxValue}}/gi, (matched) => {
        return mapValidation[matched];
      })
    };
  }

  return { valid: true, msg: null };
}
