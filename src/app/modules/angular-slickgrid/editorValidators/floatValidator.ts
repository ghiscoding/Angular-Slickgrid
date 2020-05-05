import { Constants } from '../constants';
import { EditorValidatorOutput } from '../models/editorValidatorOutput.interface';
import { EditorValidator } from '../models/editorValidator.interface';

interface FloatValidatorOptions {
  editorArgs: any;
  decimal?: number;
  errorMessage?: string;
  minValue?: string | number;
  maxValue?: string | number;
  operatorConditionalType?: 'inclusive' | 'exclusive';
  required?: boolean;
  validator?: EditorValidator;
}

export function floatValidator(inputValue: any, options: FloatValidatorOptions): EditorValidatorOutput {
  const floatNumber = !isNaN(inputValue as number) ? parseFloat(inputValue) : null;
  const decPlaces = options.decimal || 0;
  const isRequired = options.required;
  const minValue = options.minValue;
  const maxValue = options.maxValue;
  const operatorConditionalType = options.operatorConditionalType || 'inclusive';
  const errorMsg = options.errorMessage;
  const mapValidation = {
    '{{minValue}}': minValue,
    '{{maxValue}}': maxValue,
    '{{minDecimal}}': 0,
    '{{maxDecimal}}': decPlaces
  };
  let isValid = true;
  let outputMsg = '';

  if (typeof options.validator === 'function') {
    return options.validator(inputValue, options.editorArgs);
  } else if (isRequired && inputValue === '') {
    isValid = false;
    outputMsg = errorMsg || Constants.VALIDATION_REQUIRED_FIELD;
  } else if (inputValue !== '' && (isNaN(inputValue as number) || (decPlaces === 0 && !/^[-+]?(\d+(\.)?(\d)*)$/.test(inputValue)))) {
    // when decimal value is 0 (which is the default), we accept 0 or more decimal values
    isValid = false;
    outputMsg = errorMsg || Constants.VALIDATION_EDITOR_VALID_NUMBER;
  } else if (minValue !== undefined && maxValue !== undefined && floatNumber !== null && ((operatorConditionalType === 'exclusive' && (floatNumber <= minValue || floatNumber >= maxValue)) || (operatorConditionalType === 'inclusive' && (floatNumber < minValue || floatNumber > maxValue)))) {
    // MIN & MAX Values provided
    // when decimal value is bigger than 0, we only accept the decimal values as that value set
    // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
    isValid = false;
    outputMsg = errorMsg || Constants.VALIDATION_EDITOR_NUMBER_BETWEEN.replace(/{{minValue}}|{{maxValue}}/gi, (matched) => mapValidation[matched]);
  } else if (minValue !== undefined && floatNumber !== null && ((operatorConditionalType === 'exclusive' && floatNumber <= minValue) || (operatorConditionalType === 'inclusive' && floatNumber < minValue))) {
    // MIN VALUE ONLY
    // when decimal value is bigger than 0, we only accept the decimal values as that value set
    // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
    isValid = false;
    outputMsg = errorMsg || Constants.VALIDATION_EDITOR_NUMBER_MIN.replace(/{{minValue}}/gi, (matched) => mapValidation[matched]);
  } else if (maxValue !== undefined && floatNumber !== null && ((operatorConditionalType === 'exclusive' && floatNumber >= maxValue) || (operatorConditionalType === 'inclusive' && floatNumber > maxValue))) {
    // MAX VALUE ONLY
    // when decimal value is bigger than 0, we only accept the decimal values as that value set
    // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
    isValid = false;
    outputMsg = errorMsg || Constants.VALIDATION_EDITOR_NUMBER_MAX.replace(/{{maxValue}}/gi, (matched) => mapValidation[matched]);
  } else if ((decPlaces > 0 && !new RegExp(`^[-+]?(\\d*(\\.)?(\\d){0,${decPlaces}})$`).test(inputValue))) {
    // when decimal value is bigger than 0, we only accept the decimal values as that value set
    // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
    isValid = false;
    outputMsg = errorMsg || Constants.VALIDATION_EDITOR_DECIMAL_BETWEEN.replace(/{{minDecimal}}|{{maxDecimal}}/gi, (matched) => mapValidation[matched]);
  }

  return { valid: isValid, msg: outputMsg };
}
