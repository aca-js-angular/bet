export interface Game {
    team_1: string;
    team_2: string;
    odds: {
        draw: number,
        team_1: number,
        team_2: number,
    }
    start_time: Date,
    end_time: Date,
    type: string
}