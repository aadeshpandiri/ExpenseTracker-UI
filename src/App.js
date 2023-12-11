
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppLayout from './layout/AppLayout'
import Registration from './registration/registration';
import SharedState from './context/sharedState';

function App() {
  const tokenData = sessionStorage.getItem("access_token"); 

  return (
    <Router>

    {
      tokenData ?  <SharedState> <AppLayout /></SharedState> : <Registration />
    }
    {/* <AppLayout /> */}
  </Router>

  );
}

export default App;
