import React, { useState, useEffect } from 'react';
import Signup from './Signup'
import { Container } from 'react-bootstrap'
import { AuthProvider } from '../contexts/AuthContext'
import Dashboard from './Dashboard'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import Session from './Session'
import Result from './Result'
import SessionDetail from './SessionDetail';
import axios from 'axios';
import ForgotPassword from "./ForgotPassword";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {

  const [data, setData] = useState([]);


  useEffect(async () => {
    const result = await axios.get('https://613437ae7859e700176a3813.mockapi.io/go');
    setData(result.data)
  }, [])



  return (

    <Container className='d-flex
    justify-content-center' style={{ height: '100vh' }}>
      <div className="w-100" style={{ maxWidth: '800px' }}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path='/' component={Dashboard} />
              <Route path='/signup' component={Signup} />
              <Route path='/login' component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route exact path='/session/create/1' component={Session} />
              <Route exact path='/session/create/2' component={Result} />
              <Route
                path='/sessions/detail/:id'
                render={(props) => (
                  <SessionDetail {...props} session={data} />
                )}
              />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
