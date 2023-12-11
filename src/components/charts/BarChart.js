import React,{useState,useRef} from 'react'
import { Bar } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
// import { options } from 'pg/lib/defaults'
import { baseurl } from '../utils/constant';
import { useContext ,useEffect} from 'react';
import sharedContext from '../../context/SharedContext';
import './chart.css'
export default function BarChart({}) {
  const [chartData,setChartData]=useState({
    labels:[],
    datasets:[
     { 
      data:[],
      cutout:'90%'
      }
      ,
      
    ],
    
  });
  const {token,handleLogout}=useContext(sharedContext)
  useEffect(()=>{
    if(token){
       var myHeaders = new Headers();
       myHeaders.append("Authorization", `Bearer ${token}`);
       
       var requestOptions = {
           method: 'GET',
           headers: myHeaders,
           redirect: 'follow'
       };
       
       fetch(`${baseurl.url}/category/getAllCategories`, requestOptions)
           .then(response => response.json())
           .then(result => {
             if(result.status===200){
              setChartData(
                {
                  labels:result.data.map(each=>each.name),
                  datasets:[
                   { 
                    label:'Amount Spent',
                    data:result.data.map(each=>each.total_expenses),
                    cutout:'90%'
                    }
                    ,
                    
                  ],
                  
                }
              )
               // getExpences(result.data)
             }
             else if(result.status===401){
               handleLogout()
             }
             
           })
           .catch(error => console.log('error', error));
         }
     },[token])
  return (
    <div className='responsiveChart'>
   <Bar data={chartData}
    // options={options}
    // plugins={[moveChart]}
    // ref={myChart}
    // onClick={()=>moveScroll()}
    />
    </div>
  )
}
