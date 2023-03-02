const puppeteer = require('puppeteer');
const { generateText, checkAndGenerate } = require('./util');

// Unit Test
test('should output name and age', () => {
    const text = generateText('Shahzaib', 28);
    expect(text).toBe('Shahzaib (28 years old)');
});

// Integration Test
test('should generate a valid output text', () => {
    const text =  checkAndGenerate('Shahzaib', 28);
    expect(text).toBe('Shahzaib (28 years old)');
});

// e2e Test
test('should click around', async () => {
    const browser = await puppeteer.launch({
        headless: true, // true to open a browser window
        // slowMo: 80,
        // args: ['--window-size=1920,1080']
    });
    const page = await browser.newPage();
    await page.goto('file:///Users/shahzaibimran/Desktop/learning2023/unit-testing/index.html');
    await page.click('input#name');
    await page.type('input#name', 'Shahzaib');
    await page.click('input#age');
    await page.type('input#age', '28');
    await page.click('#btnAddUser');
    const finalText = await page.$eval('.user-item', el => el.textContent);
    expect(finalText).toBe('Shahzaib (28 years old)');
});