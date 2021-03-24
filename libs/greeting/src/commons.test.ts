import * as commons from './commons';

describe('Example Test Suite', () => {
  it('Example test case', () => {
    const greetingResult = commons.greeting("someone");
    expect(greetingResult.indexOf("someone") >= 0).toBeTruthy()
  });
});
