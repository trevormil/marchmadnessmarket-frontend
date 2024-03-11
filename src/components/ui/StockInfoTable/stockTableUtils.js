import { TableSortLabel } from '@mui/material';
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
                        align="center"
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
            align="center"
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
                        align="center"
                        key={row.name}
                        style={{ minWidth: row.minWidth }}
                    >
                        {handleClick ? (
                            <TableSortLabel
                                style={{ left: 10, color: 'white' }}
                                key={row.name}
                                direction={direction}
                                active={orderBy === row.name}
                                onClick={handleClick}
                                name={row.name}
                                className="text-white hover:text-black"
                            >
                                {row.label}
                            </TableSortLabel>
                        ) : (
                            row.label
                        )}
                    </th>
                );
            })}
        </tr>
    );
}
