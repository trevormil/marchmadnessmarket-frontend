import {
    TOURNAMENT_NOT_STARTED,
    TOURNAMENT_STARTED,
} from '../../../constants/constants';
import { StyledTableCell, StyledTableRow } from './styledTableComponents';

export function getBlankRowFromSchema(
    schema,
    mobile,
    firstCellContent,
    homePage
) {
    let displayedContent = false;
    return (
        <StyledTableRow>
            {schema.map((row, idx) => {
                const isFirstCell = displayedContent === false;
                if (mobile && !row.showMobile) {
                    return <></>;
                }
                if (
                    TOURNAMENT_NOT_STARTED &&
                    !row.showIfTournamentHasNotStarted
                ) {
                    return <></>;
                }
                if (TOURNAMENT_STARTED && !row.showIfTournamentHasStarted) {
                    return <></>;
                }

                if (homePage && !row.showIfHomePage) {
                    return <></>;
                }

                displayedContent = true;

                return (
                    <StyledTableCell
                        key={row.name}
                        style={{ minWidth: row.minWidth }}
                    >
                        {isFirstCell && firstCellContent}
                    </StyledTableCell>
                );
            })}
        </StyledTableRow>
    );
}

export function getCellToDisplay(mobile, schemaItem, content, homePage) {
    if (mobile && !schemaItem.showMobile) {
        return <></>;
    }
    if (TOURNAMENT_NOT_STARTED && !schemaItem.showIfTournamentHasNotStarted) {
        return <></>;
    }
    if (TOURNAMENT_STARTED && !schemaItem.showIfTournamentHasStarted) {
        return <></>;
    }

    if (homePage && !schemaItem.showIfHomePage) {
        return <></>;
    }

    return (
        <StyledTableCell
            key={schemaItem.name}
            style={{ minWidth: schemaItem.minWidth }}
        >
            {content}
        </StyledTableCell>
    );
}

//gets the header row
export function getHeaderRowFromSchema(
    schema,
    orderBy,
    direction,
    handleClick,
    mobile,
    homePage
) {
    return (
        <tr>
            {schema.map((row) => {
                if (mobile && !row.showMobile) {
                    return <></>;
                }
                if (
                    TOURNAMENT_NOT_STARTED &&
                    !row.showIfTournamentHasNotStarted
                ) {
                    return <></>;
                }
                if (TOURNAMENT_STARTED && !row.showIfTournamentHasStarted) {
                    return <></>;
                }

                if (homePage && !row.showIfHomePage) {
                    return <></>;
                }
                return (
                    <th
                        key={row.name}
                        style={{ minWidth: row.minWidth, textAlign: 'center' }}
                        className="px-4 py-2.5 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider"
                    >
                        <div className="flex justify-center items-center">
                            {handleClick ? (
                                <button
                                    onClick={handleClick}
                                    name={row.name}
                                    className={`inline-flex items-center justify-center space-x-1 text-slate-300 hover:text-blue-400 transition-colors ${
                                        orderBy === row.name
                                            ? 'text-blue-400'
                                            : ''
                                    }`}
                                >
                                    <span>{row.label}</span>
                                    {orderBy === row.name && (
                                        <svg
                                            className={`w-4 h-4 transition-transform ${
                                                direction === 'asc'
                                                    ? ''
                                                    : 'rotate-180'
                                            }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 15l7-7 7 7"
                                            />
                                        </svg>
                                    )}
                                </button>
                            ) : (
                                <span className="text-center">{row.label}</span>
                            )}
                        </div>
                    </th>
                );
            })}
        </tr>
    );
}
