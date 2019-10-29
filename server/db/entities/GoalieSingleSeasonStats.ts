import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

export interface GoalieSingleSeasonStats {
    season: string;
    playerId: number;
    timeOnIce: string;
    ot: number;
    shutouts: number;
    ties: number;
    wins: number;
    losses: number;
    saves: number;
    powerPlaySaves: number;
    shortHandedSaves: number;
    evenSaves: number;
    shortHandedShots: number;
    evenShots: number;
    powerPlayShots: number;
    savePercentage: number;
    goalAgainstAverage: number;
    games: number;
    gamesStarted: number;
    shotsAgainst: number;
    goalsAgainst: number;
    timeOnIcePerGame: string;
    powerPlaySavePercentage: number;
    shortHandedSavePercentage: number;
    evenStrengthSavePercentage: number;
}

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
    public ot: number;

    @Column()
    public shutouts: number;

    @Column()
    public ties: number;

    @Column()
    public wins: number;

    @Column()
    public losses: number;

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

    @Column({ type: 'decimal' })
    public savePercentage: number;

    @Column({ type: 'decimal' })
    public goalAgainstAverage: number;

    @Column()
    public games: number;

    @Column()
    public gamesStarted: number;

    @Column()
    public shotsAgainst: number;

    @Column()
    public goalsAgainst: number;

    @Column()
    public timeOnIcePerGame: string;

    @Column({ type: 'decimal' })
    public powerPlaySavePercentage: number;

    @Column({ type: 'decimal', nullable: true })
    public shortHandedSavePercentage: number;

    @Column({ type: 'decimal' })
    public evenStrengthSavePercentage: number;

}

export interface NHLApiGoalieStatsResponse {
    copyright: string;
    stats: Array<{
        type: {
            displayName: string;
        },
        splits: Array<{
            season: string;
            stat: {
                timeOnIce: string;
                ot: number;
                shutouts: number;
                ties: number;
                wins: number;
                losses: number;
                saves: number;
                powerPlaySaves: number;
                shortHandedSaves: number;
                evenSaves: number;
                shortHandedShots: number;
                evenShots: number;
                powerPlayShots: number;
                savePercentage: number;
                goalAgainstAverage: number;
                games: number;
                gamesStarted: number;
                shotsAgainst: number;
                goalsAgainst: number;
                timeOnIcePerGame: string;
                powerPlaySavePercentage: number;
                shortHandedSavePercentage: number;
                evenStrengthSavePercentage: number;
            }
        }>;
    }>;
}
