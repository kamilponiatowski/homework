import React from 'react'
import { Playlist } from '../../model/Playlist'
import styles from './PlaylistDetails.module.css'

interface Props {
    playlist: Playlist
    onEdit: () => void
}

export const PlaylistDetails: React.FC<Props> = ({ playlist, onEdit }: Props) => {
    return (
        <div>
            <dl data-playlist-id={playlist.id}>
                <dt>Name:</dt>

                <dd>{playlist.name}</dd>

                <dt>Public:</dt>
                <dd className={playlist.public ? styles.playlistPublic : styles.playlistPrivate}>
                    {playlist.public ? 'Yes' : 'No'}
                </dd>

                <dt>Description:</dt>
                <dd>{playlist.description}</dd>
            </dl>

            <button
                className="btn btn-danger"
                onClick={onEdit}
            >
                Edit
            </button>
        </div>
    )
}

