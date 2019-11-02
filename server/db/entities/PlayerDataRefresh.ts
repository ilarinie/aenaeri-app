import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PlayerDataRefresh extends BaseEntity {

    @Column()
    public fetchedPlayers: number;

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'bigint' })
    public refreshTime: string;

}
