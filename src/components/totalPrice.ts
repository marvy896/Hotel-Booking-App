import { Room } from "./Interface";


export let totalPrice = (occupants: number, RoomPrice: Room, NumberOfNights: number) => {
    let TotalCost = occupants * RoomPrice.Price;
   let TotalCostMain = NumberOfNights * TotalCost
    return TotalCostMain;
};

let message:any = () =>{
    alert('Please input a valid date')
}
export let NumberOfNights = (start: string | Date,  end: string | Date) =>{
    let Day1 =  typeof start == "string"? new Date(start): start;
    let DayLast =  typeof end == "string"? new Date(end): end;

    if (Day1 < DayLast){
        let setDay1 = Day1.getTime()as number;
        let setDayLast= DayLast.getTime()as number;
        let finalDate = setDayLast - setDay1 ;
        let secs = finalDate / 60 /60 /24 / 1000;
        return(secs)
    } 
    else{
        return message()
    }
   }
