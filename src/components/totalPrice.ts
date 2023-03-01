import { Room } from "./Interface";
import { Date } from "./Interface";

export let totalPrice = (occupants: number, RoomPrice: Room, NumberOfNights: number) => {
    let TotalCost = occupants * RoomPrice.Price;
   let TotalCostMain = NumberOfNights * TotalCost
    return TotalCostMain;
};

export let NumberOfNights = (start: string | Date,  end: string | Date) =>{
    let Day1 =  typeof start == "string"? new Date(start): start;
    let DayLast =  typeof end == "string"? new Date(end): end;
    let setDay1 = Day1.getTime()as number;
    let setDayLast= DayLast.getTime()as number;
    let finalDate = setDayLast - setDay1 ;
    
    let secs = finalDate / 60 /60 /24 / 1000;

    return(secs)
   }
