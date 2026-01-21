import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import { formatDate } from '../lib/util'   

const NoteCard = ({note}) => {
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
                <button className="btn btn-ghost btn-xs text-error">
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
