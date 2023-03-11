export const LAST_UPDATED_AT = 'Fri, March 10th @ 8:00AM';

//current date is before march 16th at 12:00PM
export const TOURNAMENT_NOT_STARTED =
    Date.now() > Date.parse('March 12, 2023 5:00:00 EST') &&
    Date.now() < Date.parse('March 16, 2023 12:00:00 EST');

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
