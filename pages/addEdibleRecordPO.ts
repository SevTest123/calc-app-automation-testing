import { $, ElementFinder, element, by } from "protractor";

export class addEdibleRecordPO {
    public nameField: ElementFinder;
    public caloriesField: ElementFinder;
    public createAtdateField: ElementFinder;
    public saveButton: ElementFinder;
    public cancelButton: ElementFinder;


    constructor() {
        this.nameField = $('input[name=name]');
        this.caloriesField = $('input[name=calories]')
        this.createAtdateField = $('input[name=created_at]')
        this.saveButton = element(by.buttonText('Save'));
        this.cancelButton = element(by.buttonText('Cancel'));
    }
}
