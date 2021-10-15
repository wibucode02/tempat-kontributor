const subtract = require('./subtract');

test('properly subtract 2 number', () => {
    expect(subtract(1, 2)).toBe(-1);
});
