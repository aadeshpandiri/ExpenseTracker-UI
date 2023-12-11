import React, { useContext ,useEffect, useState} from 'react'
import { Line } from 'react-chartjs-2'
import sharedContext from '../../context/SharedContext';
import { baseurl } from '../utils/constant';
import './chart.css'
const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
export default function LineChart({chartData}) {
   
    const labels = MONTHS;
const {token,handleLogout}=useContext(sharedContext)
// const [chartData,setChartData]=useState({
//     labels: labels,
//     datasets: [
//       {
//         label: 'Income',
//         data: [],
//       //   borderColor: ,
//       //   backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
//       },
//       {
//         label: 'Expence',
//         data: [],
//       //   borderColor: Utils.CHART_COLORS.blue,
//       //   backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
//       }
//     ]
//   })

// useEffect(()=>{
//     if(token){
//        var myHeaders = new Headers();
//        myHeaders.append("Authorization", `Bearer ${token}`);
//        myHeaders.append("Content-Type", "application/json");
//        var raw = JSON.stringify(
//          {
//            "year":new Date().getFullYear()
//          }
//        );
   
//        var requestOptions = {
//            method: 'POST',
//            headers: myHeaders,
//            body:raw,
//            redirect: 'follow'
//        };
       
//        fetch(`${baseurl.url}/expenses/getExpenseByYear`, requestOptions)
//            .then(response => response.json())
//            .then(result => {
//             console.log(result,raw)
//              if(result.status===200){
//               setChartData(
//                 {
//                   labels:labels,
//                   datasets:[
//                     {
//                         label: 'Budget',
//                         data: result.data.map(each=>each.budget),
//                       //   borderColor: ,
//                       //   backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
//                       },
//                       {
//                         label: 'Expence',
//                         data:result.data.map(each=>each.total_expenses),
//                       //   borderColor: Utils.CHART_COLORS.blue,
//                       //   backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
//                       }
                  
                    
//                   ],
                  
//                 }
//               )
//                // getExpences(result.data)
//              }
//              else if(result.status===401){
//                handleLogout()
//              }
             
//            })
//            .catch(error => console.log('error', error));
//          }
//      },[token])

  return (
    <div className='responsiveChart'>
        <Line data={chartData}  />
    </div>
  )
}
