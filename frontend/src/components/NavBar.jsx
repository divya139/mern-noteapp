
import React from 'react'
import { useNavigate } from 'react-router'
import { constantStrings } from '../lib/strings.js';

const NavBar = ({ searchTerm, onSearch }) => {
  const navigate = useNavigate();

  return (
    <header className="navbar bg-base-300 px-8">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">{constantStrings().APP_TITLE}</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder={constantStrings().SEARCH_PLACEHOLDER}
            className="input input-bordered"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/create')}>
          <span className="text-lg font-medium">+</span> {constantStrings().CREATE_NOTE_BUTTON}
        </button>
      </div>
    </header>
  )
}

export default NavBar
