import {
  deleteCookie,
  getParsedCookie,
  setStringifiedCookie,
} from '../cookies';

// Cookie test N1/ Setting, getting, deleting the cookie
test('set, gets and delete a cookie', () => {
  const cookie = {
    key: 'cart',
    value: [{ id: 1, quantity: 2 }],
  };
  // 1. Make sure that the return value of the function is undefined
  // Use .toBe to compare primitive values or to check referential identity of object instances
  expect(getParsedCookie(cookie.key)).toBe(undefined);

  // 2. Set the cookie value and test that the value was updated
  expect(() => setStringifiedCookie(cookie.key, cookie.value)).not.toThrow();

  // Use .toStrictEqual to test that objects have the same types as well as structure
  expect(getParsedCookie(cookie.key)).toStrictEqual(cookie.value);

  // Best practice: clear state after test to bring the system back to the initial state
  expect(deleteCookie(cookie.key)).toBe(undefined);
  expect(getParsedCookie(cookie.key)).toBe(undefined);
});
