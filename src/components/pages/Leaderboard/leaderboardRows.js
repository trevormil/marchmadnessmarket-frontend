import React from 'react';
import {
    StyledTableCell,
    StyledTableRow,
} from '../../ui/StockInfoTable/styledTableComponents';
import Blockies from 'react-blockies';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import {
    getCellToDisplay,
    getHeaderRowFromSchema,
} from '../../ui/StockInfoTable/stockTableUtils';

export const LeaderboardSchema = [
    {
        name: 'rank',
        label: 'Rank',
        showMobile: false,
        showIfTournamentHasStarted: true,
        showIfTournamentHasNotStarted: true,
        showIfHomePage: true,
    },
    {
        name: 'icon',
        label: 'Icon',
        showMobile: true,
        showIfTournamentHasStarted: true,
        showIfTournamentHasNotStarted: true,
        showIfHomePage: true,
    },
    {
        name: 'userName',
        label: 'Username',
        showMobile: true,
        showIfTournamentHasStarted: true,
        showIfTournamentHasNotStarted: true,
        showIfHomePage: true,
    },
    {
        name: 'totalAccountValue',
        label: 'Points',
        showMobile: true,
        showIfTournamentHasStarted: true,
        showIfTournamentHasNotStarted: true,
        showIfHomePage: true,
    },
    {
        name: 'maxAccountValue',
        label: 'Max',
        showMobile: false,
        showIfTournamentHasStarted: true,
        showIfTournamentHasNotStarted: true,
        showIfHomePage: false,
    },
];

export function getUserRow(userInfo, rank, mobile, homePage, isFixedUser) {
    return (
        <tr
            style={{
                borderBottom: isFixedUser ? '3px solid black' : undefined,
            }}
            className="bg-primary cursor-pointer text-white rounded-lg py-2 px-4 text-sm hover:bg-gray-300 hover:border-primary hover:text-black hover:border-primary"
            onClick={() => {
                window.location.href = `${ROUTES.USERS}/${userInfo.userName}`;
            }}
        >
            {getCellToDisplay(
                mobile,
                LeaderboardSchema.find((x) => x.label === 'Rank'),
                rank
            )}
            {getCellToDisplay(
                mobile,
                LeaderboardSchema.find((x) => x.label === 'Icon'),
                <Blockies
                    seed={userInfo.userName}
                    size={18}
                    scale={3}
                    className="identicon"
                />
            )}
            {getCellToDisplay(
                mobile,
                LeaderboardSchema.find((x) => x.label === 'Username'),

                <Link
                    to={`${ROUTES.USERS}/${userInfo.userName}`}
                    style={{ fontSize: 16, textAlign: 'start' }}
                >
                    <b>{userInfo.userName}</b>
                </Link>
            )}
            {getCellToDisplay(
                mobile,
                LeaderboardSchema.find((x) => x.label === 'Points'),
                userInfo.totalAccountValue.toFixed(0)
            )}
            {getCellToDisplay(
                mobile,
                LeaderboardSchema.find((x) => x.label === 'Max'),
                userInfo.maxAccountValue
                    ? userInfo.maxAccountValue.toFixed(0)
                    : 0,
                homePage
            )}
        </tr>
    );
}

//gets all rows for all users and account values
export function getRows(leaderboard, mobile, page, username, homePage) {
    let PAGE_SIZE = 25;

    let index = 0;
    const userInfo = leaderboard.find((user, i) => {
        if (user.userName === username) {
            index = i;
            return true;
        }
        return false;
    });

    return leaderboard ? (
        <>
            {userInfo && (
                <>{getUserRow(userInfo, index + 1, mobile, homePage, true)}</>
            )}

            {leaderboard.map((row, i) => {
                if (i < (page - 1) * PAGE_SIZE || i >= page * PAGE_SIZE) {
                    return <></>;
                }

                return <>{getUserRow(row, i + 1, mobile, homePage)}</>;
            })}
        </>
    ) : (
        <StyledTableRow>
            <StyledTableCell>No users found.</StyledTableCell>
        </StyledTableRow>
    );
}

//gets the leaderboard header row
export function getHeaderRow(mobile, homePage) {
    return getHeaderRowFromSchema(
        LeaderboardSchema,
        undefined,
        undefined,
        undefined,
        mobile,
        homePage
    );
}
