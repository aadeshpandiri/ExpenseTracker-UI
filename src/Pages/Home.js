import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import sharedContext from "../context/SharedContext";
import { useContext } from "react";
import DoughnutChart from '../components/charts/DoughnutChart'
import { baseurl } from "../components/utils/constant";
import BarChart from "../components/charts/BarChart";
import Loader from "../components/Loader";
import { Button, TextField } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import Chip from '@mui/material/Chip';
import Box from "@mui/material/Box";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import toast from "react-hot-toast";
import dayjs from "dayjs";
import LineChart from "../components/charts/LineChart";
import PieChart from "../components/charts/PieChart";
import { Prev } from "react-bootstrap/esm/PageItem";
const today = new Date();
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
export default function LandingPage(props) {
  const navigate = useNavigate();
  const labels = MONTHS;
  const [isOpen, setDialog] = useState(false);
  const [id, setId] = useState();

  const {token,handleLogout,setLoader}=useContext(sharedContext)
  const [message,setMessage]=useState('')
  const [flag,setFlag]=useState(false)
  const [categories,setCategories]=useState();
  const [newBudget,setNewBudget]=useState({
    amount:'',
    month:today.getMonth()+1,
    year:today.getFullYear()
  })
  const [date,setDate]=useState(null);
  const [expences,setExpences]=useState();
  
  const [currentExpences,setCurrentExpences]=useState();
  const [budget,setBudget]=useState();


  function calculateTotalExpensesSum(data) {
    return data.reduce((sum, item) => sum + item.amount, 0);
  }
  const toggleDrawer = (event, open) => {

    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      setDialog(false)
      return;
    }
    setDialog(open)

  };
  const descriptionElementRef = React.useRef(null);
  const handleClose = (event) => {
    toggleDrawer(event, false)
    setNewBudget({
      amount:'',
    month:'',
    year:''
    })
    setMessage('')
    setDate('')
  };
  React.useEffect(() => {
    if (isOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [isOpen]);
  const getExpences=()=>{
    setLoader(true)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem('access_token')}`);
    myHeaders.append("Content-Type", "application/json");
  
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    
    fetch(`${baseurl.url}/expenses/getAllExpenses`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result.data)
          if(result.status===200){
            setExpences(calculateTotalExpensesSum(result.data))
           
          }
          else if(result.status===401){
            handleLogout()
          }
          setLoader(false)
        })
    
        .catch(error =>{ console.log('error', error)
        setLoader(false)
      });
  }
  const getBudget=()=>{
    setLoader(true)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem('access_token')}`);
    myHeaders.append("Content-Type", "application/json");
    let today=new Date();
    var raw = JSON.stringify(
      {
        "month":today.getMonth()+1,
        "year":today.getFullYear()
      }
    );

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body:raw,
        redirect: 'follow'
    };
    
    fetch(`${baseurl.url}/expenses/getBudgetDetails`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result.data)
          if(result.status===200){
            setBudget(result.data)
           
          }
          else if(result.status===401){
            handleLogout()
          }
          setLoader(false)
        })
    
        .catch(error => {console.log('error', error)
        setLoader(false)
      });
  }
  const getCurrentMonthExpence=()=>{
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem('access_token')}`);
    myHeaders.append("Content-Type", "application/json");
    let today=new Date();
    var raw = JSON.stringify(
      {
        "month":today.getMonth()+1,
        "year":today.getFullYear()
      }
    );
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body:raw,
        redirect: 'follow'
    };
    
    fetch(`${baseurl.url}/expenses/getExpenseByMonthAndYear`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result.data)
          if(result.status===200){
            setCurrentExpences(calculateTotalExpensesSum(result.data))
           
          }
          else if(result.status===401){
            handleLogout()
          }
          setLoader(false)
        })
    
        .catch(error =>{ console.log('error', error)
        setLoader(false)
      });
  }
  useEffect(()=>{
 if(token){

   getExpences()
   getBudget()
  getCurrentMonthExpence();
  }
  },[token,isOpen])
  const handleDateChange = (date) => {
    console.log('new Date(date).getMonth() + 1   ', new Date(date).getMonth() + 1);
    const month = new Date(date).getMonth() + 1; // Note: Months are zero-indexed
    const year = new Date(date).getFullYear();

    // const formattedDate = `${day}-${month}-${year}`;


    setNewBudget({
      ...newBudget,
      'month': month,
      'year':year
    });
    setDate(dayjs(date))
    console.log('formdata:'.newBudget);
    // onChangeInput('date', formattedDate);
  };
  const saveNewBudget=()=>{
    console.log(newBudget)
    if(newBudget?.amount&&newBudget?.month&& newBudget?.year){
      var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem('access_token')}`);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify(newBudget);

var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
};

