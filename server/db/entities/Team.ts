import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

export interface Team {
    id: number;
    name: string;
    city: string;
    abbreviation: string;
    teamName: string;
    firstYearOfPlay: number;
    division: string;
    confrence: string;
    shortName: string;
}

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

export interface NHLApiTeamResponse {
    id: number;
    name: string;
    link: string;
    venue: {
      name: string;
      link: string;
      city: string;
      timeZone: {
        id: string;
        offset: number;
        tz: string;
      }
    };
    abbreviation: string;
    teamName: string;
    locationName: string;
    firstYearOfPlay: number;
    division: {
      id: number;
      name: string;
      link: string;
    };
    conference: {
      id: number;
      name: string;
      link: string;
    };
    franchise: {
      franchiseId: number;
      teamName: string;
      link: string;
    };
    shortName: string;
    officialSiteUrl: string;
    franchiseId: number;
    active: boolean;
    roster: {
        roster:
          Array<{
            person: {
              id: number,
              fullName: string;
              link: string;
            };
            jerseyNumber: number;
            position: {
              code: string;
              name: string;
              type: string;
              abbreviation: string;
            }
          }>;
    };
  }

export interface NHLApiTeamList {
    copyright: string;
    teams: NHLApiTeamResponse[];
}
