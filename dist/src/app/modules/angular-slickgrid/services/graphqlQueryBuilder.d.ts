/**
 * This GraphqlQueryBuilder class is a lib that already exist
 * but was causing issues with TypeScript, RequireJS and other bundler/packagers
 * and so I rewrote it in pure TypeScript.
 *
 * The previous lib can be viewed here at this Github
 * https://github.com/codemeasandwich/graphql-query-builder
 */
export default class GraphqlQueryBuilder {
    private queryFnName;
    alias: string;
    head: any[];
    body: any;
    constructor(queryFnName: string, aliasOrFilter?: string | object);
    /**
     * The parameters to run the query against.
     * @param filters An object mapping attribute to values
     */
    filter(filters: any): this;
    /**
     * Outlines the properties you wish to be returned from the query.
     * @param {string|object} properties representing each attribute you want Returned
     */
    find(...searches: any[]): this;
    /**
     * set an alias for this result.
     * @param {string} alias
     */
    setAlias(alias: string): void;
    /**
     * Return to the formatted query string
     * @return {string}
     */
    toString(): string;
    private parceFind(_levelA);
    private getGraphQLValue(value);
    private objectToString(obj);
}
