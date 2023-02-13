import React from 'react'
import { Roomss } from '../components/listRooms'


export default function SelectRooms({
    NameOfRoom}: Roomss){
  return (
    <select>        
            <option value="1">Presidential Suite</option>
            <option value="2">Connecting Room</option>
            <option value="3">Family Room</option>
            <option value="4">Double Room</option>
    </select>
  )
}
