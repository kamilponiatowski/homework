import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { fetchAlbumById } from '../../core/hooks/usePlaylists'
import { trackAddToPlaylist } from '../../core/reducers/actions'
import { playlistsSelect, selectPlaylists, selectSelectedPlaylist } from '../../core/reducers/PlaylistsReducer'
import { fetchAlbumFailed, fetchAlbumStart, fetchAlbumSuccess, selectAlbum, selectAlbumFetchState } from '../../core/reducers/SearchReducer'
import { Playlist } from '../../model/Playlist'
import { SimpleTrack } from '../../model/Search'
import SelectPlaylist from '../../playlists/components/SelectPlaylist'
import { AlbumCard } from '../components/AlbumCard'

interface Props {

}

export const AlbumDetails = (props: Props) => {
    // album_id: 5Tby0U5VndHW0SomYO7Id7

    const dispatch = useDispatch()
    const { isLoading, message } = useSelector(selectAlbumFetchState)

    const allPlaylists = useSelector(selectPlaylists)
    const selectedPlaylist = useSelector(selectSelectedPlaylist)
    const album = useSelector(selectAlbum)
    const { album_id } = useParams<{ album_id: string }>()

    const selectPlaylist = useCallback((id: Playlist['id']) => { dispatch(playlistsSelect(id)) }, [])

    const addToPlaylist = useCallback((track: SimpleTrack) => {
        if (!selectedPlaylist) { return }
        dispatch(trackAddToPlaylist(track, selectedPlaylist?.id))
    }, [selectedPlaylist?.id])

    useEffect(() => {

        dispatch(fetchAlbumStart(album_id))

        fetchAlbumById(album_id)
            .then(data => { dispatch(fetchAlbumSuccess(data)) })
            .catch(error => { dispatch(fetchAlbumFailed(error)) })
    }, [album_id])

    if (isLoading) { return <Loading /> }

    if (message) {
        return <p className="alert alert-danger">{message}</p>
    }
    if (!album) { return <></> }

    return (
        <div>
            <div className="row">
                <div className="col">
                    <small className="text-muted">{album_id}</small>
                    <h1>{album.name}</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <AlbumCard album={album} />
                </div>
                <div className="col">

                    <dl>
                        <dt>Album name:</dt>
                        <dd>{album.name}</dd>

                        <dt>Artist:</dt>
                        <dd>{album.artists[0]?.name}</dd>
                    </dl>

                    {/*
                        TODO:
                            - search results - clicking PhilCollins redirects here with ID
                            - show list of playlists below
                            - dispatch select playlist 
                            - show tracks
                            - on button click add track to selected playlist
                    */}

                    <SelectPlaylist playlists={allPlaylists} onSelect={selectPlaylist} />

                    <h3>Tracks</h3>
                    <div className="list-group">

                        {album.tracks.items.map(track =>
                            <div className="list-group-item">
                                {track.name} <button className="btn btn-light float-right"
                                    onClick={() => addToPlaylist(track)}>+</button>
                            </div>
                        )}
                    </div>


                </div>
            </div>
        </div>
    )
}

export const Loading = () => <div className="d-flex justify-content-center">
    <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
    </div>
</div>