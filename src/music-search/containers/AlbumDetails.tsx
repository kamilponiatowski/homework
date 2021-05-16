import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { fetchAlbumById } from '../../core/hooks/usePlaylists'
import { fetchAlbumFailed, fetchAlbumStart, fetchAlbumSuccess, selectAlbum, selectAlbumFetchState } from '../../core/reducers/SearchReducer'
import { selectPlaylists, tracksPlaylistsSelect } from '../../core/reducers/TracksReducer'
import SelectPlaylist from '../../playlists/components/SelectPlaylist'
import { AlbumCard } from '../components'
import AlbumTracks from '../components/AlbumTracks'

interface Props {

}

export const AlbumDetails = (props: Props) => {
    const dispatch = useDispatch()
    const playlists = useSelector(selectPlaylists)
    const selectPlaylistById = useCallback((id: string) => { dispatch(tracksPlaylistsSelect(id)) }, [])

    const { isLoading, message } = useSelector(selectAlbumFetchState)
    const album = useSelector(selectAlbum)
    const { album_id } = useParams<{ album_id: string }>()
    const [album2, setAlbum2] = useState<any>()

    useEffect(() => {

        dispatch(fetchAlbumStart(album_id))

        fetchAlbumById(album_id)
            .then(data => { dispatch(fetchAlbumSuccess(data)); setAlbum2(data) })
            .catch(error => { dispatch(fetchAlbumFailed(error)) })
    }, [album_id])

    if (isLoading) { return <Loading /> }

    if (message) {
        return <p className="alert alert-danger">{message}</p>
    }

    return (
        <div>
            <div className="row">
                <div className="col-5">
                    <dl className="col d-flex flex-column">
                        <dt>Album name:</dt>
                        <dd>{album?.name}</dd>

                        <dt>Artist:</dt>
                        <dd>{album?.artists[0]?.name}</dd>
                    </dl>
                    {album && <AlbumCard album={album} />}
                </div>
                <div className="col-7">

                    {/* 
                        TODO:
                            - search results - clicking PhilCollins redirects here with ID
                            - show list of playlists below
                            - dispatch select playlist 
                            - show tracks
                            - on button click add track to selected playlist
                    */}
                    <SelectPlaylist playlists={playlists} onSelect={selectPlaylistById} />
                    <AlbumTracks tracks={album?.tracks!} />
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