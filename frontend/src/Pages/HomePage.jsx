import React, { useEffect } from 'react'
import NavBar from '../components/NavBar.jsx'
import RateLimitedUI from '../components/RateLimitedUI.jsx';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard.jsx';

const HomePage = () => {
    const[isRateLimited, setIsRateLimited] = useState(false);
     const[notes, setNotes] = useState([]);
     const[loading, setLoading] = useState(false);

     useEffect(() => {
       const fetchNotes = async () => {
         setLoading(true);
         try {
           const response = await axios.get('http://localhost:3000/api/notes');
           if (response.statusText === 'OK') {
             const data = await response.data;
             console.log(data);
             setNotes(data);
             setIsRateLimited(false);
           } else {
             console.error('Failed to fetch notes');
           }
         } catch (error) {
            if(error.response && error.response.status === 429){
                setIsRateLimited(true);
            }else{
                toast.error("An error occurred while fetching notes.");
            }
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

      <div className=' max-w-7xl mx-auto p-4 mt-6'>
        {loading && <p className='text-center text-primary py-10'>Loading notes...</p>}
        {notes.length === 0 && !loading && <p className='text-center text-primary py-10'>No notes available. Create one!</p>    }
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
             {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>   
        </div>
    </div>
  )
}

export default HomePage
