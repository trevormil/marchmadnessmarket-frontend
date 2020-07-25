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
            return true;
        case "stockName":
        case "dividends":
        case "market":
        case "buy":
        case "sell":
            return false;
        default:
            return false;
    }
}

//sorts the stocks on local machine (not server)
export function sort(stocksObj, colName, direction) {
    switch (isNumeric(colName)) {
        case true:
            if (direction === "asc") {
                return stocksObj.sort((a, b) => (a[colName] - b[colName]))
            } else {
                return stocksObj.sort((a, b) => (b[colName] - a[colName]))
            }
        case false:
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
export function filterStocks(stocks, filter) {
    let filteredStocks = [];
    switch (isNumeric(filter.columnValue)) {
        case true:
            if (filter.criteria === "equals") {
                stocks.forEach(stock => {
                    if (stock[filter.columnValue] === Number(filter.lowerLimit)) {
                        filteredStocks.push(stock);
                    }
                })
            } else if (filter.criteria === "between") {
                stocks.forEach(stock => {
                    if (stock[filter.columnValue] >= Number(filter.lowerLimit)
                        && stock[filter.columnValue] <= Number(filter.upperLimit)) {
                        filteredStocks.push(stock);
                    }
                })
            }
            break;
        case false:
            if (filter.criteria === "equals") {
                stocks.forEach(stock => {
                    if (stock[filter.columnValue] === filter.lowerLimit) {
                        filteredStocks.push(stock);
                    }
                })
            } else if (filter.criteria === "between") {
                stocks.forEach(stock => {
                    if (stock[filter.columnValue] >= filter.lowerLimit
                        && stock[filter.columnValue] <= filter.upperLimit) {
                        filteredStocks.push(stock);
                    }
                })
            }
            break;
        default:
            break;
    }
    return filteredStocks;
}