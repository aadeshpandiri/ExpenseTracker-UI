import React, { useState } from "react";
import "./SideBar.css";
import Wallet from "../../../assets/wallet.svg";
import Tax from "../../../assets/home-icon.svg";
import Logout from "../../../assets/Logout.svg";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };



  const sidebarmenu=[
    {
      label:'Home',
      logo:Tax,
      navigate:'/',
      width:'30px'
    },
{
  label:'Expense Management',
  logo:Wallet,
  navigate:'/expence-management',
  width:'30px'
}
,
{
  label:'Logout',
  logo:Logout,
  navigate:'/',
  width:'26px'
}
];
   const [state, setState] = useState(false);
 const toggleDrawer = (anchor, open, event) => {
  if (
    event &&
    event.type === "keydown" &&
    (event.key === "Tab" || event.key === "Shift")
  ) {
    return;
  }

  setState(!state);
};
  const onLogOut = () =>{
    try {

     sessionStorage.clear();
        navigate("/")
        window.location.reload()    
    } catch (error) {
      console.log("Error:", error);
    }
  }

 

  const onSubmit = (each) => {
      if(each.label === "Logout"){
          // localStorage.clear();
          // navigate(each.navigate)
          // window.location.reload()

          onLogOut()
      }else{
        navigate(each.navigate)
      }
  }


  return (
    <div >
       <div className="flex flex-row-reverse items-center justify-around h-20 gap-10 w-full fixed bg-[rgb(23,23,23)] z-10	md:hidden"> <IconButton
        edge="end"
        aria-label="menu"
        onClick={(event) => toggleDrawer("right", true, event)}
        sx={{
          color: `white`,
          display: { xs: `inline`, md: `none`, lg: `none` },
          width: "10%",
          textAlign: "end",
        }}
      >
   
        <Menu fontSize="large" />
      
      </IconButton>
      <Drawer
        anchor="left"
        open={state}
        onClose={(event) => toggleDrawer("right", false, event)}
        sx={{
          ".MuiDrawer-paper": {
            bgcolor: "black",
          },
        }}
        color="primary.dark"
        
      >
        <div className="m-2 flex flex-col gap-3">
          {sidebarmenu?.map((each)=>{
          return <div className="flex items-center gap-4 p-2 mt-2 cursor-pointer " onClick={(event)=>{onSubmit(each)
          toggleDrawer("right", false, event)}}><img src={each.logo} alt='' width='40px'/><div className={`text-left w-full text-slate-100`}>{each.label}</div></div>
        })}
        </div>
      </Drawer>
    
      <h1 className="text-white text-3xl font-semibold">
              Expense Tracker
            </h1>
      </div>
       {/* <div className=""><img src={LogoBig} width='200px' className="" onClick={toggleSidebar}/></div> */}
      <div className={`sidebar ${isOpen ? "open" : ""} md:block md:w-50 fixed`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
      >
        <div className="flex w-22">
        <h1 className="text-white text-xl font-semibold pt-4">
              Expense Tracker
            </h1>
        </div>

         {sidebarmenu?.map((each)=>{
          return <div className={`flex items-center gap-2 p-2 mt-2 cursor-pointer ${each.navigate !== window.location.pathname ? "opacity-50" : "opacity-100"} hover:opacity-100  ${each.label}`} onClick={()=>{onSubmit(each)}} 
         
          ><img src={each.logo} alt='' width={each.width}/><div className={`text-center w-full text-slate-100 ${isOpen ? "" : "hidden"} md:text-left`}>{each.label}</div></div>
        })}
      </div>
    </div>
  );
};

export default SideBar;
