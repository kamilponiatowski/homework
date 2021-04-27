import React, { useState } from 'react'
import { Playlist } from '../../model/Playlist'

interface Props {
    playlists: Playlist[]
    selectedId?: string
    onSelected(id: string): void
    onRemove(id: Playlist['id']): void
}

export const PlaylistList = React.memo(({
    playlists, selectedId, onSelected, onRemove
}: Props) => {

    return (
        <section>
            <ul className="list-group" aria-label="list of your current playlists">
                {playlists.map((playlist, index) =>
                    <li className={`list-group-item ${selectedId === playlist.id ? 'active' : ''}`}
                        aria-label="playlist item"
                        data-playlist-id={playlist.id}
                        onClick={() => { onSelected(playlist.id) }}
                        key={playlist.id}>

                        <span aria-label="playlist name">{playlist.name}</span>

                        <button aria-label="delete the playlist" className="btn btn-light close" onClick={(event) => {
                            event.stopPropagation()
                            onRemove(playlist.id)
                        }}>&times;</button>
                    </li>
                )}
            </ul>
        </section >
    )
})