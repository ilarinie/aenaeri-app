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
