import React from 'react'
import HomePage from './Pages/HomePage'
import CreatePage from './Pages/CreatePage'
import { Routes, Route } from 'react-router';
import NoteDetailPage from './Pages/NoteDetailPage';
import toast from 'react-hot-toast';
//import styles from './Pages/index.css'

const App = () => {
  return (
    <div data-theme="forest">
      <Routes>
        <Route path="/" element = {<HomePage/>}/>
        <Route path="/create" element = {<CreatePage/>}/>
        <Route path="/note/:id" element = {<NoteDetailPage/>}/>
      </Routes>
    </div>
  )
}

export default App
