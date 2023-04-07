import { ReceiptData } from "./Interface";
import React from "react";

export default function PanelCustomers({
  occupants,
  roomType,
  start,
  end,
  TotalPrice,
  Date_of_payment,
  cardNumber,
  customer: { firstName, lastName, email, phone },
}: ReceiptData) {
  let priceFormat = Intl.NumberFormat("en-ng", {
    style: "currency",
    currency: "NGN",
    currencyDisplay: "narrowSymbol",
  }).format(TotalPrice);

  let DateFormat = new Intl.DateTimeFormat("en-US").format(
    new Date(Date_of_payment)
  );
  //TODO: format date and price before sending to the database
    let DateFormat1 = new Intl.DateTimeFormat("en-US").format(new Date(start));
    let DateFormat2 = new Intl.DateTimeFormat("en-US").format(new Date(end));
  return (
      <>
              <td>{firstName}</td>
              <td>{lastName}</td>
              <td>{email}</td>
              <td>{phone}</td>
              <td>{DateFormat}</td>
              <td>{occupants}</td>
              <td>{roomType}</td>
              <td>{ DateFormat1}</td>
              <td>{DateFormat2}</td>
              <td>**** **** **** {cardNumber}</td>
              <td>{priceFormat}</td>
      </>
    // </div>
  );
}
