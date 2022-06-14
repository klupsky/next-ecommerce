import sum from '../sum';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('throws an error if not a number', () => {
  expect(() => sum('hi', 2)).toThrow('Pass only numbers');
});
