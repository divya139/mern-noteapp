import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import api from '../lib/axios.js'
import { constantStrings } from '../lib/strings.js'

const CreatePage = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const strings = constantStrings()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      toast.error(strings.FILL_FIELDS)
      return
    }

    setLoading(true)
    try {
      const response = await api.post('/notes', {
        title: title.trim(),
        content: content.trim()
      })

      toast.success(strings.NOTE_CREATED)
      navigate('/')
    } catch (error) {
      console.error('Error creating note:', error)
      if (error.response.status === 429) {
        toast.error(strings.TOO_MANY_REQUESTS, {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error(strings.FAILED_CREATE);
      }
     // toast.error(error.response?.data?.message || 'Failed to create note')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">{strings.CREATE_PAGE_TITLE}</h1>

        <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">{strings.TITLE_LABEL}</span>
              </label>
              <input
                type="text"
                placeholder={strings.TITLE_PLACEHOLDER}
                className="input input-bordered"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">{strings.CONTENT_LABEL}</span>
              </label>
              <textarea
                placeholder={strings.CONTENT_PLACEHOLDER}
                className="textarea textarea-bordered h-32"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            <div className="card-actions justify-end">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => navigate('/')}
              >
                {strings.CANCEL_BUTTON}
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? strings.CREATING : strings.CREATE_NOTE_BUTTON}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePage
