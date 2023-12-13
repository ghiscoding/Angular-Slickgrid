### Intro
The lib currently supports OData and GraphQL with built-in Services, if you want to use and create a different and Custom Backend Service, then follow the steps below.

### Instructions
To create your own Custom Backend Service, I suggest you take the code of the [GraphqlService](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/graphql/src/services/graphql.service.ts) and then rewrite the internal of each methods. The thing to remember is that you have to implement the `BackendService` as defined in the GraphqlService (`export class GraphqlService implements BackendService`).

You typically want to implement your service following these TypeScript interfaces
- [backendService.interface.ts](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/interfaces/backendService.interface.ts)
- [backendServiceApi.interface.ts](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/interfaces/backendServiceApi.interface.ts)
- [backendServiceOption.interface.ts](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/interfaces/backendServiceOption.interface.ts)

At the end of it, you'll have a Custom Backend Service that will be instantiated just like the GraphQL or OData that I've created, it should look similar to this (also note, try to avoid passing anything in the `constructor` of your Service to keep it usable by everyone)
```ts
class MyComponent {
  gridInit() {
    this.gridOptions = {
      backendServiceApi: {
        service: new YourCustomBackendService(),
        options: {
          // custom service options that extends "backendServiceOption" interface
        },
        preProcess: () => !this.isDataLoaded ? this.displaySpinner(true) : '',
        process: (query) => this.getCountries(query),
        postProcess: (result) => {
          this.displaySpinner(false);
          this.isDataLoaded = true;
        }
      } as YourCustomBackendServiceApi
    };
  }
}
```

If you need to reference your Service for other purposes then you better instantiated in a separate variable and then just pass it to the `service` property of the `backendServiceApi`.
```ts
class MyComponent {
  myCustomService = new YourCustomBackendService();

  gridInit {
    this.gridOptions = {
        backendServiceApi: {
          service: this.myCustomService,
          // ...
        } as YourCustomBackendServiceApi
    };
  }
}
```

If your Service is for a well known DB or API framework, then it might be possible to add your Service to the lib itself, however it should be added to the new monorepo lib [Slickgrid-Universal](https://github.com/ghiscoding/slickgrid-universal) in the list of [slickgrid-universal/packages](https://github.com/ghiscoding/slickgrid-universal/tree/master/packages). Since that is a monorepo lib, users will have the ability to use and download only the package they need.