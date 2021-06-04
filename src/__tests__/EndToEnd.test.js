import { ElementClass } from 'enzyme';
import puppeteer from 'puppeteer';
const { puppeteerErrors } = require("puppeteer");


describe('show/hide an event details', () => {
    let browser;
    let page;
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250,
            ignoreDefaultArgs: ['--disable-extensions']
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.Event-container');
    }, 30000);

    afterAll(() => {
        browser.close();
    });

    test('An event element is collapsed by default', async () => {
        const eventDetails = await page.$('.Event-container .details-container');
        expect(eventDetails).toBeNull();
    });

    test('User can expand an event to see its details', async () => {
        await page.click('.Event-container .details-button');

        const eventDetails = await page.$('.Event-container .details-container');
        expect(eventDetails).toBeDefined();
    });

    test('User can collapse an event to hide its details', async () => {
        await page.click('.Event-container .details-button');
        const eventDetails = await page.$('.Event-container .details-container');
        expect(eventDetails).toBeNull();
    });
});

describe('Filter events by city', () => {
    let browser;
    let page;
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250,
            ignoreDefaultArgs: ['--disable-extensions']
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.Event-container');
    });

    afterAll(() => {
        browser.close();
    });

    test('show full list of events on load', async () => {
        const eventList = await page.$$('.Event-container');
        expect(eventList).toHaveLength(2);
    });

    test('user inputs city berlin', async () => {
        await page.waitForSelector('.CitySearch .city');
        await page.click('.CitySearch .city');
        await page.keyboard.type('berlin');
        await page.waitForXPath('//*[@id="root"]/div/div[1]/ul/li[1]');
        let suggestion = await page.$x('//*[@id="root"]/div/div[1]/ul/li[1]');
        await suggestion[0].click();
        let cityValue = await page.$eval('.CitySearch .city', (input) => input.getAttribute('value'));
        expect(cityValue).toBe('Berlin, Germany');
    }, 30000);

    test ('event returns only input city', async () => {
        const eventList = await page.$$('.Event-container');
        expect(eventList).toHaveLength(1);
    });
});