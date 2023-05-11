const { renderDOM } = require('./helpers');
let dom; let document;

describe('index.html', () => {
    beforeEach(async () => {
        dom = await renderDOM('./index.html');
        document = await dom.window.document;
    })
    
    it('tag with id = "map" is empty when the website loads', () => {
        const map = document.querySelector('#map');
        expect(map.innerHTML).toContain("")
    })
    
   })


describe('register.html', () => {
    beforeEach(async () => {
        dom = await renderDOM('./register.html');
        document = await dom.window.document;
    })
    
    it('has an input', () => {
        const input = document.querySelector('input');
        expect(input).toBeTruthy()
    })
    
    // it('h1 is empty when website loads', () => {
    //     const h1 = document.querySelector('h1');
    //     expect(h1.innerHTML).toContain('')
    // })
    
    // it('displays dark mode', () => {
    //     const body = document.querySelector('body');
    //     const darkModeBtn = document.querySelector('#dark-mode');
    //     darkModeBtn.click()
    //     expect(body.className).toBe('dark-mode')
    // })
})
