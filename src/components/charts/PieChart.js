import React,{useState,useEffect,useContext} from 'react'
import { Pie } from 'react-chartjs-2'
import sharedContext from '../../context/SharedContext';
// import { options } from 'pg/lib/defaults'
import { baseurl } from '../utils/constant';
export default function PieChart() {
 const [chartData,setChartData]=useState({
    labels:[],
    datasets:[
     { 
      data:[],
    
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
    <div className="p-2 rounded-lg">
   <Pie data={chartData} />
   </div>
  )
}
