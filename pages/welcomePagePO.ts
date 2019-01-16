import { ElementFinder, element , by, browser } from "protractor";

export class welcomePagePO {
    public registerButton: ElementFinder;
    public loginButton: ElementFinder;
    public pageUrl: string;

    constructor() {
        this.registerButton = element(by.buttonText('Register'));
        this.loginButton = element(by.buttonText('Login'));
        this.pageUrl = browser.baseUrl;
    }
}
