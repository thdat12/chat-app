import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './Join.css'

function Join() {
  const [room, setRoom] = useState('')
  const user = useSelector(state => state.user)
  const token = useSelector(state => state.user.token)
  return (
    <React.Fragment>
      {token ? (
        <div className='join-container'>
          <div className='join-container-inner'>
            <h1 className='join-header'>CHOOSE ROOM</h1>
            <div>
              <input type="text" placeholder="" className="join-input" onChange={event => setRoom(event.target.value)} />
            </div>
            <Link onClick={event => (!user || !room) ? event.preventDefault() : null}
              to={`/chat?name=${(user && user.userData) && (user.userData.firstName + ' ' + user.userData.lastName)}&room=${room}`}>
              <button className="join-btn" type='submit'>Join Room</button>
            </Link>
          </div>
        </div>
      ) : (
        <h3 className='container pt-5 pb-5'>
          <Link to='/login'>Login To Join Room</Link>
        </h3>
        )
      }
    </React.Fragment>
  )
}

export default Join
