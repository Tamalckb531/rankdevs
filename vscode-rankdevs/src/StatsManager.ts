import {Stats} from './types'

export class StatsManager{
    private static instance: StatsManager;
    private daily: Stats = {total:0, logs:[]};
    private weekly: Stats = {total:0, logs:[]};
    private monthly: Stats = { total: 0, logs: [] };
    
    private constructor() { }

    public static getInstance(): StatsManager{
        if (!StatsManager.instance) {
            StatsManager.instance = new StatsManager();
        }
        return StatsManager.instance;
    }
}