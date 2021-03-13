export function isInvalidDate() {
  let dateFrom = ["19/03/2021", "27/03/2021", "03/04/2021"];
  let dateTo = ["23/03/2021", "31/03/2021", "20/04/2021"];
  let currDate = new Date();
  let dateCheck =
    currDate.getDate() +
    "/" +
    (currDate.getMonth() + 1) +
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
      console.log(from + " " + to);
      invalidDate = true;
    }
    i++;
  });

  return invalidDate;
}
