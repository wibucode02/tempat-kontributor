const cloneArray = require('./cloneArray');

test('properly clone an array', () => {
    const array = ['laptop', 'smartphone', 'wifi'];

    expect(cloneArray(array)).toEqual(array);
});
