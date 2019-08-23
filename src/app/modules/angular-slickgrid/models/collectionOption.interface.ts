import { FilterMultiplePassType } from './filterMultiplePassType.enum';
import { FilterMultiplePassTypeString } from './filterMultiplePassTypeString';

export interface CollectionOption {
  /**
   * Optionally add a blank entry to the beginning of the collection.
   * Useful when we want to return all data by setting an empty filter that might not exist in the original collection
   */
  addBlankEntry?: boolean;

  /** @deprecated please use "collectionInsideObjectProperty" instead */
  collectionInObjectProperty?: string;

  /**
   * When the collection is inside an object descendant property
   * we can optionally pass a dot (.) notation string to pull the collection from an object property.
   * For example if our output data returned by the collectionAsync is inside an object of the following format:
   * myData = { someProperty: { myCollection: [] }, otherProperty: 'something' }
   * We can pass the dot notation string
   * collectionInsideObjectProperty: 'someProperty.myCollection'
   */
  collectionInsideObjectProperty?: string;

  /**
   * Defaults to "chain", when using multiple "collectionFilterBy", do we want to "merge" or "chain" the result after each pass?
   * For example if we have 2 filters to pass by, and we start with pass 1 returning 7 items and last pass returning 5 items
   * "chain" is the default and will return 5 items, since the result of each pass will be used by the next pass
   * "merge" would return the merge of the 7 items and the 5 items (without duplicates), since some items might be the same, the result is anywhere between 5 to 13 items
   */
  filterResultAfterEachPass?: FilterMultiplePassType | FilterMultiplePassTypeString;

  /** defaults to empty, when using label with prefix/suffix, do we want to add a separator between each text (like a white space) */
  separatorBetweenTextLabels?: string;

  /** defaults to false, should the selected value include the prefix/suffix in the output format */
  includePrefixSuffixToSelectedValues?: boolean;
}
