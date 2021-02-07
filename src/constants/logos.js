let map = new Map();
map.set("Arizona Cardinals", "cardinals.png");
map.set("Pittsburgh Steelers", "steelers.png");
map.set("Kansas City Chiefs", "chiefs.png");
map.set("New Orleans Saints", "saints.png");
map.set("Buffalo Bills", "bills.png");
map.set("Cleveland Browns", "browns.png");
map.set("Green Bay Packers", "packers.png");
map.set("Indianapolis Colts", "colts.png");
map.set("Seattle Seahawks", "seahawks.png");
map.set("Tampa Bay Buccaneers", "bucs.png");
map.set("Tennessee Titans", "titans.png");
map.set("Los Angeles Rams", "rams.png");
map.set("Baltimore Ravens", "ravens.png");
map.set("Las Vegas Raiders", "raiders.png");
map.set("Miami Dolphins", "dolphins.png");
map.set("Chicago Bears", "bears.png");
map.set("Denver Broncos", "broncos.png");
map.set("Detroit Lions", "lions.png");
map.set("Minnesota Vikings", "vikings.png");
map.set("New England Patriots", "patriots.png");
map.set("San Francisco 49ers", "niners.png");
map.set("Carolina Panthers", "panthers.png");
map.set("Philadelphia Eagles", "eagles.png");
map.set("Atlanta Falcons", "falcons.png");
map.set("Dallas Cowboys", "cowboys.png");
map.set("Houston Texans", "texans.png");
map.set("Los Angeles Chargers", "chargers.png");
map.set("New York Giants", "giants.png");
map.set("Washington Football Team", "footballteam.png");
map.set("Cincinnati Bengals", "bengals.png");
map.set("Jacksonville Jaguars", "jaguars.png");
map.set("New York Jets", "jets.png");

export function getLogoName(stockName) {
  if (map.has(stockName)) {
    return map.get(stockName);
  } else return "";
}
