If you wish to contribute then make sure to follow these steps (note that we use [Yarn classic](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) in this project):
```sh
# step 1, install with Yarn classic
yarn install

# step 2, run in dev and test your code change
yarn start

# step 3.a, build plugin (lib)
yarn build

# step 3.b, optional website build as well
yarn build:demo

# step 4, to test the E2E tests with Cypress the E2E tests
yarn cypress:open # open Cypress UI then click on "Run All Specs" or choose dedicated Example to test
```