import React from 'react'
import { Playlist } from '../../model/Playlist'
import styles from './PlaylistList.module.css'

interface Props {
    playlists: Playlist[]
    selectedId?: string
    onSelected(id: string): void
    onSwitch(value: 'details'): void
}

export const PlaylistList = ({ playlists, selectedId, onSelected, onSwitch }: Props) => {

    return (
        <div>
            <div className="list-group">
                {playlists.map((playlist, index) =>
                    <div
                        key={playlist.id}
                        className={`list-group-item ${styles.cursorPointer} ${selectedId === playlist.id ? 'active' : ''}`}
                        onClick={() => {
                            onSelected(playlist.id);
                            onSwitch('details');
                        }}
                    >
                        {playlist.name}
                    </div>
                )}
            </div>
        </div>
    )
}
