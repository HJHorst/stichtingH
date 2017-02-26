import { StichtingHPage } from './app.po';

describe('stichting-h App', () => {
  let page: StichtingHPage;

  beforeEach(() => {
    page = new StichtingHPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
