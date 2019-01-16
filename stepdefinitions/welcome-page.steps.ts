import { browser, $ } from "protractor";
import { welcomePagePO } from "../pages/welcomePagePO";
import { loginPagePO } from "../pages/loginPagePO";
import { calAppPagePO } from '../pages/calAppPagePO';
import { addEdibleRecordPO } from '../pages/addEdibleRecordPO';
import { WaitForElement } from '../helpers/waitForElement';
import { registerPagePO } from "../pages/registerPagePO";
import { FilterBoxPO } from '../pages/filterBoxPO';
import { TableDefinition } from 'cucumber';
import { RecordPO } from "../pages/recordPO";

const { Given, When, Then, table } = require("cucumber");
const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;

const welcome: welcomePagePO = new welcomePagePO();
const login: loginPagePO = new loginPagePO();
const register: registerPagePO = new registerPagePO();
const calApp: calAppPagePO = new calAppPagePO();
const addRecord: addEdibleRecordPO = new addEdibleRecordPO();
const filter: FilterBoxPO = new FilterBoxPO();


Given(/^the user is on 'Welcome to Calc' page$/, async () => {
    await browser.get(welcome.pageUrl).then(() =>
        WaitForElement.waitForElementPresence(welcome.loginButton, true, 5000));
});

Given(/^the user with email:'(.+)' is on the Calories app page$/, async (email: string) => {
    await browser.get(login.pageUrl).then(() =>
        WaitForElement.waitForElementPresence(welcome.loginButton, true, 5000).then(() =>
            login.emailField.sendKeys(email).then(() => login.passwordField.sendKeys('Aa123456')
                .then(() => login.loginButton.click().then(() =>
                    WaitForElement.waitForUrl(new RegExp(calApp.mainPageUrl), 5000)
                )))))
});

When(/^the user clicks on '(.*?)' button on welcome page$/, async (text: string) => {
    if (text.toUpperCase() === 'LOGIN') {
        await welcome.loginButton.click();
    } else
        if (text.toUpperCase() === 'REGISTER') {
            await welcome.registerButton.click();
        } else {
            console.log('----- >> No supported Button in Welcome Cal page')
        }
});

Then(/^the user is directed to '(.*?)' page$/, async (text: string) => {
    if (text.toUpperCase() === 'LOGIN') {
        await expect(browser.getCurrentUrl()).to.eventually.equal(login.pageUrl);
    } else
        if (text.toUpperCase() === 'REGISTER') {
            await expect(browser.getCurrentUrl()).to.eventually.equal(register.pageUrl);
        }
    if (text.toUpperCase() === 'WELCOME TO CALC') {
        await expect(browser.getCurrentUrl()).to.eventually.equal(welcome.pageUrl);
    }
});

When(/^the user sets email:'(.*?)'$/, async (email: string) => {
    await login.emailField.sendKeys(email);
});

When(/^the user sets password$/, async () => {
    await login.passwordField.sendKeys('Aa123456')
});

Then(/^the user is directed to Calories app page$/, async () => {
    WaitForElement.waitForUrl(new RegExp(calApp.mainPageUrl), 5000);
});

When(/^the user clicks on 'Login' button on login page$/, async () => {
    await login.loginButton.click();
});

When(/^the user selects to ADD edible$/, async () => {
    await WaitForElement.waitForElementPresence(calApp.addButton, true, 3000)
        .then(() => calApp.addButton.click());
});

When(/^the user sets '(.*?)' at field '(.*?)'$/, async (value: string, fieldName: string) => {
    await WaitForElement.waitForElementPresence(addRecord.saveButton, true, 3000)
        .then(() => {
            if (fieldName.toUpperCase() === 'NAME') {
                addRecord.nameField.sendKeys(value)
            }
            else if (fieldName.toUpperCase() === 'CALORIES') {
                addRecord.caloriesField.sendKeys(value)
            } else {
                console.log('----- >> No supported field type for edibles record')
            }
        });
});

When(/^the user edits the record with name:(.*?) and calories:(.*?) and sets '(.*?)' at field '(.*?)'$/, async (name: string, cal: string, value: string, field: string) => {
    await WaitForElement.waitForElementPresence($('tbody tr'), true, 3000)
        .then(() => calApp.getEditRecord(name, cal)
            .then(r => {
                if (field.toUpperCase() === 'NAME') {
                    r.getNameInput().clear().then(() => r.getNameInput().sendKeys(value))
                }
                else if (field.toUpperCase() === 'CALORIES') {
                    r.getCalInput().clear().then(() => r.getCalInput().sendKeys(value))
                } else {
                    console.log('----- >> No supported field type for edibles record')
                }
            }));
});

