import React from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'

function HomePage() {
  const token = useSelector(state => state.user.token)
  return (
    <h1 className='container pt-5 pb-5 text-info text-center'>
      Welcom to Chat App. {token ? <Link to='/login'>Join room now.</Link> :<Link to='/login'>Login to continue.</Link>}
    </h1>
  )
}

export default HomePage
