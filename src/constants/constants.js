export const LAST_UPDATED_AT = 'Wed, March 8th @ 9:30AM';
export const TOURNAMENT_NOT_STARTED = false;

export function getQuadrant(teamName) {
    switch (teamName) {
        case 'Miami Hurricanes':
            return '/quadOne.png';
        default:
            return '/quadOne.png';
    }
}

export function getSide(teamName) {
    switch (teamName) {
        case 'Miami Hurricanes':
            return '/quadOne.png';
        default:
            return '/quadOne.png';
    }
}
