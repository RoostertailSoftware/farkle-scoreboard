import * as uuid from "uuid";

export abstract class BasePlayerClass {

    constructor(){
        this.id = uuid.v4();
    }
    
    private _id: string;
    public set id( s: string ){
        this._id = s;
    }
    public get id(): string {
        return this._id;
    }

}
