import styles from '../containers/PlaylistsView.module.css'
import React, { SyntheticEvent } from 'react'
import { Playlist } from '../../model/Playlist'

interface Props {
    playlists: Playlist[]
    selectedId?: string
    onSelected(id: string): void
    onDeletePlaylist(playlistId: Number): void
}

export const PlaylistList = ({ playlists, selectedId, onSelected, onDeletePlaylist }: Props) => {

    const deletePlaylist = (event: SyntheticEvent, playlistId: Number) => {
        event.stopPropagation();
        onDeletePlaylist(playlistId);
    }

    return (
        <div>
            <div className="list-group">
                {playlists.map((playlist, index) =>
                    <div className={`list-group-item ${selectedId === playlist.id ? 'active' : ''}`}
                        onClick={() => onSelected(playlist.id)}
                        key={playlist.id}>
                        {playlist.name}

                        <span
                            className={`close cursor-pointer ${styles.cursorPointer}`}
                            onClick={(event) => deletePlaylist(event, +playlist.id)}
                        >
                            &times;
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}
