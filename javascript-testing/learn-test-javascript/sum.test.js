const sum = require('./sum');

test('propperly add 2 number', () => {
    expect(sum(1, 2)).toBe(3);
});
