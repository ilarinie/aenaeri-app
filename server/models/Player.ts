export interface Player {
    id: number;
    fullName: string;
    firstName: string;
    lastName: string;
    primaryNumber: number;
    birthDate: string;
    currentAge: number;
    birthCity: string;
    birthStateProvince?: string;
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
    teamId: number;
    position: string;
}
