import { MemestagramPage } from './app.po';

describe('memestagram App', function() {
  let page: MemestagramPage;

  beforeEach(() => {
    page = new MemestagramPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
