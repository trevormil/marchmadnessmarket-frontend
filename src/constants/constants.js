//current date is before march 16th at 12:00PM
export const TOURNAMENT_NOT_STARTED =
    Date.now() > Date.parse('March 12, 2023 5:00:00 EST') &&
    Date.now() < Date.parse('March 15, 2023 12:00:00 EST');

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

function getQuadrantNumber(teamName) {
    switch (teamName) {
        case 'Alabama Crimson Tide':
        case 'Texas A&M-Corpus Christi Islanders':
        case 'Southeast Missouri State Redhawks':
        case 'Texas A&M-Corpus-Christi Islanders / Southeast Missouri State Redhawks':
        case 'Texas A&M-Corpus Christi Islanders / Southeast Missouri State Redhawks':
        case 'Maryland Terrapins':
        case 'West Virginia Mountaineers':
        case 'San Diego State Aztecs':
        case 'Charleston Cougars':
        case 'Virginia Cavaliers':
        case 'Furman Paladins':
        case 'Creighton Bluejays':
        case 'NC State Wolfpack':
        case 'Baylor Bears':
        case 'UC Santa Barbara Gauchos':
        case 'Missouri Tigers':
        case 'Utah State Aggies':
        case 'Arizona Wildcats':
        case 'Princeton Tigers':
            return 1;
        case 'Purdue Boilermakers':
        case 'Texas Southern Tigers':
        case 'Fairleigh Dickinson Knights':
        case 'Fairleigh Dickinson Knights / Texas Southern Tigers':
        case 'Memphis Tigers':
        case 'Florida Atlantic Owls':
        case 'Duke Blue Devils':
        case 'Oral Roberts Golden Eagles':
        case 'Tennessee Volunteers':
        case "Louisiana Ragin' Cajuns":
        case 'Kentucky Wildcats':
        case 'Provvidence Friars':
        case 'Kansas State Wildcats':
        case 'Montana State Bobcats':
        case 'Michigan State Spartans':
        case 'USC Trojans':
        case 'Marquette Golden Eagles':
        case 'Vermont Catamounts':
            return 3;
        case 'Houston Cougars':
        case 'Northern Kentucky Norse':
        case 'Iowa Hawkeyes':
        case 'Auburn Tigers':
        case 'Miami Hurricanes':
        case 'Drake Bulldogs':
        case 'Indiana Hoosiers':
        case 'Kent State Golden Flashes':
        case 'Iowa State Cyclones':
        case 'Mississippi State Bulldogs':
        case 'Pittsburgh Panthers':
        case 'Pittsburgh Panthers / Mississippi State Bulldogs':
        case 'Xavier Musketeers':
        case 'Kennesaw State Owls':
        case 'Texas A&M Aggies':
        case 'Penn State Nittany Lions':
        case 'Texas Longhorns':
        case 'Colgate Raiders':
            return 2;
        default:
            return 4;
    }
}

export function getQuadrant(teamName) {
    const num = getQuadrantNumber(teamName);
    switch (num) {
        case 1:
            return '/quadOne.png';
        case 2:
            return '/quadTwo.png';
        case 3:
            return '/quadThree.png';
        case 4:
            return '/quadFour.png';
        default:
            return '/quadOne.png';
    }
}

export function getSide(teamName) {
    const num = getQuadrantNumber(teamName);
    switch (num) {
        case 1:
        case 3:
            return '/sideOne.png';
        case 2:
        case 4:
            return '/sideTwo.png';
        default:
            return '/sideOne.png';
    }
}
