import { $, ElementFinder, element, by } from "protractor";

export class FilterBoxPO {

    public box: ElementFinder;
    public resetButton: ElementFinder;
    public filterButton: ElementFinder;
    public startDate: ElementFinder;
    public endDate: ElementFinder;
    public startHour: ElementFinder;
    public endHour: ElementFinder;

    constructor() {
        this.box = $('.row.filters');
        this.resetButton = this.box.element(by.buttonText('Reset filter'));
        this.filterButton = this.box.element(by.buttonText('Filter'));
        this.startDate = element(by.css('input[name=startDate]'));
        this.endDate = this.box.element(by.css('input[name=endDate]'));
        this.startHour = this.box.element(by.css('input[name=startHour]'));
        this.endHour = this.box.element(by.css('input[name=endHour]'));
    }
}