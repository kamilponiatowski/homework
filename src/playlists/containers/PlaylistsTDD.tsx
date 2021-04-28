import React, { useEffect, useState } from 'react'
import { fetchPlaylists } from '../../core/hooks/usePlaylists'
import { Playlist } from '../../model/Playlist'
import { PlaylistList } from '../components/PlaylistList'

interface Props {

}

export const PlaylistsTDD = (props: Props) => {
    const [playlists, setPlaylists] = useState<Playlist[]>([])
    console.log('render', playlists)
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
                onSelected={() => { }}
            />

        </div>
    )
}
