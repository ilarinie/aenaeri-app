import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { TeamBaseDataResponse } from '../../models/BaseDataResponse';
import { Team } from '../../models/Team';
import { NHLApiTeamResponse } from '../../services/NHLApiService/responseModels/TeamResponseModels';

@Entity()
export class TeamEntity extends BaseEntity implements Team {

    public static fromNHLApiTeamResponse = (response: NHLApiTeamResponse): TeamEntity => {
        return TeamEntity.create({
            id: response.id,
            name: response.name,
            city: response.venue.city,
            abbreviation: response.abbreviation,
            teamName: response.teamName,
            firstYearOfPlay: response.firstYearOfPlay,
            division: response.division.name,
            confrence: response.conference.name,
            shortName: response.shortName,
        });
    }

    public static apiResponseFromArray = (teamArray: TeamEntity[]): TeamBaseDataResponse => {
      const response: TeamBaseDataResponse = {
        teamList: [],
        teamObject: {},
      };
      teamArray.forEach((team) => {
        response.teamList.push(team.id.toString());
        response.teamObject[team.id.toString()] = team;
      });
      return response;
    }

    @PrimaryColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public city: string;

    @Column()
    public abbreviation: string;

    @Column()
    public teamName: string;

    @Column()
    public firstYearOfPlay: number;

    @Column()
    public division: string;

    @Column()
    public confrence: string;

    @Column()
    public shortName: string;

}
