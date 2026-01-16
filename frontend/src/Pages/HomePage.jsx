import React, { useEffect } from 'react'
import NavBar from '../components/NavBar.jsx'
import RateLimitedUI from '../components/RateLimitedUI.jsx';
import { useState } from 'react';
import axios from 'axios';

const HomePage = () => {
    const[isRateLimited, setIsRateLimited] = useState(false);
     const[notes, setNotes] = useState([]);
     const[loading, setLoading] = useState(false);

     useEffect(() => {
       const fetchNotes = async () => {
         setLoading(true);
         try {
           const response = await axios.get('http://localhost:3000/api/notes');
           if (response.ok) {
             const data = await response.json();
             console.log(data);
             setNotes(data);
           } else {
             console.error('Failed to fetch notes');
           }
         } catch (error) {
           console.error('Error fetching notes:', error);
         } finally {
           setLoading(false);
         }
       };

       fetchNotes();
     }, []);

  return (
    <div className='min-h-screen'>
      <NavBar/>
      {isRateLimited && <RateLimitedUI/>}
    </div>
  )
}

export default HomePage
