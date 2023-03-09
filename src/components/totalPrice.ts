import { FormEvent } from "react";
import { Room } from "./Interface";

export let NumberOfNights = (start: string | Date, end: string | Date) => {
  let Day1 = typeof start == "string" ? new Date(start) : start;
  let DayLast = typeof end == "string" ? new Date(end) : end;

  if (Day1 < DayLast) {
    let setDay1 = Day1.getTime() as number;
    let setDayLast = DayLast.getTime() as number;
    let finalDate = setDayLast - setDay1;
    let secs = finalDate / 60 / 60 / 24 / 1000;
    return secs;
  } else {
    return 0;
  }
};
export let totalPrice = (
  occupants: number,
  RoomPrice: Room,
  NumberNights: number
) => {
  let TotalCost = occupants * RoomPrice.Price * NumberNights;
  console.log(occupants, RoomPrice.Price, NumberOfNights);
  return TotalCost;
};

// let message:any = (e: FormEvent) =>{
//     e.preventDefault();
//     alert('Please input a valid date')
// }

