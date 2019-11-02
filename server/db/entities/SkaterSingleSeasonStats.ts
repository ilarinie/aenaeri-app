import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { SeasonStatsObject } from '../../models/BaseDataResponse';
import { SkaterSingleSeasonStats } from '../../models/SkaterSingleSeasonStats';

@Index(['season', 'playerId'])
@Entity()
export class SkaterSingleSeasonStatsEntity extends BaseEntity implements SkaterSingleSeasonStats {

    public static fromNHLApiResonse =
     (response: NHLApiSkaterStatsResponse, playerId: number): SkaterSingleSeasonStatsEntity => {
        const { stat, season } = response.stats[0].splits[0];
        return SkaterSingleSeasonStatsEntity.create({
            season,
            playerId,
            ...stat,
            ppg: stat.points ? stat.points / stat.games : 0,
            gpg: stat.goals ? stat.goals / stat.games : 0,
        }) as SkaterSingleSeasonStatsEntity;
    }
    public static apiResponseFromArray = (statArray: SkaterSingleSeasonStats[]): SeasonStatsObject<SkaterSingleSeasonStats> => {
        const response: SeasonStatsObject<SkaterSingleSeasonStats> = {};
        statArray.forEach((s) => {
            if (response[s.playerId.toString()] == null) {
                response[s.playerId.toString()] = {
                    seasonList: [],
                    statObject: {},
                };
            }
            response[s.playerId.toString()].seasonList.push(s.season);
            response[s.playerId.toString()].statObject[s.season] = s;
        });
        return response;
    }

    @PrimaryGeneratedColumn()
    public id: number;

    @Index()
    @Column()
    public season: string;

    @Index()
    @Column()
    public playerId: number;

    @Column()
    public timeOnIce: string;

    @Column()
    public assists: number;

    @Column()
    public goals: number;

    @Column()
    public pim: number;

    @Column()
    public shots: number;

    @Column()
    public games: number;

    @Column()
    public hits: number;

    @Column()
    public powerPlayGoals: number;

    @Column()
    public powerPlayPoints: number;

    @Column()
    public powerPlayTimeOnIce: string;

    @Column()
    public evenTimeOnIce: string;

    @Column()
    public penaltyMinutes: string;

    @Column({type: 'decimal', nullable: true })
    public faceOffPct: number;

    @Column({ type: 'decimal', nullable: true })
    public shotPct: number;

    @Column()
    public gameWinningGoals: number;

    @Column()
    public overTimeGoals: number;

    @Column()
    public shortHandedGoals: number;

    @Column()
    public shortHandedPoints: number;

    @Column()
    public shortHandedTimeOnIce: string;

    @Column()
    public blocked: number;

    @Column()
    public plusMinus: number;

    @Column()
    public points: number;

    @Column()
    public shifts: number;

    @Column()
    public timeOnIcePerGame: string;

    @Column()
    public evenTimeOnIcePerGame: string;

    @Column()
    public shortHandedTimeOnIcePerGame: string;

    @Column()
    public powerPlayTimeOnIcePerGame: string;

    @Column({ type: 'decimal', nullable: true})
    public ppg: number;

    @Column({type: 'decimal', nullable: true})
    public gpg: number;

}

export interface NHLApiSkaterStatsResponse {
    copyright: string;
    stats: Array<{
        type: {
            displayName: string;
        },
        splits: Array<{
            season: string;
            stat: {
                timeOnIce: string;
                assists: number;
                goals: number;
                pim: number;
                shots: number;
                games: number;
                hits: number;
                powerPlayGoals: number;
                powerPlayPoints: number;
                powerPlayTimeOnIce: string;
                evenTimeOnIce: string;
                penaltyMinutes: string;
                faceOffPct: number;
                shotPct: number;
                gameWinningGoals: number;
                overTimeGoals: number;
                shortHandedGoals: number;
                shortHandedPoints: number;
                shortHandedTimeOnIce: string;
                blocked: number;
                plusMinus: number;
                points: number;
                shifts: number;
                timeOnIcePerGame: string;
                evenTimeOnIcePerGame: string;
                shortHandedTimeOnIcePerGame: string;
                powerPlayTimeOnIcePerGame: string;
            }
        }>,
    }>;
}
