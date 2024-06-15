import { isNilUtil } from './is-nil.util';

describe('isNilUtil', () => {
  it('undefined', () => {
    expect(isNilUtil(undefined)).toBe(true);
  });

  it('null', () => {
    expect(isNilUtil(null)).toBe(true);
  });

  it('0', () => {
    expect(isNilUtil(0)).toBe(false);
  });

  it('string', () => {
    expect(isNilUtil('0')).toBe(false);
  });

  it('string text', () => {
    expect(isNilUtil('text')).toBe(false);
  });

  it('object', () => {
    expect(isNilUtil({})).toBe(false);
  });

  it('number', () => {
    expect(isNilUtil(1)).toBe(false);
  });

  it('array', () => {
    expect(isNilUtil([])).toBe(false);
  });
});
