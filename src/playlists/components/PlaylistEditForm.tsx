import React, { useState } from 'react'
import { Playlist } from '../../model/Playlist'

interface Props {
    playlist: Playlist
    onCancel: () => void
    onSave: (draft: Playlist) => void
}

export const PlaylistEditForm = ({ playlist, onCancel, onSave }: Props) => {
    const [playlistId] = useState(playlist.id)
    const [name, setName] = useState(playlist.name)
    const [isPublic, setIsPublic] = useState(playlist.public)
    const [description, setDescription] = useState(playlist.description)

    const updatePlaylist = () => {
        onSave({
            id: playlistId,
            name: name,
            public: isPublic,
            description: description
        })
    }

    return (
        <div id="playlist-edit-form">
            <h3>PlaylistEditForm</h3>

            <div className="form-group">
                <label>Name:</label>
                <input type="text" className="form-control" value={name}
                    onChange={event => setName(event.target.value)} />
                <p>{name.length} / 170</p>
            </div>

            <div className="form-check">
                <label><input type="checkbox" className="form-check-input" checked={isPublic}
                    onChange={event => setIsPublic(event.target.checked)} /> Public </label>
            </div>

            <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" value={description} onChange={e => setDescription(e.target.value)} ></textarea>
            </div>
            <div className="d-flex justify-content-between">
                <button
                    className="btn btn-danger"
                    onClick={onCancel}
                >
                    Cancel
                </button>
                <button
                    className="btn btn-success"
                    onClick={updatePlaylist}
                >
                    Save
                </button>
            </div>
        </div>
    )
}

