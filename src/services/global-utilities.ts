declare interface StringConstructor {
  allTitleCase(inputStr: string): string;
  format(inputStr: string, args: any): string;
  padZero(length: number): string;
  trim(inputStr: string): string;
  titleCase(inputStr: string): string;
}


String.format = function(format: string, args: any): string {
  // const args = (Array.isArray(arguments[1])) ? arguments[1] : Array.prototype.slice.call(arguments, 1);

  return format.replace(/{(\d+)}/g, function (match, number) {
    return (typeof args[number] !== 'undefined') ? args[number] : match;
  });
};

String.padZero = function (this: string, length: number) {
  let s = this;
  while (s.length < length) {
    s = '0' + s;
  }
  return s;
};

/**
 * Trim any extra white space from the string
 * @param string inputStr
 * @returns string outputStr
 */
String.trim = function(inputStr: string): string {
  return inputStr ? inputStr.replace(/\s+/g, ' ') : inputStr;
};

/**
 * Title case the complete sentence (upper case first char of each word while changing everything else to lower case)
 * @param string inputStr
 * @returns string outputStr
 */
String.allTitleCase = function(inputStr: string): string {
  return inputStr.replace(/\w\S*/g, function(outputStr) {
     return outputStr.charAt(0).toUpperCase() + outputStr.substr(1).toLowerCase();
  });
};

/**
 * Title case the complete sentence (upper case first char of each word while changing everything else to lower case)
 * @param string inputStr
 * @returns string outputStr
*/
String.titleCase = function(inputStr: string): string {
  return inputStr.charAt(0).toUpperCase() + inputStr.slice(1);
};
