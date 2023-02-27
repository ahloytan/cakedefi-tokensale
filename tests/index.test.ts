//https://www.testim.io/blog/typescript-unit-testing-101/
import { processor } from '../src/index';

describe('Testing all cases', () => {
  console.log = jest.fn()
  const currencies = [3825.281112, 138.8911, 0.00198422341298374987]

  test('1.5 3 ETH 3.5', () => {
    expect(processor('1.5 3 ETH 3.5', currencies)).toBe('5.250');
  });

  test('1.5 3 BTC 3.5', () => {
    expect(processor('1.5 3 BTC 3.5', currencies)).toBe('144.593');
  });

  test('1.5 3 DOGE 3.5', () => {
    expect(processor('1.5 3 DOGE 3.5', currencies)).toBe('0.000');
  });

  test('1.5 3 DOGE 350000', () => {
    expect(processor('1.5 3 DOGE 350000', currencies)).toBe('7.500');
  });

  test('1.5 1 ETH 3.5', () => {
    expect(processor('1.5 1 ETH 3.5', currencies)).toBe('5.2');
  });

  test('6540825.876543210987654325 18 ETH 992465.123456789012345678', () => {
    expect(processor('6540825.876543210987654325 18 ETH 992465.123456789012345678', currencies)).toBe('6491541561072.818099748528072316');
  });
  
  test('6540825.876543210987654325 18 DOGE 992465.123456789012345678', () => {
    expect(processor('6540825.876543210987654325 18 DOGE 992465.123456789012345678', currencies)).toBe('92739338.602961354393486405');
  });

  test('6540825.876543210987654325 18 BTC 992465.123456789012345678', () => {
    expect(processor('6540825.876543210987654325 18 BTC 992465.123456789012345678', currencies)).toBe('178787347219043.171218312942804711');
  });

});