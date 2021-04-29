import React, { useCallback, useEffect, useState } from 'react'
import { fetchPlaylist, fetchPlaylists } from '../../core/hooks/usePlaylists'
import { Playlist } from '../../model/Playlist'
import { PlaylistDetails } from '../components/PlaylistDetails'
import { PlaylistList } from '../components/PlaylistList'

interface Props {

}

export const PlaylistsTDD = (props: Props) => {
    const [playlists, setPlaylists] = useState<Playlist[]>([])
    const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist>()
    const [mode, setMode] = useState<string>()
    const [selectedId, setSelectedId] = useState<string | number | undefined>()


    // const edit = useCallback(() => setMode('form'), [])
    const changeSelectedPlaylist = useCallback((id: Playlist['id']): void => {
        setSelectedId(id)
        // setSelectedId(selectedId => selectedId === id ? undefined : id)
    }, [])

    useEffect(() => {
        if (!selectedId) return
        setMode('details');
        fetchPlaylist(selectedId).then(playlist => {
            setSelectedPlaylist(playlist)
        });
    }, [selectedId, playlists])

    useEffect(() => {
        fetchPlaylists().then(items => {
            setPlaylists(items)
        })
    }, [])

    return (
        <div>

            <PlaylistList
                playlists={playlists}
                onRemove={() => { }}
                onSelected={changeSelectedPlaylist}
            />

            {
                selectedPlaylist && mode === 'details' &&
                <PlaylistDetails
                    edit={() => { }}
                    playlist={selectedPlaylist}
                />
            }

        </div>
    )
}
