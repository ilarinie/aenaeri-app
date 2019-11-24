import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, Index } from 'typeorm';
import { SkaterGameStats } from '../../models/SkaterGameStats';
import { NHLApiSkaterGameByGameStatsResponse } from '../../services/NHLApiService/responseModels/PlayerGameByGameStatsResponseModels';

@Entity()
export class SkaterGameStatsEntity extends BaseEntity implements SkaterGameStats {

    public static fromNHLApiResponse = (response: NHLApiSkaterGameByGameStatsResponse, playerId: number): SkaterGameStatsEntity[] => {
        const entities: SkaterGameStatsEntity[] = [];
        response.stats[0].splits.forEach(s => {
            const { stat, season } = s;
            entities.push(SkaterGameStatsEntity.create({
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
    }

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
}
