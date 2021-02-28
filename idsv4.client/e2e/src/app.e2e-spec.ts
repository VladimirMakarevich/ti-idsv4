import { ExaminePage } from './app.po';

describe('Examine App', () => {
    let page: ExaminePage;

    beforeEach(() => {
        page = new ExaminePage();
    });

    it('should display welcome message', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('Welcome to Examination!');
    });
});
