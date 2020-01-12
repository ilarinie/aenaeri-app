import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { SeasonStatsObject } from '../../models/BaseDataResponse';
import { GoalieSingleSeasonStats } from '../../models/GoalieSingleSeasonStats';
import { NHLApiGoalieStatsResponse } from '../../services/NHLApiService/responseModels/GoalieStatsResponseModels';

@Index(['season', 'playerId'])
@Entity()
export class GoalieSingleSeasonStatsEntity extends BaseEntity implements GoalieSingleSeasonStats {

    public static fromNHLApiResonse =
     (response: NHLApiGoalieStatsResponse, playerId: number): GoalieSingleSeasonStatsEntity => {
        const { stat, season } = response.stats[0].splits[0];
        return GoalieSingleSeasonStatsEntity.create({
            season,
            playerId,
            ...stat,
        });
    }

    public static apiResponseFromArray = (statArray: GoalieSingleSeasonStats[]): SeasonStatsObject<GoalieSingleSeasonStats> => {
        const response: SeasonStatsObject<GoalieSingleSeasonStats> = {};
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

    @Column({ nullable: true })
    public ot: number;

    @Column({ nullable: true })
    public shutouts: number;

    @Column({ nullable: true })
    public ties: number;

    @Column({ nullable: true })
    public wins: number;

    @Column({ nullable: true })
    public losses: number;

    @Column({ nullable: true })
    public saves: number;

    @Column({ nullable: true })
    public powerPlaySaves: number;

    @Column({ nullable: true })
    public shortHandedSaves: number;

    @Column({ nullable: true })
    public evenSaves: number;

    @Column({ nullable: true })
    public shortHandedShots: number;

    @Column({ nullable: true })
    public evenShots: number;

    @Column({ nullable: true })
    public powerPlayShots: number;

    @Column({ type: 'decimal', nullable: true })
    public savePercentage: number;

    @Column({ type: 'decimal', nullable: true })
    public goalAgainstAverage: number;

    @Column()
    public games: number;

    @Column({ nullable: true })
    public gamesStarted: number;

    @Column({ nullable: true })
    public shotsAgainst: number;

    @Column({ nullable: true })
    public goalsAgainst: number;

    @Column()
    public timeOnIcePerGame: string;

    @Column({ type: 'decimal', nullable: true })
    public powerPlaySavePercentage: number;

    @Column({ type: 'decimal', nullable: true })
    public shortHandedSavePercentage: number;

    @Column({ type: 'decimal', nullable: true })
    public evenStrengthSavePercentage: number;

}
