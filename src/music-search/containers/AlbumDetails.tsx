import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { fetchAlbumById } from '../../core/hooks/usePlaylists'
import { fetchAlbumFailed, fetchAlbumStart, fetchAlbumSuccess, selectAlbum, selectAlbumFetchState } from '../../core/reducers/SearchReducer'
import SelectPlaylist from '../../playlists/components/SelectPlaylist'
import { AlbumCard } from '../components/AlbumCard'

interface Props {

}

// function msToTime(duration: number) {
//     var milliseconds = Math.floor((duration % 1000) / 100),
//         seconds = Math.floor((duration / 1000) % 60),
//         minutes = Math.floor((duration / (1000 * 60)) % 60),
//         hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

//     hours = (hours < 10) ? "0" + hours : hours;
//     minutes = (minutes < 10) ? "0" + minutes : minutes;
//     seconds = (seconds < 10) ? "0" + seconds : seconds;

//     return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
// }

function msToTime(ms: number) {
    let seconds = (ms / 1000).toFixed(1);
    let minutes = (ms / (1000 * 60)).toFixed(1);
    let hours = (ms / (1000 * 60 * 60)).toFixed(1);
    let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
    if (+seconds < 60) return seconds + " Sec";
    else if (+minutes < 60) return minutes + " Min";
    else if (+hours < 24) return hours + " Hrs";
    else return days + " Days"
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

                    <h3 className="mt-2">Tracks {album?.tracks?.total ? `(${album.tracks.total})` : null}</h3>
                    {album?.tracks &&
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">
                                        <div className="d-flex justify-content-center">
                                            <span className="material-icons">
                                                schedule
                                            </span>
                                        </div>
                                    </th>
                                    <th scope="col">Add</th>
                                </tr>
                            </thead>
                            <tbody>
                                {album.tracks.items.map((track, index) => <tr>
                                    <th scope="row">{++index}</th>
                                    <td>
                                        <a href={track.external_urls.spotify}>{track.name}</a>
                                    </td>
                                    <td className="d-flex justify-content-center text-nowrap">{msToTime(track.duration_ms)}</td>
                                    <td>
                                        <span className="material-icons">
                                            add
                                        </span>
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>
                    }
                    {!album?.tracks &&
                        <div className="alert alert-info" role="alert">
                            No tracks to display
                        </div>
                    }


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