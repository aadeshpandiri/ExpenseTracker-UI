import React from 'react'
import { Doughnut } from 'react-chartjs-2'
// import {Chart as ChartJS} from 'chart.js/auto'
// import { options } from 'pg/lib/defaults'

export default function DoughnutChart({budget,expence}) {
  const data = {
    labels: [
      'Budget Remaining',
      'Total Expence'
      
    ],
    datasets: [{
      label: 'Amount',
      data: [budget,expence],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };
    
  return (
    <div className="p-2 rounded-lg">
   <Doughnut data={data} />
   </div>
  )
}
