import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import {auth} from './actions/userActions'

import AuthRoute from './AuthRoute'
import Navbar from './components/Navbar/Navbar'
import HomePage from './components/HomePage/HomePage'
import RegisterPage from './components/RegisterPage/RegisterPage'
import LoginPage from './components/LoginPage/LoginPage'
import Join from './components/Join/Join'
import Chat from './components/Chat/Chat'

import './App.css'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(auth())
  }, [])
  return (
    <Router>
      <div className="App">
        <Suspense fallback={(<div>Loading....</div>)}>
          <Navbar />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <AuthRoute exact path='/join' component={Join} />
            <AuthRoute exact path='/chat' component={Chat} />
            <Route path='/register' component={RegisterPage} />
            <Route path='/login' component={LoginPage} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}

export default App
