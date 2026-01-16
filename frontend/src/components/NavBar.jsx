
import React from 'react'
import { useNavigate } from 'react-router'

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <header className="navbar bg-base-300 px-8">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">ThinkBoard</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered" />
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/create')}>
          <span className="text-lg font-medium">+</span> Create Note
        </button>
      </div>
    </header>
  )
}

export default NavBar
