import React, { createContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import LocatianDetails from './Components/LocationDetails/LocatianDetails';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Login from './Components/Authentication/Login';
import Booking from './Components/Booking/Booking';
import Slider from './Components/Slider/Slider';

export const UserContext = createContext();

function App() {
  const [loggedinUser, setLoggedinUser] = useState({});
  return (
    <UserContext.Provider value={[loggedinUser, setLoggedinUser]}>
      <Router>
        <Switch>

        <Route exact path="/home">
          <Header></Header>
          <Home/>
          <Slider></Slider>
        </Route>
        <Route exact path="/">
          <Header></Header>
          <Home/>
          <Slider></Slider>
        </Route>

          <PrivateRoute path="/location/:hotelinfo">
            <Header></Header>
            <LocatianDetails></LocatianDetails>
          </PrivateRoute>

          <Route path="/login">
            <Login></Login>
          </Route>

          <Route path="/booking/:locationId">
            <Header></Header>
            <Home/>
            <Booking></Booking>
          </Route>
          
          <Route path="*">
            {/* not found page */}
          </Route>
          
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
