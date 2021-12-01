
import { PlayerClass, RulesConfigurationClass  } from "@classes";
import { ConfigurationService } from "@services";

export class GameObserverClass {

    gameConfig: RulesConfigurationClass;

    player: PlayerClass;

    roll: number;
    score: number;

    configObserver: any;
    constructor( private configSvc: ConfigurationService ){
        this.configObserver = this.configSvc.getObservableData();
        this.configObserver.subscribe( (result: RulesConfigurationClass ) => {
            this.gameConfig = result;
        });
    }

    
}