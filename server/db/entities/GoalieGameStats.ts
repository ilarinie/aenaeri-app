import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { GoalieGameStats } from '../../models/GoalieGameStats';
import { NHLApiGoalieGameByGameStatsResponse } from '../../services/NHLApiService/responseModels/PlayerGameByGameStatsResponseModels';

@Entity()
export class GoalieGameStatsEntity extends BaseEntity implements GoalieGameStats {

    public static fromNHLApiResponse = (response: NHLApiGoalieGameByGameStatsResponse, playerId: number): GoalieGameStatsEntity[] => {
        const entities: GoalieGameStatsEntity[] = [];
        response.stats[0].splits.forEach((s) => {
            const { stat, season } = s;
            entities.push(GoalieGameStatsEntity.create({
                playerId,
                season,
                teamId: s.team.id,
                opponentTeamId: s.opponent.id,
                gameId: s.game.gamePk,
                ...s,
                ...stat,
            }));
        });
        return entities;
    };

    @PrimaryGeneratedColumn()
    public id: number;

    @Index()
    @Column()
    public playerId: number;

    @Column()
    public season: string;

    @Column({ nullable: true })
    public date: string;

    @Column()
    public teamId: number;

    @Column()
    public opponentTeamId: number;

    @Column()
    public gameId: number;

    @Column()
    public timeOnIce: string;

    @Column()
    public ot: number;

    @Column()
    public shutouts: number;

    @Column()
    public saves: number;

    @Column()
    public powerPlaySaves: number;

    @Column()
    public shortHandedSaves: number;

    @Column()
    public evenSaves: number;

    @Column()
    public shortHandedShots: number;

    @Column()
    public evenShots: number;

    @Column()
    public powerPlayShots: number;

    @Column({ nullable: true })
    public decision: 'W' | 'L';

    @Column({ type: 'decimal', nullable: true })
    public savePercentage: number;

    @Column()
    public games: number;

    @Column({ nullable: true })
    public gamesStarted: number;

    @Column()
    public shotsAgainst: number;

    @Column()
    public goalsAgainst: number;

    @Column({ type: 'decimal', nullable: true })
    public powerPlaySavePercentage: number;

    @Column({ type: 'decimal', nullable: true })
    public shortHandedSavePercentage: number;

    @Column({ type: 'decimal', nullable: true })
    public evenStrengthSavePercentage: number;

    @Column()
    public isHome: boolean;

    @Column()
    public isWin: boolean;

    @Column()
    public isOT: boolean;

}
