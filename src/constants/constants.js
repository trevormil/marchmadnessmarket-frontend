export const LAST_UPDATED_AT = 'Fri, March 10th @ 8:00AM';
export const TOURNAMENT_NOT_STARTED = false;

// export function getRoundedTime() {
//     var timeToReturn = new Date();

//     timeToReturn.setMilliseconds(
//         Math.round(timeToReturn.getMilliseconds() / 1000) * 1000
//     );
//     timeToReturn.setSeconds(Math.round(timeToReturn.getSeconds() / 60) * 60);
//     timeToReturn.setMinutes(Math.round(timeToReturn.getMinutes() / 30) * 30);

//     return timeToReturn;
// }

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
