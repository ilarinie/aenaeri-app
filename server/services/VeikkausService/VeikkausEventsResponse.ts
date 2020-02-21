export interface VeikkausEventsResponse {
    gameName: string;
    brandName: string;
    id: string;
    name: string;
    status: string;
    openTime: number;
    closeTime: number;
    drawTime: number;
    resultsAvailableTime: number;
    gameRuleSet: {
        basePrice: number;
        maxPrice: number;
        minStake: number;
        maxStake: number;
        minSystemLevel: number;
        maxSystemLevel: number;
        oddsType: string;
    },
    rows: Array<
        {
            id: string;
            status: string;
            includedRowCount: number;
            name: string;
            shortName: string;
            description: string;
            detailedDescription: string;
            tvChannel: string;
            competitors: [
                {
                    id: string;
                    name: string;
                    number: number;
                    odds: {
                        odds: number;
                    },
                    status: string;
                    handicap: string;
                },
                {
                    id: string;
                    name: string;
                    number: number;
                    odds: {
                        odds: number;
                    },
                    status: string;
                },
                {
                    id: string;
                    name: string;
                    odds: {
                        odds: number;
                    },
                    status: string;
                }
            ],
            eventId: string;
            excludedEvents: string[]
        }
    >;
}