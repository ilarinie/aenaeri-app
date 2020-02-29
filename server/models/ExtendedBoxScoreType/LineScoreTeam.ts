export interface LineScoreTeam {
    team: {
        id: number;
        name: string;
        link: string;
        abbreviation: string;
        triCode: string;
    };
    goals: number;
    shotsOnGoal: number;
    goaliePulled: boolean;
    numSkaters: number;
    powerPlay: boolean;
}
