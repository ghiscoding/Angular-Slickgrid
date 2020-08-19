export interface EditorValidatorOutput {
  /** Did the validation pass? */
  valid: boolean;

  /** Validation Error Message when field is invalid */
  msg?: string | null;
}
