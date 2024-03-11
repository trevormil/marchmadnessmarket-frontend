//current date is before march 16th at 12:00PM
export const TOURNAMENT_NOT_STARTED =
    Date.now() < Date.parse('March 21, 2024 12:00:00 EST');

export const TOURNAMENT_STARTED = !TOURNAMENT_NOT_STARTED;
export const BRACKET_IMG_PATH = '/bracket2023.png';

export function getRoundName(roundNum) {
    switch (roundNum) {
        case 64:
            return 'Lose in First Round';
        case 32:
            return 'Lose in Second Round';
        case 16:
            return 'Lose in Sweet 16';
        case 8:
            return 'Lose in Elite 8';
        case 4:
            return 'Lose in Final Four';
        case 2:
            return 'Lose in Championship';
        case 1:
            return 'Win Championship';
        default:
            return 'Error';
    }
}
