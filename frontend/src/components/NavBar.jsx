
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { constantStrings } from '../lib/strings.js';
import { SearchIcon, Plus, XIcon } from 'lucide-react';

const NavBar = ({ searchTerm, onSearch }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const strings = constantStrings();

  return (
    <header className="navbar bg-base-300 px-4 lg:px-8">
      {/* Mobile menu button */}
      <div className="navbar-start lg:hidden">
        <button
          className="btn btn-ghost btn-square"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <XIcon className="size-5" /> : <Plus className="size-5" onClick={() => {
                navigate('/create');
                setIsMenuOpen(false);
              }}/>}
        </button>
      </div>

      {/* Logo/Title or Mobile Search */}
      <div className="navbar-center lg:navbar-start">
        {isSearchOpen ? (
          <div className="form-control w-full max-w-xs">
            <input
              type="text"
              placeholder={strings.SEARCH_PLACEHOLDER}
              className="input input-bordered input-sm"
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              autoFocus
            />
          </div>
        ) : (
          <a className="btn btn-ghost normal-case text-lg lg:text-xl">{strings.APP_TITLE}</a>
        )}
      </div>

      {/* Desktop search */}
      <div className="navbar-center hidden lg:flex">
        <div className="form-control">
          <input
            type="text"
            placeholder={strings.SEARCH_PLACEHOLDER}
            className="input input-bordered w-64 xl:w-80"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Desktop actions */}
      <div className="navbar-end hidden lg:flex gap-2">
        <button className="btn btn-primary" onClick={() => navigate('/create')}>
          <span className="text-lg font-medium">+</span> {strings.CREATE_NOTE_BUTTON}
        </button>
      </div>

      {/* Mobile search button */}
      <div className="navbar-end lg:hidden">
        <button
          className="btn btn-ghost btn-square"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          {isSearchOpen ? <XIcon className="size-5" /> : <SearchIcon className="size-5" />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {/* {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-base-300 border-t border-base-content/10 lg:hidden z-50">
          <div className="p-4">
            <button
              className="btn btn-primary w-full"
              onClick={() => {
                navigate('/create');
                setIsMenuOpen(false);
              }}
            >
              <span className="text-lg font-medium">+</span> {strings.CREATE_NOTE_BUTTON}
            </button>
          </div>
        </div>
      )} */}

    </header>
  )
}

export default NavBar
