import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

export default function FormDialog(props) {

const [email,setEmail] = React.useState()
const [emailValid, setEmailValid] = useState(props.open);

  return (
    <div >

      <Dialog open={props.open} onClose={props.handleClose}
      >
        <DialogTitle>Email</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Please enter your email address here. We will send link.
          </DialogContentText>
          <TextField
            margin="dense"
            id="name"
            label="Email Address"
            placeholder='Email Address'
            type="email"
            fullWidth
            variant="standard"
            onChange={(e)=> {
                setEmail(e.target.value)
                const value = e.target.value;
                if(!value) {
                  setEmailValid("email is required")
                 }
                 else  if(!new RegExp(/^[^\s@]+@[^\s@]+(\.[^ !."`'#%&,:;<>=@{}~\$\(\)\*\+_\/\\\?\[\]\^\|]{2,4})$/).test(value)) {
                  setEmailValid("enter a valid email")
                 }
                 else {
                  setEmailValid(true)
                 };
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button onClick={()=>{props.handleSave(email);setEmailValid(false)}} disabled={emailValid !== true ? true :false}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
