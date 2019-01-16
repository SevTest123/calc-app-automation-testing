import { ElementFinder, element , by, browser } from "protractor";

export class registerPagePO {
    public nameField: ElementFinder;
    public emailField: ElementFinder;
    public passwordField: ElementFinder;
    public confirmPasswordField: ElementFinder;
    public pageUrl: string;
    public joinButton: ElementFinder;
    public login: ElementFinder

    constructor() {
        this.nameField = element(by.buttonText('Register'));
        this.emailField = element(by.buttonText('Login'));
        this.passwordField = element(by.buttonText('Register'));
        this.confirmPasswordField = element(by.buttonText('Register'));
        this.pageUrl = browser.baseUrl + 'register';
        this.joinButton = element(by.buttonText('Join'));

    }
}
