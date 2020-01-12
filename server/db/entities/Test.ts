import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('test')
export class Test extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'varchar' })
    public message: string;

}
