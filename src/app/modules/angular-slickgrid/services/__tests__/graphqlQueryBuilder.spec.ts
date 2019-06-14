import GraphqlQueryBuilder from '../graphqlQueryBuilder';
import * as moment from 'moment-mini';

function removeSpaces(textS) {
  return `${textS}`.replace(/\s+/g, '');
}

describe('GraphqlQueryBuilder', () => {
  it('should accept a single find value', () => {
    const expectation = `user{age}`;
    const user = new GraphqlQueryBuilder('user').find('age');

    expect(removeSpaces(expectation)).toBe(removeSpaces(user));
  });

  it('should create a Query with function name & alia', () => {
    const expectation = `sam: user{name}`;
    const user = new GraphqlQueryBuilder('user', 'sam').find('name');

    expect(removeSpaces(expectation)).toBe(removeSpaces(user));
  });

  it('should create a Query with function name & input', () => {
    const expectation = `user(id:12345){name}`;
    const user = new GraphqlQueryBuilder('user', { id: 12345 }).find('name');

    expect(removeSpaces(expectation)).toBe(removeSpaces(user));
  });

  it('should create a Query with function name & input(s)', () => {
    const expectation = `user(id:12345, age:34){name}`;
    const user = new GraphqlQueryBuilder('user', { id: 12345, age: 34 }).find('name');

    expect(removeSpaces(expectation)).toBe(removeSpaces(user));
  });

  it('should accept a single find value with alia', () => {
    const expectation = `user{nickname:name}`;
    const user = new GraphqlQueryBuilder('user').find({ nickname: 'name' });

    expect(removeSpaces(expectation)).toBe(removeSpaces(user));
  });

  it('should accept a multiple find values', () => {
    const expectation = `user{firstname, lastname}`;
    const user = new GraphqlQueryBuilder('user').find('firstname', 'lastname');

    expect(removeSpaces(expectation)).toBe(removeSpaces(user));
  });

  it('should accept an array find values', () => {
    const expectation = `user{firstname, lastname}`;
    const user = new GraphqlQueryBuilder('user').find(['firstname', 'lastname']);

    expect(removeSpaces(expectation)).toBe(removeSpaces(user));
  });

  it('should work with nesting Querys', () => {
    const expectation = `user( id:12345 ) {
						id,	nickname : name,isViewerFriend,
						image : profilePicture( size:50 ) {
              uri, width,	height } }`;

    const profilePicture = new GraphqlQueryBuilder('profilePicture', { size: 50 });
    profilePicture.find('uri', 'width', 'height');

    const user = new GraphqlQueryBuilder('user', { id: 12345 });
    user.find(['id', { 'nickname': 'name' }, 'isViewerFriend', { 'image': profilePicture }]);

    expect(removeSpaces(expectation)).toBe(removeSpaces(user));
  });

  it('should work with simple nesting Querys', () => {
    const expectation = `user { profilePicture { uri, width, height } }`;

    const user = new GraphqlQueryBuilder('user');
    user.find({ 'profilePicture': ['uri', 'width', 'height'] });

    expect(removeSpaces(expectation)).toBe(removeSpaces(user));
  });

  it('should be able to Query a Date field', () => {
    const now = new Date();
    const expectation = `FetchLeeAndSam { lee: user(modified: "${moment(now).toISOString()}") { name, modified	},
                                          sam: user(modified: "${moment(now).toISOString()}") { name, modified	}  }`;

    const fetchLeeAndSam = new GraphqlQueryBuilder('FetchLeeAndSam');

    const lee = new GraphqlQueryBuilder('user', { modified: now });
    lee.setAlias('lee');
    lee.find(['name', 'modified']);

    const sam = new GraphqlQueryBuilder('user', 'sam');
    sam.filter({ modified: now });
    sam.find(['name', 'modified']);

    fetchLeeAndSam.find(lee, sam);

    expect(removeSpaces(fetchLeeAndSam)).toBe(removeSpaces(expectation));
  });

  it('should be able to group Querys', () => {
    const expectation = `FetchLeeAndSam { lee: user(id: "1") { name	}, sam: user(id: "2") { name } }`;

    const fetchLeeAndSam = new GraphqlQueryBuilder('FetchLeeAndSam');

    const lee = new GraphqlQueryBuilder('user', { id: '1' });
    lee.setAlias('lee');
    lee.find(['name']);

    const sam = new GraphqlQueryBuilder('user', 'sam');
    sam.filter({ id: '2' });
    sam.find('name');

    fetchLeeAndSam.find(lee, sam);

    expect(removeSpaces(fetchLeeAndSam)).toBe(removeSpaces(expectation));
  });

  it('should work with nasted objects and lists', () => {
    const expectation = `myPost:Message(type:"chat",message:"yoyo",
                                user:{name:"bob",screen:{ height:1080, width:1920}},
                                friends:[{id:1, name:"ann"},{id:2, name:"tom"}])  {
                        messageId: id, postedTime: createTime }`;

    const messageRequest = {
      type: 'chat',
      message: 'yoyo',
      user: {
        name: 'bob',
        screen: { height: 1080, width: 1920 }
      },
      friends: [{ id: 1, name: 'ann' }, { id: 2, name: 'tom' }]
    };

    const messageQuery = new GraphqlQueryBuilder('Message', 'myPost');
    messageQuery.filter(messageRequest);
    messageQuery.find({ messageId: 'id' }, { postedTime: 'createTime' });

    expect(removeSpaces(messageQuery)).toBe(removeSpaces(expectation));
  });

  it('should work with objects that have help functions(will skip function name)', () => {
    const expectation = 'inventory(toy:"jack in the box") { id }';
    const childsToy = { toy: 'jack in the box', getState: () => { } };

    childsToy.getState(); // for istanbul(coverage) to say all fn was called
    const itemQuery = new GraphqlQueryBuilder('inventory', childsToy);
    itemQuery.find('id');

    expect(removeSpaces(itemQuery)).toBe(removeSpaces(expectation));
  });

  it('should work with nasted objects that have help functions(will skip function name)', () => {
    const expectation = 'inventory(toy:"jack in the box") { id }';
    const childsToy = { toy: 'jack in the box', utils: { getState: () => { } } };

    childsToy.utils.getState(); // for istanbul(coverage) to say all fn was called
    const itemQuery = new GraphqlQueryBuilder('inventory', childsToy);
    itemQuery.find('id');

    expect(removeSpaces(itemQuery)).toBe(removeSpaces(expectation));
  });

  it('should skip empty objects in filter/args', () => {
    const expectation = 'inventory(toy:"jack in the box") { id }';
    const childsToy = { toy: 'jack in the box', utils: {} };

    const itemQuery = new GraphqlQueryBuilder('inventory', childsToy);
    itemQuery.find('id');

    expect(removeSpaces(itemQuery)).toBe(removeSpaces(expectation));
  });

  it('should throw Error if find input items have zero props', () => {
    expect(() => new GraphqlQueryBuilder('x').find({})).toThrow();
  });

  it('should throw Error if find input items have multiple props', () => {
    expect(() => new GraphqlQueryBuilder('x').find({ a: 'z', b: 'y' })).toThrow();
  });

  it('should throw Error if find is undefined', () => {
    expect(() => new GraphqlQueryBuilder('x').find()).toThrow();
  });

  it('should throw Error if no find values have been set', () => {
    expect(() => `${new GraphqlQueryBuilder('x')}`).toThrow();
  });

  it('should throw Error if find is not valid', () => {
    expect(() => new GraphqlQueryBuilder('x').find(123)).toThrow();
  });

  it('should throw Error if you accidentally pass an undefined', () => {
    expect(() => new GraphqlQueryBuilder('x', undefined)).toThrow();
  });

  it('should throw Error it is not an input object for alias', () => {
    // @ts-ignore: 2345
    expect(() => new GraphqlQueryBuilder('x', true)).toThrow();
  });
});
