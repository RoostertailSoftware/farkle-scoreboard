import * as uuid from "uuid";

export abstract class BasePlayerClass {

    private _id: string;
    public set id( s: string ){ this._id = s; }
    public get id( ): string { return this._id; }

    private _dateTime: Date;
    public set dateTime( s: Date ){ this._dateTime = s; }
    public get dateTime( ): Date { return this._dateTime; }

    constructor(){ 
        this.id = uuid.v4();
        this.dateTime = new Date();
    };
};
