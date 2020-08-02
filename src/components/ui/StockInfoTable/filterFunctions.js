export const inWatchlist = (watchlist, stockObj) => {
    let inWatchlist = false;
    if (watchlist) {
        watchlist.forEach(stock => {
            if (stockObj.stockId === stock.stockId) {
                inWatchlist = true;
            }
        });
    }
    if (inWatchlist) return 1;
    else return -1;
}

//gets which columns are numeric
export const isNumeric = (value) => {
    switch (value) {
        case "price":
        case "float":
        case "marketCap":
        case "open":
        case "low":
        case "high":
        case "volume":
        case "avgBuyPrice":
        case "numShares":
        case "currPrice":
        case "totalValue":
        case "profit":
            return true;
        case "stockName":
        case "dividends":
        case "market":
        case "activeOrder":
        case "watchlist":
            return false;
        default:
            return false;
    }
}

//sorts the stocks on local machine (not server)
export function sort(stocksObj, colName, direction, watchlist) {
    switch (isNumeric(colName)) {
        case true:
            if (colName === "totalValue") {
                if (direction === "asc") {
                    return stocksObj.sort((a, b) => ((a["numShares"] * a["currPrice"]) - (b["numShares"] * b["currPrice"])))
                } else {
                    return stocksObj.sort((a, b) => ((b["numShares"] * b["currPrice"]) - (a["numShares"] * a["currPrice"])))
                }
            } else if (colName === "profit") {
                if (direction === "asc") {
                    return stocksObj.sort((a, b) => (((a["currPrice"] - a["avgBuyPrice"]) * a["numShares"])
                        - ((b["currPrice"] - b["avgBuyPrice"]) * b["numShares"])))
                } else {
                    return stocksObj.sort((a, b) => (((b["currPrice"] - b["avgBuyPrice"]) * b["numShares"])
                        - ((a["currPrice"] - a["avgBuyPrice"]) * a["numShares"])))
                }
            }
            if (direction === "asc") {
                return stocksObj.sort((a, b) => (a[colName] - b[colName]))
            } else {
                return stocksObj.sort((a, b) => (b[colName] - a[colName]))
            }
        case false:
            if (colName === "watchlist") {
                if (direction === "asc") {
                    return stocksObj.sort((a, b) => inWatchlist(watchlist, a) - inWatchlist(watchlist, b));
                } else {
                    return stocksObj.sort((a, b) => inWatchlist(watchlist, b) - inWatchlist(watchlist, a));
                }
            }
            if (colName === "activeOrder") {
                if (direction === "asc") {
                    return stocksObj.sort((a, b) => {
                        if (a[colName] === b[colName]) {
                            return 0;
                        }
                        else if (a[colName]) {
                            return 1;
                        } else if (b[colName]) {
                            return -1;
                        } else return 0;
                    });
                } else {
                    return stocksObj.sort((a, b) => {
                        if (a[colName] === b[colName]) {
                            return 0;
                        }
                        else if (b[colName]) {
                            return 1;
                        } else if (a[colName]) {
                            return -1;
                        } else return 0;
                    });
                }
            }
            if (direction === "asc") {
                return stocksObj.sort((a, b) => a[colName].localeCompare(b[colName]));
            } else {
                return stocksObj.sort((a, b) => b[colName].localeCompare(a[colName]));
            }
        default:
            return stocksObj;
    }
}

//filters stocks based on a filter parameter
export function filterStocks(stocks, filterArr) {
    let filteredStocks = stocks;

    filterArr.forEach(filter => {
        let filtered = [];
        switch (isNumeric(filter.columnValue)) {
            case true:
                if (filter.criteria === "equals") {
                    filteredStocks.forEach(stock => {
                        if (stock[filter.columnValue] === Number(filter.lowerLimit)) {
                            filtered.push(stock);
                        }
                    })
                } else if (filter.criteria === "between" ||
                    filter.criteria === "greaterThan" ||
                    filter.criteria === "lessThan") {
                    filteredStocks.forEach(stock => {
                        if (stock[filter.columnValue] >= Number(filter.lowerLimit)
                            && stock[filter.columnValue] <= Number(filter.upperLimit)) {
                            filtered.push(stock);
                        }
                    })
                }
                break;
            case false:
                let lowerLimit;
                if (filter.columnValue === "activeOrder") {
                    lowerLimit = (filter.lowerLimit === "true");
                    filter.criteria = "equals";
                } else lowerLimit = filter.lowerLimit;
                if (filter.criteria === "equals") {
                    filteredStocks.forEach(stock => {
                        if (stock[filter.columnValue] === lowerLimit) {
                            filtered.push(stock);
                        }
                    })
                } else if (filter.criteria === "between") {
                    filteredStocks.forEach(stock => {
                        if (stock[filter.columnValue] >= lowerLimit
                            && stock[filter.columnValue] <= filter.upperLimit) {
                            filtered.push(stock);
                        }
                    })
                }
                break;
            default:
                break;
        }
        filteredStocks = filtered;
    })

    return filteredStocks;
}