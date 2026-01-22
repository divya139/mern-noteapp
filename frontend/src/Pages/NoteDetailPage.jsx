import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import api from '../lib/axios.js'
import toast from 'react-hot-toast'
import { formatDate } from '../lib/util'
import { constantStrings } from '../lib/strings.js'
import { Trash2Icon } from 'lucide-react'

const NoteDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const strings = constantStrings()

  const handleDelete = async () => {
    if (!window.confirm(strings.CONFIRM_DELETE)) return

    try {
      await api.delete(`/notes/${id}`)
      toast.success(strings.NOTE_DELETED)
      navigate('/')
    } catch (error) {
      console.error('Error deleting note:', error)
      toast.error(error.response?.data?.message || strings.FAILED_DELETE)
    }
  }

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await api.get(`/notes/${id}`)
        setNote(response.data)
        setTitle(response.data.title)
        setContent(response.data.content)
      } catch (error) {
        console.error('Error fetching note:', error)
        toast.error('Failed to load note')
        navigate('/')
      } finally {
        setLoading(false)
      }
    }

    fetchNote()
  }, [id, navigate])

  const handleUpdate = async (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      toast.error(strings.FILL_FIELDS)
      return
    }

    setUpdating(true)
    try {
      const response = await api.put(`/notes/${id}`, {
        title: title.trim(),
        content: content.trim()
      })
      setNote(response.data.note)
      toast.success(strings.NOTE_UPDATED)
    } catch (error) {
      console.error('Error updating note:', error)
      toast.error(error.response?.data?.message || strings.FAILED_UPDATE)
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (!note) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Note not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">{strings.EDIT_NOTE_TITLE}</h1>
          <div className="flex items-center gap-2">
            <button
              className="btn btn-ghost"
              onClick={() => navigate('/')}
            >
              {strings.BACK_BUTTON}
            </button>
            <button
              className="btn btn-ghost btn-square text-error"
              onClick={handleDelete}
            >
              <Trash2Icon className="size-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">{strings.TITLE_LABEL}</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">{strings.CONTENT_LABEL}</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-48"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">{strings.CREATED_LABEL}</span>
              </label>
              <p className="text-base-content/60">
                {formatDate(new Date(note.createdAt))}
              </p>
            </div>

            <div className="card-actions justify-end">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={updating}
              >
                {updating ? strings.UPDATING : strings.UPDATE_NOTE_BUTTON}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NoteDetailPage
