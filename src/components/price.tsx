import React, {useState, useEffect} from 'react'


export interface Prices {
    RoomId: number,
    Price: number
}

export interface PricingProps {
    RoomId: number,
    occupants: number
}

let totalPrice = (occupants:number, RoomPrice:Prices) => {
    let TotalCost = occupants * RoomPrice.Price   
    return TotalCost;
  };

export default function Pricing({
    RoomId,occupants}: PricingProps) {
        let [Costs, setCost] = useState(0);
        let newPrice = Costs/100
        let numberFormat = Intl.NumberFormat('en-ng', { style: 'currency', currency: 'NGN', currencyDisplay:"narrowSymbol" }).format(newPrice)
        useEffect(()=>{
            try{
                fetch("/roomsData")
                .then(res => res.json())
                .then(({RoomsData}:{RoomsData:Prices[]}) => {
                   let RoomPrice = RoomsData.find(Room => Room.RoomId == RoomId)
                    // (RoomsData)
                    if (RoomPrice ==undefined){
                        // throw new Error(`No Price found for Id ${RoomId}`)
                        return
                    }
                    setCost(totalPrice(occupants, RoomPrice))
                    console.log(RoomsData);
                })
                
            }catch(error){}
        }, [RoomId, occupants])

    
  return (
    <div>
      <>Total Price: {numberFormat} </>
    </div>
  )
}
