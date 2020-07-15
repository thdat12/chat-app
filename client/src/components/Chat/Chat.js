import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import InforBar from './ChatComponents/InforBar'
import Input from './ChatComponents/Input'
import Messages from './ChatComponents/Messages'

import './Chat.css'

let socket

function Chat({ location }) {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const token = useSelector(state => state.user.token)
  useEffect(() => {
    const { name, room } = queryString.parse(location.search)

    socket = io(process.env.REACT_APP_ENDPOINT)

    setName(name)
    setRoom(room)

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    }); return () => {
      socket.emit('disconnect')
      socket.off()
    }
  }, [ENDPOINT, location.search])

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message])
    })
  }, [messages])


  const sendMessage = event => {
    event.preventDefault()
    if (message) {
      socket.emit('sendMessage', message)
      setMessage('')
    }
  }
  return (
    <React.Fragment>
      {token ? (
        <div className='chat-container'>
          <div className='chat-container-inner'>
            <InforBar room={room} />
            <Messages messages={messages} name={name} />
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
          </div>
        </div>
      ) : (<h3 className='container pt-5 pb-5'>
        <Link to='/login' className='container pt-5 pb-5'>Login To Chat</Link>
      </h3>
        )
      }
    </React.Fragment>
  )
}

export default Chat
