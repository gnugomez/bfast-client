import { MinutesToStringPipe } from './minutes-to-string.pipe';

describe('MinutesToStringPipe', () => {
  it('create an instance', () => {
    const pipe = new MinutesToStringPipe();
    expect(pipe).toBeTruthy();
  });
});
