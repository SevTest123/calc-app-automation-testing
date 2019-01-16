import { $, ElementFinder, by } from "protractor";

export class RecordPO {

    constructor(private listRecord: ElementFinder) { }

    public get name(): Promise<string> {
        return this.getName();
    }

    public get calories(): Promise<string> {
        return this.getCal();
    }

    public getEditButton() {
        return this.listRecord.element(by.buttonText('Edit'));
    }

    public getDeleteButton() {
        return this.listRecord.element(by.buttonText('Delete'));
    }

    public getSaveButton() {
        return this.listRecord.element(by.buttonText('Save'));
    }

    public getNameInput() {
        return this.listRecord.$('input[name=name]');
    }

    public getCalInput() {
        return this.listRecord.$('input[name=calories]');
    }

    public isEditMode() {
        return this.getNameInput().isPresent();
    }

    private getData() {
        let array: string[] = [];
        const recData = this.listRecord.$$('td');
        const indexDAta = recData.get(0).then((r) => r.getText().then((t: string) => t));
        recData.map(r => {
            return r.getText().then((v: string) => {
                return array.push(v);
            });
        });
        return array;
    }

    private async getText() {
        const recData = this.listRecord.$$('td');
        return recData.getText();
    }

    public async getName(): Promise<string> {
        return this.getText().then(t => t[0]);
    }

    public async getCal(): Promise<string> {
        return this.getText().then(t => t[1]);
    }

}


