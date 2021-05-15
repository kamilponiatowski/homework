import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { fetchAlbumById } from '../../core/hooks/usePlaylists'
import { fetchAlbumFailed, fetchAlbumStart, fetchAlbumSuccess, selectAlbum, selectAlbumFetchState } from '../../core/reducers/SearchReducer'
import SelectPlaylist from '../../playlists/components/SelectPlaylist'
import { AlbumCard } from '../components/AlbumCard'

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

    return (
        <div>
            <div className="row">
                <div className="col">
                    <small className="text-muted">{album_id}</small>
                    <h1>{album?.name}</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    {album && <AlbumCard album={album} />}
                </div>
                <div className="col">

                    <dl>
                        <dt>Album name:</dt>
                        <dd>{album?.name}</dd>

                        <dt>Artist:</dt>
                        <dd>{album?.artists[0]?.name}</dd>
                    </dl>

                    {/* 
                        TODO:
                            - search results - clicking PhilCollins redirects here with ID
                            - show list of playlists below
                            - dispatch select playlist 
                            - show tracks
                            - on button click add track to selected playlist
                    */}

                    <SelectPlaylist playlists={[]} onSelect={() => { }} />

                    <h3>Tracks</h3>
                    {album?.tracks.items.map(track =>
                        <p>
                            .... (+) add to selected playlist
                        </p>
                    )}


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