import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { logOutUser } from '../../actions/userActions'

function Navbar() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.user.token)
  const onLogoutHandler = () => {
    dispatch(logOutUser())
  }
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-info">
        <Link to='/' className='navbar-brand text-light'><i class="fa fa-home" aria-hidden="true"></i>&nbsp; Home</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
          </ul>
          <div className="form-inline my-2 my-lg-0">
            {token ? (
              <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                  <Link to='/join' className='nav-link text-light'>Join Room</Link>
                </li>
                <li class="nav-item">
                  <button onClick={onLogoutHandler} className='btn btn-outline-light float-right'>Logout</button>
                </li>

              </ul>
            ) : (
                <ul class="navbar-nav mr-auto">
                  <li className='nav-item'>
                    <Link to='/login' className='btn btn-outline-light float-right' >Sign In</Link>
                  </li>
                  <li className='nav-item'>
                    <Link to='/register' className='btn btn-outline-light float-right'>Sign Up</Link>
                  </li>
                </ul>
              )}
          </div>
        </div>
      </nav>
    </React.Fragment>
  )
}

export default Navbar
