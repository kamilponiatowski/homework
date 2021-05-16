import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { fetchAlbumById } from '../../core/hooks/usePlaylists'
import { fetchAlbumFailed, fetchAlbumStart, fetchAlbumSuccess, selectAlbum, selectAlbumFetchState } from '../../core/reducers/SearchReducer'
import SelectPlaylist from '../../playlists/components/SelectPlaylist'
import { AlbumCard } from '../components'
import AlbumTracks from '../components/AlbumTracks'

interface Props {

}

export const AlbumDetails = (props: Props) => {
    // album_id: 5Tby0U5VndHW0SomYO7Id7

    // 1. State - What is needed in Component/React
    // album 
    // loading
    // message

    // 2. Action - What we can do
    // start, success, failed

    // TODO:
    // Use Fake ID
    // Fetch data from server
    // Dispatch data to reducer
    // Display data + loading + error from reducer
    // Get ID from router
    const dispatch = useDispatch()
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
                    <SelectPlaylist playlists={[]} onSelect={() => { }} />
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