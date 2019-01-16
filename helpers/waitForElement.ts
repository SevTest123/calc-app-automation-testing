import * as protractor from 'protractor';
import { browser } from 'protractor';

export class WaitForElement {
    private static defaultWaitLimit = 5000;
    private static defaultAnimationWaitLimit = 2000;
    private static EC = (<any>protractor).ExpectedConditions;

    public static waitForElementPresence(
        locator: protractor.ElementFinder,
        shouldBePresent: boolean,
        timeout?: number
    ) {
        const waitLimit = timeout || this.defaultWaitLimit;
        let presenceCondition: any;
        if (shouldBePresent) {
            presenceCondition = WaitForElement.EC.presenceOf(locator);
        } else {
            presenceCondition = WaitForElement.EC.stalenessOf(locator);
        }
        return browser
            .wait(
                presenceCondition,
                waitLimit,
                'Element with locator ' +
                locator.locator() +
                ' is ' +
                (shouldBePresent ? 'not ' : '') +
                'present after ' +
                waitLimit +
                'ms'
            )
    }

    public static waitForUrl(
        url: RegExp,
        timeout?: number
    ) {
        const waitLimit = timeout || this.defaultWaitLimit;
        return browser
            .wait(
                WaitForElement.waitUrl(url),
                waitLimit,
                'URL ' +
                url +
                ' is not present after ' +
                waitLimit +
                'ms'
            );
    }

    private static waitUrl(myUrl: RegExp) {
        return function () {
            return browser.getCurrentUrl().then(function (url) {
                return myUrl.test(url);
            });
        }
    }
}   
