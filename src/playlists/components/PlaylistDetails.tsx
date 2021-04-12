import React from 'react'
import { Playlist } from '../../model/Playlist'
import styles from './PlaylistDetails.module.css'

interface Props {
    playlist: Playlist,
    onEdit(value: 'details' | 'form'): void
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
                className="btn btn-primary"
                onClick={() => onEdit('form')}
            >
                Edit
            </button>
        </div>
    )
}

// PlaylistDetails.defaultProps = {
//     playlist: {
//         id: '',
//         name: 'Default',
//         public: false,
//         description: ''
//     }
// }


    // if (!playlist) {
    //     return <div>
    //         <p className="alert alert-info">Please select playlist </p>
    //     </div>
    // }