fetch(`${baseurl.url}/expenses/addBudget`, requestOptions)
		.then(response => response.json())
		.then(result => {
      console.log(result)
      if(result.status===200){
        handleClose()
        setFlag(Prev=>!Prev)
        toast.success(result.message)

      }else if(result.status===400){
        setMessage(result.message.error)
        setId(result.message.id);
      }
     
    })
		.catch(error => {console.log('error', error)
   
  });
    }
  }
  const EditBudget=()=>{
    console.log('edit',newBudget,budget)
    if(newBudget?.amount&&newBudget?.month&& newBudget?.year&&id){
      var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem('access_token')}`);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({...newBudget,
  id:id
});

var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
};

fetch(`${baseurl.url}/expenses/editBudget`, requestOptions)
		.then(response => response.json())
		.then(result => {
      console.log(result)
      
      setMessage('')
      setFlag(Prev=>!Prev)
      // window.location.reload();
      handleClose()
    })
		.catch(error => {console.log('error', error)
   
  });
   
  }
}

const [chartData,setChartData]=useState({
    labels: labels,
    datasets: [
      {
        label: 'Income',
        data: [],
      //   borderColor: ,
      //   backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
      },
      {
        label: 'Expence',
        data: [],
      //   borderColor: Utils.CHART_COLORS.blue,
      //   backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
      }
    ]
  })

useEffect(()=>{
    if(token){
       var myHeaders = new Headers();
       myHeaders.append("Authorization", `Bearer ${token}`);
       myHeaders.append("Content-Type", "application/json");
       var raw = JSON.stringify(
         {
           "year":new Date().getFullYear()
         }
       );
   
       var requestOptions = {
           method: 'POST',
           headers: myHeaders,
           body:raw,
           redirect: 'follow'
       };
       
       fetch(`${baseurl.url}/expenses/getExpenseByYear`, requestOptions)
           .then(response => response.json())
           .then(result => {
            console.log(result,raw)
             if(result.status===200){
              setChartData(
                {
                  labels:labels,
                  datasets:[
                    {
                        label: 'Budget',
                        data: result.data.map(each=>each.budget),
                      //   borderColor: ,
                      //   backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
                      },
                      {
                        label: 'Expence',
                        data:result.data.map(each=>each.total_expenses),
                      //   borderColor: Utils.CHART_COLORS.blue,
                      //   backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
                      }
                  
                    
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
     },[token,flag])


    //  chartdata

    

  return (
    <div className="flex flex-col pt-24">
      <Loader/>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        // scroll={paper}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        PaperProps={{ style: { borderRadius: '10px' ,width:'50%'} }}
      >

        <DialogContent dividers={true} sx={{ padding: 0 }}>
          <div>

            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
              sx={{ padding: '28px' }}
            >
              <Box role="presentation" className='flex flex-col justify-center gap-4'>
                <span className="text-3xl font-bold">Set Budget</span>
                <span>Amount</span>
              <TextField  type='number' defaultValue='' value={newBudget?.amount} onChange={(e)=> setNewBudget({...newBudget,amount:Number(e.target.value)>0?Number(e.target.value):''})}></TextField>
              <span>Select Month and Year</span>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
     
              <DatePicker value={date} onChange={handleDateChange} views={['month', 'year']} />
     
    </LocalizationProvider>
              {!message&&<Button onClick={saveNewBudget}>Save</Button>}
              {/* <Button onClick={saveNewBudget}>Save</Button> */}
              {message&&<div>
                <div>{message}</div>
                <span className="text-red">Do you want to update now?</span> <Button variant='outlined' color="success" onClick={EditBudget} className="text-green cursor-pointer">Yes </Button>  or  <Button variant='outlined' color="error" onClick={handleClose} className="cursor-pointer">No</Button></div>}
              </Box>

            </DialogContentText>
          </div>
        </DialogContent>



      </Dialog>

      <div className="bg-slate-300 rounded-xl p-5 m-2">
        <div><span>Spent in {MONTHS[today?.getMonth()]}</span></div>
        <span className='text-3xl font-bold'>₹</span>
        <span className='text-3xl font-bold' style={{color:(currentExpences)>(budget&&budget[0]?.amount)?'red':'green'}}>{currentExpences}</span>
        <span className='text-2xl'>/{budget?budget[0]?.amount:'-'}</span>
        <span><Button onClick={(event)=>toggleDrawer(event,true)}>Set Budget</Button></span>
      </div>
      <div className="flex flex-col md:grid justify-items-center md:grid-cols-2 items-center">
      <div>
        <DoughnutChart budget={budget&&budget[0]?.amount-currentExpences>0?budget[0]?.amount-currentExpences:0} expence={currentExpences} />
      </div>
      <div>
        <PieChart budget={budget&&budget[0]?.amount-expences>0?budget[0]?.amount-expences:0} expence={expences} />
      </div>
      <div className="col-span-2 row-span-2">
        <BarChart />
      </div>
      <div className="col-span-2 row-span-2">
        <LineChart chartData={chartData}/>
      </div>
      </div>
      </div>
  );
}