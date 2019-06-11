/**
 * This GraphqlQueryBuilder class is a lib that already exist
 * but was causing issues with TypeScript, RequireJS and other bundler/packagers
 * and so I rewrote it in pure TypeScript.
 *
 * The previous lib can be viewed here at this Github
 * https://github.com/codemeasandwich/graphql-query-builder
 */
export default class GraphqlQueryBuilder {
  alias: string | Function;
  head: any[] = [];
  body: any;

  /* Constructor, query/mutator you wish to use, and an alias or filter arguments. */
  constructor(private queryFnName: string, aliasOrFilter?: string | object) {
    if (typeof aliasOrFilter === 'string') {
      this.alias = aliasOrFilter;
    } else if (typeof aliasOrFilter === 'object') {
      this.filter(aliasOrFilter);
    } else if (aliasOrFilter === undefined && arguments.length === 2) {
      throw new TypeError(`You have passed undefined as Second argument to "Query"`);
    } else if (aliasOrFilter !== undefined) {
      throw new TypeError(`Second argument to "Query" should be an alias name(String) or filter arguments(Object). What was passed is: ${aliasOrFilter}`);
    }
  }

  /**
   * The parameters to run the query against.
   * @param filters An object mapping attribute to values
   */
  filter(filters: any) {
    for (const prop of Object.keys(filters)) {
      if (typeof filters[prop] === 'function') {
        continue;
      }
      const val = this.getGraphQLValue(filters[prop]);
      if (val === '{}') {
        continue;
      }
      this.head.push(`${prop}:${val}`);
    }
    return this;
  }

  /**
   * Outlines the properties you wish to be returned from the query.
   * @param properties representing each attribute you want Returned
   */
  find(...searches: any[]) { // THIS NEED TO BE A "FUNCTION" to scope 'arguments'
    if (!searches || !Array.isArray(searches) || searches.length === 0) {
      throw new TypeError(`find value can not be >>falsy<<`);
    }
    // if its a string.. it may have other values
    // else it sould be an Object or Array of maped values
    const searchKeys = (searches.length === 1 && Array.isArray(searches[0])) ? searches[0] : searches;
    this.body = this.parceFind(searchKeys);
    return this;
  }

  /**
   * set an alias for this result.
   * @param alias
   */
  setAlias(alias: string) {
    this.alias = alias;
  }

  /**
   * Return to the formatted query string
   * @return
   */
  toString() {
    if (this.body === undefined) {
      throw new ReferenceError(`return properties are not defined. use the 'find' function to defined them`);
    }

    return `${(this.alias) ? (this.alias + ':') : ''} ${this.queryFnName} ${(this.head.length > 0) ? '(' + this.head.join(',') + ')' : ''}  { ${this.body} }`;
  }

  // --
  // PRIVATE FUNCTIONS
  // -----------------

  private parceFind(_levelA: any[]) {
    const propsA = _levelA.map((currentValue, index) => {
      const itemX = _levelA[index];

      if (itemX instanceof GraphqlQueryBuilder) {
        return itemX.toString();
      } else if (!Array.isArray(itemX) && typeof itemX === 'object') {
        const propsAA = Object.keys(itemX);
        if (1 !== propsAA.length) {
          throw new RangeError(`Alias objects should only have one value. was passed: ${JSON.stringify(itemX)}`);
        }
        const propS = propsAA[0];
        const item = itemX[propS];

        if (Array.isArray(item)) {
          return new GraphqlQueryBuilder(propS).find(item);
        }
        return `${propS} : ${item} `;
      } else if (typeof itemX === 'string') {
        return itemX;
      } else {
        throw new RangeError(`cannot handle Find value of ${itemX}`);
      }
    });

    return propsA.join(',');
  }

  private getGraphQLValue(value: any) {
    if (typeof value === 'string') {
      value = JSON.stringify(value);
    } else if (Array.isArray(value)) {
      value = value.map(item => {
        return this.getGraphQLValue(item);
      }).join();
      value = `[${value}]`;
    } else if (value instanceof Date) {
      value = JSON.stringify(value);
    } else if (value !== null && typeof value === 'object') {
      value = this.objectToString(value);
    }
    return value;
  }

  private objectToString(obj: any) {
    const sourceA = [];

    for (const prop of Object.keys(obj)) {
      if (typeof obj[prop] === 'function') {
        continue;
      }
      sourceA.push(`${prop}:${this.getGraphQLValue(obj[prop])}`);
    }
    return `{${sourceA.join()}}`;
  }
}
