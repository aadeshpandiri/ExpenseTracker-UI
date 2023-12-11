import React, { useContext } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { baseurl } from './utils/constant';
import toast from 'react-hot-toast';
import sharedContext from '../context/SharedContext';
export default function Expence({data,getExpences}) {
    const {handleLogout,setLoader}=useContext(sharedContext)
    const handleDelete=()=>{
        setLoader(true)
        var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem('access_token')}`);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "id": data?.id
});

var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
};

fetch(`${baseurl.url}/expenses/deleteExpense`, requestOptions)
		.then(response => response.json())
		.then(result =>{ 
            if(result.status===200){
                console.log(result)
                toast.success(result.message)
                getExpences()
                setLoader(false)
            }
            else if(result.status===401){
                handleLogout()
            }
       
        })
		.catch(error => {console.log('error', error)
        setLoader(false)
    });
    }
  return (
    <div className='w-full m-2 p-3 bg-slate-100'>
        
        <div className='flex justify-between'>
            <span className='text-3xl'>{data?.category_name}</span>
            <span>{data?.amount}/-</span>
            <span>{data?.date}</span>
            <span><DeleteIcon onClick={handleDelete}/></span>
            
        </div>
        <div>{data?.description}</div>

    </div>
  )
}
