import { $, ElementFinder, element, by, browser, ElementArrayFinder, $$ } from "protractor";
import { RecordPO } from "./recordPO";

export class calAppPagePO {
    public mainPageUrl: string;
    public profilePageUrl: string;
    public menu: ElementArrayFinder;
    public addButton: ElementFinder;
    public logout: ElementFinder;
    public calory_box: ElementFinder;
    public filterButton: ElementFinder;
    public max_calField: ElementFinder;
    public emailField: ElementFinder;
    public caloryBoxWarning: ElementFinder;


    constructor() {
        this.mainPageUrl = browser.baseUrl + 'edibles';
        this.profilePageUrl = browser.baseUrl + 'profile';
        this.menu = $$('ul>li');
        this.addButton = element(by.buttonText('Add'));
        this.logout = $('li>span');
        this.calory_box = $('.calorybox');
        this.filterButton = element(by.buttonText('Filter by date & time interval'));
        this.max_calField = $('#max-daily-calories');
        this.emailField = $('#email-input');
        this.caloryBoxWarning = $('div.calorybox.u-full-width.red');
    }

    public async getRecords() {
        let tableRec: ElementArrayFinder = element.all(by.css('tbody > tr'));
        return tableRec
            .then((recs: ElementFinder[]) => recs.map((rec: ElementFinder) => new RecordPO(rec)));
    }

    public async isEmpty() {
        let tableRec: ElementArrayFinder = element.all(by.css('tbody > tr'));
        let c = await tableRec.count();
        if (c > 1) {
            return false;
        }
        if (c === 0) {
            return true;
        }
        let cells = tableRec.$$('td');
        let cellTexts = await cells.getText();

        if (cellTexts.length === 1 && cellTexts[0] === 'Nothing found :(') {
            return true;
        }
        return false;
    }

    public async getRecord(name: string, cal: string): Promise<RecordPO> {
        let rec = await this.getRecords();
        for (let i = 0; i < rec.length; i++) {
            let r = rec[i];
            let rName = await r.getName();
            let rCal = await r.getCal();
            if (rName === name && rCal === cal) {
                return r;
            }
        }
        return null;
    }

    public async getEditRecord(name: string, cal: string): Promise<RecordPO> {
        let rec = await this.getRecords();
        for (let i = 0; i < rec.length; i++) {
            let r = rec[i];
            let editMode = await r.isEditMode();
            if (!editMode) {
                continue;
            }
            let rName = await r.getNameInput().getAttribute('value');
            let rCal = await r.getCalInput().getAttribute('value');
            if (rName === name && rCal === cal) {
                return r;
            }
        }
        return null;
    }

    public getEdiblesSection() {
        return $('a[href*=edibles]');
    }

    public getProfileSection() {
        return $('a[href*=profile]');
    }

    public getLogoutButton() {
        return $('a[href*=logout]');
    }
}
