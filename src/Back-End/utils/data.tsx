import { useEffect, useState } from "react";
import { ReceiptData } from "../../components/Interface";
import React from "react";
import { Pie } from "react-chartjs-2";

export default function RoomTypePieChart({bookingData}:{bookingData: ReceiptData[]}){
    //@ts-ignore
    const [chartData, setChartData] = useState<Chart.ChartData>({
      labels: [],
      datasets: [
        {
          label: "Rooms Used",
          data: [],
          backgroundColor: ["rgba(75,192,192,1)", "#f3ba2f", "#2a71d0"],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
    useEffect(() => {
      console.log("hey ", bookingData)
      let { data: data2, labels } = getPie(bookingData);
      // Update chart data when 'data' state changes
      setChartData((prevState: { datasets: any[] }) => ({
        ...prevState,
        // labels: data.map((data) => data.room.NameOfRoom),
        labels,
        datasets: [
          {
            ...prevState.datasets[0],
            // data: data.map((response) => response.roomType),
            data: data2,
          },
        ],
      }));
    }, [bookingData]);
  
    let getPie = (pieData: ReceiptData[]) => {
      let labels: string[] = [];
      let data: number[] = [];
      //to iterate through the data
      for (const booking of pieData) {
        //to check the labels to see if it contains nameof room
        let i = labels.indexOf(booking.room.NameOfRoom);
        //checking if the roomtype is similar and its in the labels array
        if (i != -1) {
          data[i] = data[i] + 1;
        } else {
          labels.push(booking.room.NameOfRoom);
          //this is pushing 1 because its the first time the room is encountered,
          //then next time it will increment;
          data.push(1);
        }
      }
  
      return { data, labels };
    };
    return (
      <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Room Usage Data</h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Rooms Frequently Used",
            },
          },
        }}
      />
    </div>
  
    );
}