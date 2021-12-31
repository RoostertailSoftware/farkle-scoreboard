import * as uuid from "uuid";
import * as moment from "moment";

export abstract class BasePlayerClass {

    private _id: string;
    public set id( s: string ){ this._id = s; }
    public get id( ): string { return this._id; }

    private _dateTime: moment.Moment;
    public set dateTime( s: moment.Moment ){ this._dateTime = s; }
    public get dateTime( ): moment.Moment { return this._dateTime; }

    constructor(){ 
        this.id = uuid.v4();
        this.dateTime = moment();
    };

};
