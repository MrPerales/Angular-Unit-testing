import { ReversePipe } from './reverse.pipe';

fdescribe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform "roma" to "amor"', () => {
    const pipe = new ReversePipe();
    const rta = pipe.transform('roma');
    expect(rta).toEqual('amor');
  });
  it('should transform "123" to "321"', () => {
    const pipe = new ReversePipe();
    const rta = pipe.transform('123');
    expect(rta).toEqual('321');
  });
});
