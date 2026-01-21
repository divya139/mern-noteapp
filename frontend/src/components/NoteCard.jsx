import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import { formatDate } from '../lib/util'
import api from '../lib/axios.js'
import toast from 'react-hot-toast'   

const NoteCard = ({note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault()
    e.stopPropagation()

    if (!window.confirm('Are you sure you want to delete this note?')) return

    try {
      await api.delete(`/notes/${note._id}`)
      toast.success('Note deleted successfully!')
     // if (onDelete) onDelete(note._id)
      setNotes((prev) => prev.filter((note) => note._id !== id)); // get rid of the deleted one
    } catch (error) {
      console.error('Error deleting note:', error)
      toast.error(error.response?.data?.message || 'Failed to delete note')
    }
  }
  return (
    <Link to={`/note/${note._id}`} className="card bg-base-200 shadow-md hover:shadow-xl transition-shadow duration-300 border-t-4 border-solid border-[#00FF9D] ease-in-out">
      <div>
        <div className="card-body">
          <h3 className="card-title text-lg font-bold">{note.title || 'Untitled'}</h3>
          <p className="text-base-content/80">{note.content ? note.content.substring(0, 100) + (note.content.length > 100 ? '...' : '') : 'No content'}</p>
          <div className="card-actions justify-between mt-4 items-center">
            <span className="text-sm text-base-content/60">{formatDate(new Date(note.createdAt))}</span>
            <div className="flex items-center gap-1">
                <PenSquareIcon className="size-4" />
                <button className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e, note._id)}>
                    <Trash2Icon className="size-4" />
                </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default NoteCard
