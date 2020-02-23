import bcrypt from 'bcryptjs';
import { BaseEntity, BeforeInsert, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../models/User';

const SALT_ROUNDS = 10;

@Entity()
export class UserEntity extends BaseEntity implements User {

    @PrimaryGeneratedColumn()
    public id: number;

    @Index()
    @Column({ unique: true })
    public username: string;

    @Column({ nullable: true })
    public vLogin: string;

    @Column({ nullable: true })
    public vPass: string;

    @Column({ nullable: true})
    public pinnacleLogin: string;

    @Column({ nullable: true })
    public pinnaclePass: string;

    @Column()
    public password: string;

    @BeforeInsert()
    public hashPassword = async () => {
        this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    }

    public comparePassword = async (password: string): Promise<boolean> => {
        return bcrypt.compare(password, this.password);
    }

}
