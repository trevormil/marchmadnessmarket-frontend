export function isInvalidDate() {
  let dateFrom = ["03/19/2021", "03/27/2021", "04/03/2021"];
  let dateTo = ["03/22/2021", "03/30/2021", "04/20/2021"];
  let currDate = new Date();
  let dateCheck =
    currDate.getMonth() +
    1 +
    "/" +
    currDate.getDate() +
    "/" +
    currDate.getFullYear();

  let i = 0;
  let invalidDate = false;
  dateFrom.forEach((date) => {
    let d1 = date.split("/");
    let d2 = dateTo[i].split("/");
    let c = dateCheck.split("/");

    let from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]); // -1 because months are from 0 to 11
    let to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
    let check = new Date(c[2], parseInt(c[1]) - 1, c[0]);

    if (check >= from && check <= to) {
      invalidDate = true;
    }
    i++;
  });
  return invalidDate;
}
