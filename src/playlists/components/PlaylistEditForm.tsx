import React, { useEffect, useState } from 'react'
import { Playlist } from '../../model/Playlist'

interface Props {
    playlist: Playlist
    onCancel(value: 'details' | 'form'): void
    onSave(draft: Playlist): void
}

export const PlaylistEditForm = ({ playlist, onCancel, onSave }: Props) => {
    const [message, setMessage] = useState('')
    const [acceptNew, setAcceptNew] = useState(false)

    const [playlistId, setPlaylistId] = useState(playlist.id)
    const [name, setName] = useState(playlist.name)
    const [isPublic, setIsPublic] = useState(playlist.public)
    const [description, setDescription] = useState(playlist.description)

    const updatePlaylist = () => {
        const data = {
            id: playlistId,
            name,
            public: isPublic,
            description,
        }

        onSave(data);
    }

    useEffect(() => {
        if (playlistId !== playlist.id) {
            if (acceptNew) {
                setName(playlist.name)
                setPlaylistId(playlist.id)
                setIsPublic(playlist.public)
                setDescription(playlist.description)
                setAcceptNew(false)
                setMessage('')
            } else {
                setMessage('Unsaved Changes')
            }
        }
    }, [playlist, acceptNew, playlistId])

    return (
        <div>
            <h3>PlaylistEditForm</h3>

            {message && <div className="alert alert-danger">{message} <button onClick={() => setAcceptNew(true)}>OK</button></div>}

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
                    onClick={() => { onCancel('details') }}
                >
                    Cancel
            </button>
                <button
                    className="btn btn-success"
                    onClick={() => updatePlaylist()}
                >
                    Save
            </button>
            </div>
        </div>
    )
}


// const NameField = () => {
//     const [name, setName] = useState(playlist.name)
//     return <div className="form-group" >
//         <label>Name:</label>
//         <input type="text" className="form-control" value={name} onChange={event => { setName(event.target.value) }} />
//         <p>{name.length} / 170</p>
//     </div>
// }
