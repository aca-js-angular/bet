import { Game } from 'src/app/games/interfaces/game';

export interface Bet {
    amount?: number,
    game?: Game,
    odd?: string,
    user?: string,
}