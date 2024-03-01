import { ShowNullResultPipe } from './show-null-result.pipe';

describe('ShowNullResultPipe', () => {
  it('create an instance', () => {
    const pipe = new ShowNullResultPipe();
    expect(pipe).toBeTruthy();
  });
});
