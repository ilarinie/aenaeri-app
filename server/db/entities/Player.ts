import { BaseEntity, Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { PlayerBaseDataResponse } from '../../models/BaseDataResponse';
import { Player } from '../../models/Player';




@Entity()
export class PlayerEntity extends BaseEntity implements Player {

    public static fromNHLApiResponse = (response: NHLApiPlayerResponse): PlayerEntity => {
        const player  = response.people[0];
        const {
            id,
            fullName,
            firstName,
            lastName,
            primaryNumber,
            birthDate,
            currentAge,
            birthCity,
            birthStateProvince,
            birthCountry,
            nationality,
            height,
            weight,
            active,
            alternateCaptain,
            captain,
            rookie,
            shootsCatches,
            rosterStatus,
            currentTeam,
            primaryPosition,
        } = player;

        return PlayerEntity.create({
            id,
            fullName,
            firstName,
            lastName,
            primaryNumber,
            birthDate,
            currentAge,
            birthCity,
            birthStateProvince,
            birthCountry,
            nationality,
            height,
            weight,
            active,
            alternateCaptain,
            captain,
            rookie,
            shootsCatches,
            rosterStatus,
            teamId: currentTeam.id,
            position: primaryPosition.name,
        });
    }

    public static apiResponseFromArray = (playerArray: PlayerEntity[]): PlayerBaseDataResponse => {
        const response: PlayerBaseDataResponse = {
            playerList: [],
            playerObject: {}
        }
        playerArray.forEach((p) => {
            response.playerList.push(p.id.toString());
            response.playerObject[p.id.toString()] = p;
        });
        return response;
    }

    @PrimaryColumn()
    public id: number;

    @Index()
    @Column()
    public teamId: number;

    @Column()
    public fullName: string;

    @Column()
    public firstName: string;

    @Column()
    public lastName: string;

    @Column()
    public primaryNumber: number;

    @Column()
    public birthDate: string;

    @Column()
    public currentAge: number;

    @Column()
    public birthCity: string;

    @Column({ nullable: true })
    public birthStateProvince: string;

    @Column()
    public birthCountry: string;

    @Column()
    public nationality: string;

    @Column()
    public height: string;

    @Column()
    public weight: string;

    @Column()
    public active: boolean;

    @Column()
    public alternateCaptain: boolean;

    @Column()
    public captain: boolean;

    @Column()
    public rookie: boolean;

    @Column()
    public shootsCatches: string;

    @Column()
    public rosterStatus: string;

    @Column()
    public position: string;

}

export interface NHLApiPlayerResponse {
    copyright: string;
    people: Array<{
        id: number;
        fullName: string;
        link: string;
        firstName: string;
        lastName: string;
        primaryNumber: number;
        birthDate: string;
        currentAge: number;
        birthCity: string;
        birthStateProvince: string;
        birthCountry: string;
        nationality: string;
        height: string;
        weight: string;
        active: boolean;
        alternateCaptain: boolean;
        captain: boolean;
        rookie: boolean;
        shootsCatches: string;
        rosterStatus: string;
        currentTeam: {
            id: number;
            name: string;
            link: string;
        };
        primaryPosition: {
            code: string;
            name: string;
            type: string;
            abbreviation: string;
        }
    }>;
}
