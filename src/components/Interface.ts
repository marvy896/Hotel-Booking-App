import Receipt from "../Back-End/paymentPage/receipt";
export interface Room {
  RoomId: number;
  NameOfRoom: string;
  Price: number;
  Image: string;
  Description: string;
}

export interface ReceiptData {
  _id: string;
  occupants: number;
  roomType: number;
  start: string;
  end: string;
  TotalPrice: number;
  customer: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}