When(/^the user saves the record with name:(.*?) and calories:(.*?)$/, async (name: string, cal: string) => {
    await calApp.getEditRecord(name, cal)
        .then(r => r.getSaveButton().click());
})

When(/^the user clicks on '(.*?)'$/, async (button: string) => {
    await addRecord.saveButton.click();
});

When(/^the user selects to delete record with name:(.*?) and calories:(.*?)$/, async (name: string, cal: string) => {
    await WaitForElement.waitForElementPresence($('tbody tr'), true, 3000)
        .then(() => calApp.getRecord(name, cal)
            .then(r => r.getDeleteButton().click()));
});

When(/^the user selects to edit record with name:(.*?) and calories:(.*?)$/, async (name: string, cal: string) => {
    await WaitForElement.waitForElementPresence($('tbody tr'), true, 3000)
        .then(() => calApp.getRecord(name, cal)
            .then(r => r.getEditButton().click()));
});

Then(/^the following records are displayed in the table:$/, async (expTable: TableDefinition) => {
    await browser.sleep(2000);
    const recs: RecordPO[] = await calApp.getRecords();
    const actualRecs = await Promise.all(
        recs.map(async (rec: RecordPO) => {
            return {
                Name: await rec.getName(),
                Calories: await rec.getCal()
            }
        })
    );
    const expectedTable = expTable.hashes();
    expect(actualRecs).to.deep.equal(expectedTable);
});

Then(/^No records found text is displayed in the table$/, async () => {
    await browser.sleep(2000);
    await expect(calApp.isEmpty()).to.eventually.equal(true);
});

When(/^the user selects to FILTER BY DATE & TIME INTERVAL$/, async () => {
    await calApp.filterButton.click();
});

Then(/^the filter by date criteria area is displayed$/, async () => {
    await expect(filter.resetButton.isDisplayed()).to.eventually.equal(true);
});

When(/^the user sets '(.*?)'at (.*?)$/, async (value: string, timeCriterion: string) => {
    switch (timeCriterion.toUpperCase()) {
        case 'START DATE': {
            await filter.startDate.clear().then(() => filter.startDate.sendKeys(value));
            break;
        }
        case 'END DATE': {
            await filter.endDate.clear().then(() => filter.endDate.sendKeys(value));
            break;
        }
        case 'START TIME': {
            await filter.startHour.clear().then(() => filter.startHour.sendKeys(value));
            break;
        }
        case 'END TIME': {
            await filter.endHour.clear().then(() => filter.endHour.sendKeys(value));
            break;
        }
        default: {
            console.log("Invalid filter choice");
        }
    }
});

When(/^the user clicks on Filter button$/, async () => {
    await filter.filterButton.click();
});

Then(/^the message in Calory Box is 'Today (.*?)\/(.*?) cals'$/, async (dcal: string, maxcal: string) => {
    const expected = 'TODAY ' + dcal + '/' + maxcal + ' CALS';

    await WaitForElement.waitForElementPresence(calApp.calory_box, true, 3000);
    const actual = await calApp.calory_box.getText();
    expect(actual.toUpperCase()).to.equal(expected);
});

When(/^the user visits his profile section$/, async () => {
    await calApp.getProfileSection().click().then(() =>
        WaitForElement.waitForUrl(new RegExp(calApp.profilePageUrl), 5000));
});

When(/^the user edits Max Calories field to (.*?)$/, async (maxcal: string) => {
    await calApp.max_calField.clear().then(() => calApp.max_calField.sendKeys(maxcal));
    await calApp.emailField.click();
})

When(/^the user visits Edibles section$/, async () => {
    await calApp.getEdiblesSection().click().then(() =>
        WaitForElement.waitForUrl(new RegExp(calApp.mainPageUrl), 5000));
});

Then(/^validation message that today's calories number has exceeded Max Calories number is displayed$/, async () => {
    await expect(calApp.caloryBoxWarning.isDisplayed()).to.eventually.equal(true);
})

Then(/^validation message that today's calories number has exceeded Max Calories number is not displayed$/, async () => {
    await expect(calApp.caloryBoxWarning.isPresent()).to.eventually.equal(false);
})

When(/^the user selects to Logout$/, async () => {
    await WaitForElement.waitForElementPresence(calApp.logout, true, 5000)
        .then(() => calApp.logout.click());
});
