import React from 'react'
import { Link } from 'react-router-dom'

import './InforBar.css'

function InforBar({ room }) {
  return (
    <div className='inforbar'>
      <div className='inforbar-left'>
        <i class="fa fa-circle text-success" aria-hidden="true"></i>&nbsp;
        <h3>{room}</h3>
      </div>
      <div className='inforbar-right'>
        <a href='/join'><i class="fa fa-window-close text-dark" aria-hidden="true"></i></a>
      </div>
    </div>
  )
}

export default InforBar 