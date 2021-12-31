import { DiceClass } from "@classes"
import { ROLL_ACTION_BUTTON_TYPES } from "@enums";

export class RollActionButtonLogicClass {

    private _rollButtonDisabled: boolean;
    public get rollButtonDisabled( ): boolean{ return this._rollButtonDisabled; }

    private _diceButtonDisabled: boolean;
    public get diceButtonDisabled( ): boolean{ return this._diceButtonDisabled; }

    private _finishRollDisabled: boolean;
    public get finishRollDisabled( ): boolean{ return this._finishRollDisabled; }

    private _finishTurnDisabled: boolean;
    public get finishTurnDisabled( ): boolean{ return this._finishTurnDisabled; }

    private _farkleDisabled: boolean;
    public get farkleDisabled( ): boolean{ return this._farkleDisabled; }

    constructor(){
        this.reset();
    }

    private reset = (): void =>{
        this._rollButtonDisabled =  false;
        this._diceButtonDisabled =  true;
        this._finishRollDisabled =  true;
        this._finishTurnDisabled =  true;
        this._farkleDisabled =      true;
    };

    public selected( selected: ROLL_ACTION_BUTTON_TYPES ){
      switch ( selected ){
        case ROLL_ACTION_BUTTON_TYPES.ROLL:
            this._rollButtonDisabled = true;
            this._diceButtonDisabled = false;
            this._finishRollDisabled = true;
            this._finishTurnDisabled = true;
            this._farkleDisabled =     false;
            break;

        case ROLL_ACTION_BUTTON_TYPES.DIE:
            this._rollButtonDisabled = true;
            this._diceButtonDisabled = false;
            this._finishRollDisabled = false;
            this._finishTurnDisabled = true;
            this._farkleDisabled =     true;
            break;

        case ROLL_ACTION_BUTTON_TYPES.FINISH_ROLL:
            this._rollButtonDisabled = false;
            this._diceButtonDisabled = true;
            this._finishRollDisabled = true;
            this._finishTurnDisabled = false;
            this._farkleDisabled =     true;
            break;

        case ROLL_ACTION_BUTTON_TYPES.FINISH_TURN:
            this._rollButtonDisabled = false;
            this._diceButtonDisabled = true;
            this._finishRollDisabled = true;
            this._finishTurnDisabled = true;
            this._farkleDisabled =     true;
            break;

        case ROLL_ACTION_BUTTON_TYPES.FARKLE:
            this.reset();
            break;
      };

    };

    static setRollSelection(  current:DiceClass, die: ROLL_ACTION_BUTTON_TYPES ): DiceClass {
        current.select( die );
        return current;
    };

    static resetRollSelection( ): DiceClass {
        return new DiceClass( );
    };

  };
  