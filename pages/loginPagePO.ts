import { $, ElementFinder, browser } from "protractor";

export class loginPagePO {
    public emailField: ElementFinder;
    public passwordField: ElementFinder;
    public pageUrl: string;
    public loginButton: ElementFinder;
    public registerNowLink: ElementFinder;

    constructor() {
        this.emailField = $('input[name=email]');
        this.passwordField = $('input[name=password]');
        this.pageUrl = browser.baseUrl + 'login';
        this.loginButton = $('input[type=submit]');
        this.registerNowLink = $('a[href*=/register]');

    }
}
