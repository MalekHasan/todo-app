import React from 'react'
import  './header.scss'

import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <nav className="primaryColor">
    <Link className='nav-link' to='/'  href="#">
      Home
    </Link>
    <Link className='nav-link' to='/settings' >
      Settings
    </Link>
  </nav>
  )
}
