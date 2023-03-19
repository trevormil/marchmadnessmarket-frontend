//gets which columns are numeric
export const isNumeric = (value) => {
    switch (value) {
        case 'price':
        case 'float':
        case 'marketCap':
        case 'open':
        case 'low':
        case 'high':
        case 'volume':
        case 'avgBuyPrice':
        case 'numShares':
        case 'currPrice':
        case 'totalValue':
        case 'profit':
        case 'ipoPrice':
        case 'currPoints':
        case 'seed':
        case 'wins':
        case 'hasLost':
            return true;

        case 'stockName':
        case 'dividends':
        case 'market':
        case 'activeOrder':
        case 'watchlist':
            return false;
        default:
            return false;
    }
};

//sorts the stocks on local machine (not server)
export function sort(stocksObj, colName, direction, watchlist) {
    switch (isNumeric(colName)) {
        case true:
            if (colName === 'wins') {
                for (let i = 0; i < stocksObj.length; i++) {
                    stocksObj[i].wins =
                        stocksObj[i].currPoints / stocksObj[i].seed;
                }
            }

            if (direction === 'asc') {
                return stocksObj.sort((a, b) => a[colName] - b[colName]);
            } else {
                return stocksObj.sort((a, b) => b[colName] - a[colName]);
            }
        case false:
            if (direction === 'asc') {
                return stocksObj.sort((a, b) =>
                    a[colName].localeCompare(b[colName])
                );
            } else {
                return stocksObj.sort((a, b) =>
                    b[colName].localeCompare(a[colName])
                );
            }
        default:
            return stocksObj;
    }
}

//filters stocks based on a filter parameter
export function filterStocks(stocks, filterArr) {
    let filteredStocks = stocks;

    filterArr.forEach((filter) => {
        let filtered = [];
        switch (isNumeric(filter.columnValue)) {
            case true:
                if (filter.criteria === 'equals') {
                    filteredStocks.forEach((stock) => {
                        if (
                            stock[filter.columnValue] ===
                            Number(filter.lowerLimit)
                        ) {
                            filtered.push(stock);
                        }
                    });
                } else if (
                    filter.criteria === 'between' ||
                    filter.criteria === 'greaterThan' ||
                    filter.criteria === 'lessThan'
                ) {
                    filteredStocks.forEach((stock) => {
                        if (
                            stock[filter.columnValue] >=
                                Number(filter.lowerLimit) &&
                            stock[filter.columnValue] <=
                                Number(filter.upperLimit)
                        ) {
                            filtered.push(stock);
                        }
                    });
                }
                break;
            case false:
                let lowerLimit;
                if (filter.columnValue === 'activeOrder') {
                    lowerLimit = filter.lowerLimit === 'true';
                    filter.criteria = 'equals';
                } else lowerLimit = filter.lowerLimit;
                if (filter.criteria === 'equals') {
                    filteredStocks.forEach((stock) => {
                        if (stock[filter.columnValue] === lowerLimit) {
                            filtered.push(stock);
                        }
                    });
                } else if (filter.criteria === 'between') {
                    filteredStocks.forEach((stock) => {
                        if (
                            stock[filter.columnValue] >= lowerLimit &&
                            stock[filter.columnValue] <= filter.upperLimit
                        ) {
                            filtered.push(stock);
                        }
                    });
                }
                break;
            default:
                break;
        }
        filteredStocks = filtered;
    });

    return filteredStocks;
}
