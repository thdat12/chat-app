import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { loginUser } from '../../actions/userActions'


function LoginPage(props) {
  const dispatch = useDispatch()
  const [values, setValues] = useState({
    email: '',
    password: ''
  })
  const onChangeHandler = (event) => {
    setValues({ ...values, [event.currentTarget.name]: event.currentTarget.value })
  }
  const token = useSelector(state => state.user.token)
  if(token){
    props.history.push('/join')
  }
  const onSubmitHandler = (event) => {
    event.preventDefault()
    dispatch(loginUser(values))
      .then(res => {
        if (res.payload.loginSuccess) {
          props.history.push('/join')
        } else {
          alert('Login Failed')
        }
      }
      )
  }

  return (
    <div className='col-md-6 offset-md-3' style={{ marginTop: '5rem' }}>
      <form className='h-100' onSubmit={onSubmitHandler}>
        <div className="card border-primary rounded-0">
          <div className="card-header p-0">
            <div className="bg-info text-white text-center py-2">
              <h3><i className='fa fa-user-circle'></i> Sing In</h3>
            </div>
          </div>
          <div className="card-body p-3">
            <div className='form-group'>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text"><i className="fa fa-envelope text-info"></i></div>
                </div>
                <input type='email' className='form-control' placeholder='Type your Email' name='email' onChange={onChangeHandler} />
              </div>
            </div>
            <div className='form-group'>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text"><i className="fa fa-key text-info"></i></div>
                </div>
                <input type='password' className='form-control' placeholder='Type your password' name='password' onChange={onChangeHandler} />
              </div>
            </div>
            <a href='/'>Forget your password? Find your password.</a>
            <div className='form-group'>
              <button className='btn btn-outline-info float-right'>Sign In</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
