import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SeasonStatsObject } from '../../models/BaseDataResponse';
import { TeamSingleSeasonStats } from '../../models/TeamSingleSeasonStats';
import { NHLApiTeamResponse } from './Team';

@Entity()
export class TeamSingleSeasonStatsEntity extends BaseEntity implements TeamSingleSeasonStats {

    public static fromNHLApiTeamResponse = (res: NHLApiTeamResponse): TeamSingleSeasonStatsEntity => {
        return TeamSingleSeasonStatsEntity.create({
            season: '20192020',
            teamId: res.id,
            ...res.teamStats[0].splits[0].stat,
        });
    }

    public static apiResponseFromArray = (statArray: TeamSingleSeasonStats[]): SeasonStatsObject<TeamSingleSeasonStats> => {
        const response: SeasonStatsObject<TeamSingleSeasonStats> = {};
        statArray.forEach((s) => {
            if (response[s.teamId.toString()] == null) {
                response[s.teamId.toString()] = {
                    seasonList: [],
                    statObject: {},
                };
            }
            response[s.teamId.toString()].seasonList.push(s.season);
            response[s.teamId.toString()].statObject[s.season] = s;
        });
        return response;
    }

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public season: string;

    @Column()
    public teamId: number;

    @Column()
    public gamesPlayed: number;

    @Column()
    public wins: number;

    @Column()
    public losses: number;

    @Column()
    public ot: number;

    @Column()
    public pts: number;

    @Column({ type: 'decimal'})
    public ptPctg: number;

    @Column({ type: 'decimal'})
    public goalsPerGame: number;

    @Column({ type: 'decimal'})
    public goalsAgainstPerGame: number;

    @Column({ type: 'decimal'})
    public evGGARatio: number;

    @Column({ type: 'decimal'})
    public powerPlayPercentage: number;

    @Column({ type: 'decimal'})
    public powerPlayGoals: number;

    @Column({ type: 'decimal'})
    public powerPlayGoalsAgainst: number;

    @Column({ type: 'decimal'})
    public powerPlayOpportunities: number;

    @Column({ type: 'decimal'})
    public penaltyKillPercentage: number;

    @Column({ type: 'decimal'})
    public shotsPerGame: number;

    @Column({ type: 'decimal'})
    public shotsAllowed: number;

    @Column({ type: 'decimal'})
    public winScoreFirst: number;

    @Column({ type: 'decimal'})
    public winOppScoreFirst: number;

    @Column({ type: 'decimal'})
    public winLeadFirstPer: number;

    @Column({ type: 'decimal'})
    public winLeadSecondPer: number;

    @Column({ type: 'decimal'})
    public winOutshootOpp: number;

    @Column({ type: 'decimal'})
    public winOutshotByOpp: number;

    @Column({ type: 'decimal'})
    public faceOffsTaken: number;

    @Column({ type: 'decimal'})
    public faceOffsWon: number;

    @Column({ type: 'decimal'})
    public faceOffsLost: number;

    @Column({ type: 'decimal'})
    public faceOffWinPercentage: number;

    @Column({ type: 'decimal'})
    public shootingPctg: number;

    @Column({ type: 'decimal'})
    public savePctg: number;

}
