import React from 'react'
import { Playlist } from '../../model/Playlist'
import styles from './PlaylistDetails.module.css'

interface Props {
    playlist: Playlist;
    edit: () => void
}


export const PlaylistDetails: React.FC<Props> = ({
    playlist,
    edit
}) => {

    return (
        <section aria-label="details for the selected playlist" data-testid="playlist-details">
            <dl data-playlist-id={playlist.id}>
                <dt>Name:</dt>

                <dd aria-label="Playlist Name"
                    data-testid="playlist_name">{playlist.name}</dd>

                <dt>Public:</dt>
                <dd data-testid="playlist_ispublic" className={playlist.public ? styles.playlistPublic : styles.playlistPrivate}>
                    {playlist.public ? 'Yes' : 'No'}
                </dd>

                <dt>Description:</dt>
                <dd data-testid="playlist_description">{playlist.description}</dd>
            </dl>

            <button className="btn btn-danger" onClick={edit}>Edit</button>
        </section>
    )
}/* , (prevProps, nextProps) => prevProps.playlist === nextProps.playlist */