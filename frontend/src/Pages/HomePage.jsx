import React, { useEffect } from 'react'
import NavBar from '../components/NavBar.jsx'
import RateLimitedUI from '../components/RateLimitedUI.jsx';
import { useState } from 'react';
import api from '../lib/axios.js';
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard.jsx';
import { constantStrings } from '../lib/strings.js';
import NotesNotFound from '../components/NotesNotFound.jsx';

const HomePage = () => {
    const[isRateLimited, setIsRateLimited] = useState(false);
     const[notes, setNotes] = useState([]);
     const[loading, setLoading] = useState(false);
     const[searchTerm, setSearchTerm] = useState('');
     const strings = constantStrings();

     const filteredNotes = notes.filter(note =>
       note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       note.content.toLowerCase().includes(searchTerm.toLowerCase())
     );

     useEffect(() => {
       const fetchNotes = async () => {
         setLoading(true);
         try {
           const response = await api.get('/notes');
           if (response.status === 200) {
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
                toast.error(strings.ERROR_FETCHING);
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
      <NavBar searchTerm={searchTerm} onSearch={setSearchTerm}/>
      {isRateLimited && <RateLimitedUI/>}

      <div className=' max-w-7xl mx-auto p-4 mt-6'>
        {loading &&  !isRateLimited && <p className='text-center text-primary py-10'>{strings.LOADING_NOTES}</p>}
        {filteredNotes.length === 0 && !loading && !isRateLimited && searchTerm && <p className='text-center text-primary py-10'>{strings.NO_MATCHING_NOTES_MESSAGE}</p>}
        {filteredNotes.length === 0 && !loading && !isRateLimited && !searchTerm && <p className='text-center text-primary py-10'><NotesNotFound/></p>    }
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
             {filteredNotes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>   
        </div>
    </div>
  )
}

export default HomePage
