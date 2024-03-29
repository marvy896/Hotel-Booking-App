import Receipt from "../Back-End/paymentPage/receipt";
export interface Room {
  _id: string,
  RoomId: number;
  NameOfRoom: string;
  Price: number;
  Image: string;
  Description: string;
}

export interface ReceiptData {
  _id: string|number ;
  occupants: number;
  roomType: number;
  start: string;
  end: string;
  TotalPrice: number;
  Date_of_payment: string;
  cardNumber: string
  customer: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  room: Room
}
