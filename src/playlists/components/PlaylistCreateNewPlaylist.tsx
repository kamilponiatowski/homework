import React, { useState } from 'react'
import { validateForm } from '../../helpers/validateForm'
import { Playlist } from '../../model/Playlist'

interface Props {
    onCancel: () => void
    onAddPlaylist: (newPlaylist: Playlist) => void
}

export const PlaylistCreateNewPlaylist = ({ onCancel, onAddPlaylist }: Props) => {
    const [playlistId] = useState<string>(~~(Math.random() * 1000000) + '')
    const [name, setName] = useState<string>('')
    const [isPublic, setIsPublic] = useState<boolean>(false)
    const [description, setDescription] = useState<string>('')

    const addNewPlaylist = () => {
        if (!playlistId || !name || !description) {
            // alert('Uzupełnij wszystkie pola by dodać playlistę');
            validateForm();
            return;
        }
        const newPlaylist = {
            id: playlistId,
            name,
            public: isPublic,
            description,
        }
        onAddPlaylist(newPlaylist);
    }

    return (
        <div id="playlist-create-new-playlist">
            <h3>Create New Playlist</h3>

            <div className="form-group">
                <label>Name:</label>
                <input type="text" className="form-control" value={name} data-to-validate="4"
                    onChange={event => setName(event.target.value)} />
                <p>{name.length} / 170</p>
            </div>

            <div className="form-check">
                <label><input type="checkbox" className="form-check-input" checked={isPublic}
                    onChange={event => setIsPublic(event.target.checked)} /> Public </label>
            </div>

            <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" value={description} data-to-validate="10" onChange={e => setDescription(e.target.value)} ></textarea>
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
                    onClick={addNewPlaylist}
                >
                    Add
                </button>
            </div>
        </div>
    )
}

