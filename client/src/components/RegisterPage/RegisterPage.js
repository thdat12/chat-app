import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { registerUser } from '../../actions/userActions'

function Register(props) {
  const dispatch = useDispatch()
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const onChangeHandler = (event) => {
    setValues({ ...values, [event.currentTarget.name]: event.currentTarget.value })
  }
  const token = useSelector(state => state.user.token)
  if (token) {
    props.history.push('/join')
  }
  const onSubmitHandler = (event) => {
    event.preventDefault()
    dispatch(registerUser(values))
      .then(res => {
        console.log(res.payload)
        if (res.payload.success) {
          props.history.push('/join')
        } else {
          alert('Register Failed')
        }
      }
      )
  }

  const registerForm = () => (
    <form className='p-5 h-100' onSubmit={onSubmitHandler}>
      <div className="card border-primary rounded-0">
        <div className="card-header p-0">
          <div className="bg-info text-white text-center py-2">
            <h3><i className='fa fa-user-circle'></i> Sing Up</h3>
          </div>
        </div>
        <div className="card-body p-3">
          <div className='form-group'>
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text"><i className="fa fa-user text-info"></i></div>
              </div>
              <input type='text' className='form-control' placeholder='Type your first name' name='firstName' onChange={onChangeHandler} />
            </div>
          </div>
          <div className='form-group'>
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text"><i className="fa fa-user text-info"></i></div>
              </div>
              <input type='text' className='form-control' placeholder='Type your last name' name='lastName' onChange={onChangeHandler} />
            </div>
          </div>
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
          <div className='form-group'>
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text"><i className="fa fa-key text-info"></i></div>
              </div>
              <input type='password' className='form-control' placeholder='Type your confrim password' name='confirmPassword' onChange={onChangeHandler} />
            </div>
          </div>
          <div className='form-group'>
            <button className='btn btn-outline-info float-right'>Sign Up</button>
          </div>
        </div>
      </div>
    </form>
  )
  return (
    <div className='col-md-6 offset-md-3'>
      {registerForm()}
    </div>
  )
}

export default Register
