import { Room } from "./Interface";

export let totalPrice = (occupants: number, RoomPrice: Room) => {
    let TotalCost = occupants * RoomPrice.Price;
    return TotalCost;
};
