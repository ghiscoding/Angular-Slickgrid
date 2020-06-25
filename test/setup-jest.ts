import 'jest-preset-angular';
import './jest-global-mocks';

// use NewYork timezone as default accross the Jest tests
const moment = require('moment-timezone');
moment.tz.setDefault('America/New_York');
jest.setMock('moment', moment)
