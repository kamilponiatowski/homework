import React, { useCallback, useEffect, useState } from 'react'
import { Playlist } from '../../model/Playlist'
import { PlaylistDetails } from '../components/PlaylistDetails'
import { PlaylistList } from '../components/PlaylistList'

interface Props {
    playlistsData: Playlist[]
}

export const PlaylistsTDD = ({ playlistsData }: Props) => {
    const [selectedId, setSelectedId] = useState<string | undefined>()
    const [playlists, setPlaylists] = useState<Playlist[]>(playlistsData)
    const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | undefined>()
    const [mode, setMode] = useState<'details' | 'form' | 'create'>('details')

    useEffect(() => {
        setSelectedPlaylist(playlists.find(p => p.id === selectedId))
    }, [selectedId, playlists])

    const removePlaylist = useCallback((id: Playlist['id']) => {
        setPlaylists(playlists.filter(p => p.id !== id))
    }, [playlists])

    const changeSelectedPlaylist = useCallback((id: Playlist['id']): void => {
        setSelectedId(selectedId => selectedId === id ? undefined : id);
        setMode('details');
    }, [])

    const edit = useCallback(() => setMode('form'), [])

    return (
        <div>
            PlaylistsTDD
            <div className="row">
                {
                    playlistsData.length &&
                    <div className="col">
                        <PlaylistList
                            onSelected={changeSelectedPlaylist}
                            onRemove={removePlaylist}
                            playlists={playlists}
                            selectedId={selectedPlaylist?.id}
                        />
                    </div>
                }
                {
                    selectedPlaylist && mode === 'details' &&
                    <div className="row">
                        <PlaylistDetails
                            edit={edit}
                            playlist={selectedPlaylist}
                        />
                    </div>
                }
            </div>

        </div>
    )
}
