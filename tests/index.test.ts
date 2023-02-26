//https://www.testim.io/blog/typescript-unit-testing-101/
import { reader } from '../src/index';
const readline = require('readline');

describe('Testing all cases', () => {
  console.log = jest.fn()

  test('1.5 3 ETH 3.5', () => {

    jest.spyOn(readline, 'createInterface').mockImplementationOnce(() => {
      return ['1.5 3 ETH 3.5'] as any
    })

    expect(reader()).toBe([5.250]);
  });
});