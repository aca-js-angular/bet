export interface Game {
    team_1: string;
    team_2: string;
    team1: string;
    team2: string;
    category: string;
    categoryName: string;
    subCategory: string;
    subCategoryName: string;
    odds: {
        draw: number,
        team_1: number,
        team_2: number,
    }
    start_time: Date;
    end_time: Date;
    type: string;
    id: string;
}